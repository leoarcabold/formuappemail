// Função para abrir a página de visualização com os dados preenchidos
function visualizarFormulario(event) {
    event.preventDefault(); // Impede o envio do formulário

    const form = document.querySelector('form');
    
    // Verifica se o formulário é válido antes de enviar os dados
    if (!form.checkValidity()) {
        form.reportValidity(); // Exibe mensagens de erro de campos obrigatórios
        return; // Se não for válido, não envia
    }

    // Capitaliza o nome antes de adicionar aos parâmetros da URL
    const nomeField = document.getElementById('nome');
    const nome = nomeField.value
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra

    // Substitui o valor de nome no formulário com o nome capitalizado
    nomeField.value = nome;

    // Captura os dados do formulário e converte para parâmetros da URL
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString(); // Converte os dados em parâmetros da URL
    const url = `pagina_03_01.html?${params}`; // URL de destino com os parâmetros
    window.open(url, '_blank'); // Abre a página em uma nova aba
}
