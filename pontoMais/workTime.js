function workDataTime() {
    const dataFormat = getCurrentDateFormatted();
    const token = localStorage.getItem('tokenPontoFlings');
    const clientId = localStorage.getItem('clientIdPontoFlings');
    const uid = localStorage.getItem('loginPontoFlings');
    
    getPoints(dataFormat, token, clientId, uid);

    fetch('https://api.pontomais.com.br/api/time_card_control/current/work_days?start_date='+ dataFormat +'&end_date='+ dataFormat +'&sort_direction=desc&sort_property=date', {
        method: 'GET',
        headers: {
            "client": clientId,
            "uid": uid,
            "token": token,
            "uuid": 'bbbc2c51-65a7-426c-86c0-53c67200c38a',
            "access-token": token
          },
      })
        .then(response => response.text())
        .then(data => work(data))
        .catch(error => console.error('Error:', error));
    
}

function getSession(){
    const token = localStorage.getItem('tokenPontoFlings');
    const clientId = localStorage.getItem('clientIdPontoFlings');
    const uid = localStorage.getItem('loginPontoFlings');

    fetch('https://api.pontomais.com.br/api/session', {
        method: 'GET',
        headers: {
            "client": clientId,
            "uid": uid,
            "token": token,
            "uuid": 'bbbc2c51-65a7-426c-86c0-53c67200c38a',
            "access-token": token
          },
      })
        .then(response => response.text())
        .then(data => setBearToken(data))
        .catch(error => console.error('Error:', error));
}

function setBearToken(data) {
    const jsonData = JSON.parse(data);

    localStorage.setItem('authorizationPontoFlings', 'Bearer ' + jsonData.session.client.time_clocks_token)
}

function secondsToHMS(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function work(data) {
    try {
        const jsonData = JSON.parse(data);
        const dadosTabela = [];
        jsonData.work_days.forEach(workDay => {
            if (workDay.time_cards.length > 0) {
                const ultimaEntrada = workDay.time_cards[0].time;
                const ultimaSaida = workDay.time_cards[workDay.time_cards.length - 1].time;

                dadosTabela.push({
                    data: workDay.date,
                    ultimaEntrada: ultimaEntrada,
                    ultimaSaida: ultimaSaida,
                    horasExtras: workDay.extra_time,
                    horasFaltantes: secondsToHMS(workDay.missing_time),
                    saldo: secondsToHMS(workDay.time_balance)
                });
            } else {
                dadosTabela.push({
                    data: workDay.date,
                    ultimaEntrada: 'N/A',
                    ultimaSaida: 'N/A',
                    horasExtras: workDay.extra_time,
                    horasFaltantes: workDay.missing_time,
                    saldo: workDay.time_balance
                });
            }
        });


        preencherTabelaHorarios(dadosTabela);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
}

function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então adicione 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function preencherTabelaHorarios(dados) {
    
    const tbody = document.getElementById('tableTbodyDetalheDosHorario');
    tbody.innerHTML = '';
    
    dados.forEach(item => {
        const row = document.createElement('tr');

        // Cria e preenche as células
        const cellData = document.createElement('td');
        cellData.textContent = item.data;
        row.appendChild(cellData);

        const cellUltimaEntrada = document.createElement('td');
        cellUltimaEntrada.textContent = item.ultimaEntrada;
        row.appendChild(cellUltimaEntrada);

        const cellUltimaSaida = document.createElement('td');
        cellUltimaSaida.textContent = item.ultimaSaida;
        row.appendChild(cellUltimaSaida);

        const cellHorasExtras = document.createElement('td');
        cellHorasExtras.textContent = item.horasExtras;
        row.appendChild(cellHorasExtras);

        const cellHorasFaltantes = document.createElement('td');
        cellHorasFaltantes.textContent = item.horasFaltantes;
        cellHorasFaltantes.style.color = 'red';
        row.appendChild(cellHorasFaltantes);

        const cellSaldo = document.createElement('td');
        cellSaldo.textContent = item.saldo;
        cellSaldo.style.color = 'green';
        row.appendChild(cellSaldo);

        const cellTrabalhadas = document.createElement('td');
        const initialTime = localStorage.getItem('workTimePontoFling') || '00:00:00';
        cellTrabalhadas.textContent = initialTime;
        cellTrabalhadas.id = 'horaTrabalhada';
        row.appendChild(cellTrabalhadas);
        if (initialTime != '00:00:00') {
            setInterval(updateTimeInTable, 1000);
        }
        // Adiciona a linha ao tbody
        tbody.appendChild(row);
    });

    show('detalheDosHorario');
    getSession();
}