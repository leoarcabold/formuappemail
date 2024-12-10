function salvarOuImprimirPDF() {
    window.print();
}

// Função para capturar parâmetros da URL
function getFormData() {
    const params = new URLSearchParams(window.location.search);
    return {
        nome: params.get('nome'),
        numeroIdentificacao: params.get('numero-identificacao'),
        dataTrabalho: params.get('data-trabalho'),
        horaInicio: params.get('hora-inicio'),
        horaFim: params.get('hora-fim'),
        dataCompensacao: params.get('data-compensacao'),
        dataRegistro: params.get('data-de-registro'),
    };
}

// Função para formatar a data para o formato dd/mm/aaaa
function formatDate(date) {
    if (!date) return "____/____/____";
    const [year, month, day] = date.split('-');  // Supondo o formato yyyy-mm-dd
    return `${day}/${month}/${year}`;
}

// Função para preencher os dados na página
function populateData() {
    const data = getFormData(); // Captura os dados enviados pela URL
    document.getElementById('nome').textContent = data.nome || "Nome não informado";
    document.getElementById('numero-identificacao').textContent = data.numeroIdentificacao || "Número não informado";
    document.getElementById('data-trabalho').textContent = formatDate(data.dataTrabalho);
    document.getElementById('hora-inicio').textContent = data.horaInicio || "__:__";
    document.getElementById('hora-fim').textContent = data.horaFim || "__:__";
    document.getElementById('data-compensacao').textContent = formatDate(data.dataCompensacao);

    // Preenche o campo "Data de Registro" com "Data:" antes
    const dataRegistro = formatDate(data.dataRegistro);
    document.getElementById('data-de-registro').innerHTML = `<strong>Data:</strong> ${dataRegistro}`;

    
}

// Chama a função para preencher os dados assim que a página for carregada
window.onload = populateData;


