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
                    "uuid":generateRandomHash(),
                    "authorization":authorization
                },
                "version":"null"
            }
        };
    const buttonE = document.getElementById('entradaButton');
    const buttonS = document.getElementById('saidaButton');
    
    buttonE.disabled = true;
    buttonS.disabled = true;
    showLoadingOverlay();

    fetch('https://api.pontomais.com.br/api/time_cards/register', {
        method: 'post',
        headers: {
            "client": clientId,
            "uid": uid,
            "token": token,
            "uuid": generateRandomHash(),
            "access-token": token
          },
          body: JSON.stringify(data)
      })
        .then(response => response.text())
        .then(data => {
            const buttonE = document.getElementById('entradaButton');
            const buttonS = document.getElementById('saidaButton');
            
            hideLoadingOverlay();
            buttonE.disabled = false;
            buttonS.disabled = false;
            workDataTime();

        })
        .catch(error => {
            const divErro = document.getElementById('erroPonto');
            divErro.innerHTML = "<span> Erro ao tentar bater ponto</span>"
        });

        
}

const botao = document.getElementById('entradaButton');
botao.addEventListener('click', function() {
  baterPonto();
});
const botaoSaida = document.getElementById('saidaButton');
botaoSaida.addEventListener('click', function() {
  baterPonto();
});