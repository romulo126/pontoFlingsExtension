function loginUser(User, password) {
    const data = {
        login: User,
        password: password
      };
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
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
}

function errorLogin() {
  alert('Erro Usuario ou senha Incorreto');
}

document.getElementById('loginButton').addEventListener('click', () => {
    const user = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    loginUser(user,password );
});