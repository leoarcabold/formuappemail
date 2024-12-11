document.addEventListener("DOMContentLoaded", () => {
    // Obtém os dados do localStorage
    const dados = JSON.parse(localStorage.getItem("formularioDados"));

    if (!dados) {
        alert("Nenhum dado encontrado.");
        return;
    }

    // Preenche os dados gerais no documento
    document.getElementById("nomeColaborador").textContent = dados.nomeColaborador || "_________________";
    document.getElementById("nif").textContent = dados.nif || "";
    
    // Para o período que começa em uma data
    document.getElementById("periodoAPartir").textContent = dados.periodo === "aPartirDe" ? "X" : " ";
    document.getElementById("dataAPartir").textContent = dados.dataAPartirDe ? formatarDataBR(dados.dataAPartirDe) : "";
    
    // Para o período que é somente em um dia
    document.getElementById("periodoSomente").textContent = dados.periodo === "somenteNoDia" ? "X" : " ";
    document.getElementById("dataSomente").textContent = dados.dataSomenteNoDia ? formatarDataBR(dados.dataSomenteNoDia) : "";
    
    // Para o intervalo de datas
    document.getElementById("periodoIntervalo").textContent = dados.periodo === "intervalo" ? "X" : " ";
    document.getElementById("dataInicio").textContent = dados.dataInicio ? formatarDataBR(dados.dataInicio) : "";
    document.getElementById("dataFim").textContent = dados.dataFim ? formatarDataBR(dados.dataFim) : "";

    // Para a data atual
    document.getElementById("dataAtual").innerHTML = `<strong>Data: </strong>${dados.dataPreenchimento ? formatarDataBR(dados.dataPreenchimento) : ""}`;
  

    // Exibe os horários na tabela
    const tabela = document.getElementById("horariosTabela");
    Object.entries(dados.horarios).forEach(([dia, horarios]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${dia.charAt(0).toUpperCase() + dia.slice(1)}</td>
            <td>${horarios.entrada1 || "-"}</td>
            <td>${horarios.saida1 || "-"}</td>
            <td>${horarios.entrada2 || "-"}</td>
            <td>${horarios.saida2 || "-"}</td>
        `;
        tabela.appendChild(row);
    });
});


function salvarOuImprimirPDF() {
    window.print();
}


function aplicarEstiloBotao() {
    const botao = document.getElementById('pdfButton');
    botao.classList.add('botao-estilizado'); // Adiciona a classe personalizada
    alert('Estilo aplicado ao botão!');
}

function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    
    // Dividir a string no formato "YYYY-MM-DD"
    const [ano, mes, dia] = dataISO.split('-');
    
    // Retornar a data no formato DD/MM/AAAA
    return `${dia}/${mes}/${ano}`;
}


/*

function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    
    // Dia com zero à esquerda se necessário
    const dia = data.getDate().toString().padStart(2, '0');
    
    // Mês com zero à esquerda se necessário
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    
    // Ano
    const ano = data.getFullYear();
    
    // Formato DD/MM/AAAA
    return `${dia}/${mes}/${ano}`;
}
*/