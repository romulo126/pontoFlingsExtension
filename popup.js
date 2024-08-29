if (localStorage.getItem("pontoFlingsStatus") === null ) {
    show('loginPontoFlings');
} else {
    showNone('loginPontoFlings');
    workDataTime();
}

function show(divId) {
    const element = document.getElementById(divId);
    element.style.display = 'block';
}

function showNone(divId) {
    const element = document.getElementById(divId);
    element.style.display = 'none';
}

function showLoadingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoadingOverlay() {
    document.getElementById('loadingOverlay').style.display = 'none';
}