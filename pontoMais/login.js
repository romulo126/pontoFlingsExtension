function loginUser(User, password) {
    const data = {
        login: User,
        password: password
      };
    const button = document.getElementById('loginButton');

    button.disabled = true;
    showLoadingOverlay();

    fetch('https://api.pontomais.com.br/api/auth/sign_in', {
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(response => response.text())
        .then(data => setTokens(data))
        .catch(error => errorLogin());
}

function setTokens(data) {
  try {
    const jsonData = JSON.parse(data);
    
    localStorage.setItem('tokenPontoFlings', jsonData.token);
    localStorage.setItem('clientIdPontoFlings', jsonData.client_id);
    localStorage.setItem('loginPontoFlings', jsonData.data.login);
    localStorage.setItem('pontoFlingsStatus', true);
    workDataTime();
    showNone('loginPontoFlings');

    hideLoadingOverlay();
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
}

function errorLogin() {
  const button = document.getElementById('loginButton');
  const loadingIcon = document.getElementById('loadingIcon');
  const divErro = document.getElementById('erroLogin');

  button.disabled = false;
  loadingIcon.style.display = 'none';
  divErro.innerHTML = "<span> Erro ao tentar entrar</span>";
}

document.getElementById('loginButton').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    loginUser(user,password );
});