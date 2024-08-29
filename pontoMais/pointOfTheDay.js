function getPoints(dataFormat, token, clientId, uid) {
    // dataFormat = '2024-08-26';
    fetch('https://api.pontomais.com.br/api/time_card_control/current/work_days/'+ dataFormat, {
        method: 'GET',
        headers: {
            "client": clientId,
            "uid": uid,
            "token": token,
            "uuid": generateRandomHash(),
            "access-token": token
          },
      })
        .then(response => response.text())
        .then(data => workDay(data))
        .catch(error => console.error('Error:', error));
    
}

function workDay(data) {
    const jsonData = JSON.parse(data);
    const points = [];
    jsonData.work_day.time_cards.forEach(workDay => {
        points.push(
            {
                time: workDay.time
            }
        )
    });
    checkTypePoint(points);
    calculateTotalTimeWorked(points);
}

function checkTypePoint(points) {
    const numberOfRecords = points.length;

    if (numberOfRecords % 2 === 0) {
        showNone('saidaButton');
        show('entradaButton');
    } else {
        show('saidaButton');
        showNone('entradaButton');
    }

    return;
}

function calculateTotalTimeWorked(timeLogs) {
    let totalMinutesWorked = 0;

    for (let i = 0; i < timeLogs.length; i += 2) {
        const entrada = timeLogs[i].time;
        const saida = timeLogs[i + 1] ? timeLogs[i + 1].time : null;

        if (entrada) {
            const [entradaHoras, entradaMinutos] = entrada.split(":").map(Number);
            const entradaDate = new Date(0, 0, 0, entradaHoras, entradaMinutos);

            let saidaDate;

            if (saida) {
                const [saidaHoras, saidaMinutos] = saida.split(":").map(Number);
                saidaDate = new Date(0, 0, 0, saidaHoras, saidaMinutos);
            } else {
                const now = new Date();
                saidaDate = new Date(0, 0, 0, now.getHours(), now.getMinutes());
            }

            const diff = (saidaDate - entradaDate) / 1000 / 60;
            totalMinutesWorked += diff;
        }
    }

    const hoursWorked = Math.floor(totalMinutesWorked / 60);
    const minutesWorked = totalMinutesWorked % 60;

    // Adiciona zero à esquerda, se necessário
    const formattedHours = String(hoursWorked).padStart(2, '0');
    const formattedMinutes = String(minutesWorked).padStart(2, '0');
    localStorage.setItem('workTimePontoFling', `${formattedHours}:${formattedMinutes}:00`);
}

function updateTimeInTable() {
    const cellTrabalhadas = document.getElementById('horaTrabalhada');
    let currentTime = cellTrabalhadas.textContent;

    // Incrementa o tempo em 1 segundo
    currentTime = incrementTime(currentTime);

    // Atualiza o conteúdo da célula
    cellTrabalhadas.textContent = currentTime;

    // Salva o tempo atualizado no localStorage
    localStorage.setItem('workTimePontoFling', currentTime);
}

function incrementTime(timeString) {
    let [hours, minutes, seconds] = timeString.split(':').map(Number);

    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes >= 60) {
        minutes = 0;
        hours++;
    }

    // Adiciona zero à esquerda, se necessário
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function generateRandomHash() {
    // Cria um array de 16 bytes aleatórios (128 bits)
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);

    // Ajusta os valores para que correspondam ao formato UUID (versão 4)
    array[6] = (array[6] & 0x0f) | 0x40; // Versão 4
    array[8] = (array[8] & 0x3f) | 0x80; // Variante RFC 4122

    // Converte os valores para o formato UUID
    const uuid = [...array].map((byte, index) => {
        const hex = byte.toString(16).padStart(2, '0');
        // Adiciona hifens nos lugares apropriados
        return [4, 6, 8, 10].includes(index) ? `-${hex}` : hex;
    }).join('');

    return uuid;
}