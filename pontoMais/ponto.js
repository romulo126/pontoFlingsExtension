function baterPonto(){
    const token = localStorage.getItem('tokenPontoFlings');
    const clientId = localStorage.getItem('clientIdPontoFlings');
    const uid = localStorage.getItem('loginPontoFlings');
    const email = localStorage.getItem('loginPontoFlings');
    const authorization = localStorage.getItem('authorizationPontoFlings');

    const data = {
            "image":null,
            "employee":{
                "id":null,
                "pin":null
            },
            "time_card":{
                "latitude":0,
                "longitude":0,
                "address":"Ponto Flings",
                "reference_id":null,
                "original_latitude":null,
                "original_longitude":null,
                "original_address":null,
                "location_edited":true,
                "accuracy":1100,
                "accuracy_method":null,
                "image":null,
                "info":null
            },
            "_path":"/registrar-ponto",
            "_appVersion":"0.10.32",
            "_device":{
                "manufacturer":"null",
                "model":"null",
                "uuid":{
                    "success":"Login efetuado com sucesso!",
                    "token":token,
                    "client_id":clientId,
                    "data":{
                        "login":email,
                        "sign_in_count":32,
                        "last_sign_in_ip":"8.8.8.8",
                        "last_sign_in_at":1724793277
                    },
                    "uuid":"b18842df-3adf-40c7-8d1b-dc168df8ebfa",
                    "authorization":authorization
                },
                "version":"null"
            }
        };

    fetch('https://api.pontomais.com.br/api/time_cards/register', {
        method: 'post',
        headers: {
            "client": clientId,
            "uid": uid,
            "token": token,
            "uuid": 'bbbc2c51-65a7-426c-86c0-53c67200c38a',
            "access-token": token
          },
          body: JSON.stringify(data)
      })
        .then(response => response.text())
        .then(data => console.log('Ponto Batido'))
        .catch(error => console.error('Error:', error));

        workDataTime();
}

const botao = document.getElementById('entradaButton');
botao.addEventListener('click', function() {
  baterPonto();
});
const botaoSaida = document.getElementById('saidaButton');
botaoSaida.addEventListener('click', function() {
  baterPonto();
});