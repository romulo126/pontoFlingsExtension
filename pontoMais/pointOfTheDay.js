function getPoints(dataFormat, token, clientId, uid) {
    // dataFormat = '2024-08-26';
    fetch('https://api.pontomais.com.br/api/time_card_control/current/work_days/'+ dataFormat, {
        method: 'GET',
        headers: {
            "client": clientId,
            "uid": uid,
            "token": token,
            "uuid": 'bbbc2c51-65a7-426c-86c0-53c67200c382',
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

    if (numberOfRecords == 0) {
        showNone('saidaButton');
        show('entradaButton');

        return;
    }

    if (numberOfRecords % 2 === 0) {
        console.log('saida')
        showNone('saidaButton');
        show('entradaButton');
    } else {
        console.log('entrada')
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