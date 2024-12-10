function salvarDados() {
    try {
        // Obtém os elementos essenciais
        const nomeColaborador = document.getElementById("nomeColaborador");
        const nif = document.getElementById("nif");
        const dataPreenchimento = document.getElementById("data");
        const periodoSelecionado = document.querySelector('input[name="periodo"]:checked');
        const dataAPartirDe = document.querySelector('input[name="dataAPartirDe"]');
        const dataSomenteNoDia = document.querySelector('input[name="dataSomenteNoDia"]');
        const dataInicio = document.querySelector('input[name="dataInicio"]');
        const dataFim = document.querySelector('input[name="dataFim"]');

        // 1. Validação: Nome do Professor
        if (!nomeColaborador?.value.trim()) {
            alert("Por favor, preencha o nome do professor.");
            return;
        }

        // 2. Validação: NIF
        if (!nif?.value.trim()) {
            alert("Por favor, preencha o NIF.");
            return;
        }

        // 3. Validação: Período
        if (!periodoSelecionado) {
            alert("Por favor, selecione o período.");
            return;
        }

        // 4. Validação: Horários
        const dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
        const horariosPreenchidos = dias.some(dia =>
            ["Entrada1", "Saida1", "Entrada2", "Saida2"].some(horario =>
                document.querySelector(`[name="${dia}Entrada1"]`)?.value.trim()
            )
        );
        if (!horariosPreenchidos) {
            alert("Por favor, preencha ao menos um horário para algum dia da semana.");
            return;
        }

        // 5. Validação: Data de Registro
        if (!dataPreenchimento?.value.trim()) {
            alert("Por favor, preencha a data de registro.");
            return;
        }

        // 6. Validação: Campos para passagem
        if (!dataAPartirDe?.value.trim() && !dataSomenteNoDia?.value.trim()) {
            alert("Por favor, preencha pelo menos um campo de data para passagem.");
            return;
        }

        // Monta o objeto de dados
        const dados = {
            nomeColaborador: nomeColaborador.value.trim(),
            nif: nif.value.trim(),
            periodo: periodoSelecionado.value,
            dataPreenchimento: dataPreenchimento.value.trim(),
            dataAPartirDe: dataAPartirDe?.value.trim() || "",
            dataSomenteNoDia: dataSomenteNoDia?.value.trim() || "",
            dataInicio: dataInicio?.value.trim() || "",
            dataFim: dataFim?.value.trim() || "",
            horarios: {}
        };

        // Captura os horários de cada dia da semana
        dias.forEach(dia => {
            dados.horarios[dia] = {
                entrada1: document.querySelector(`[name="${dia}Entrada1"]`)?.value.trim() || "",
                saida1: document.querySelector(`[name="${dia}Saida1"]`)?.value.trim() || "",
                entrada2: document.querySelector(`[name="${dia}Entrada2"]`)?.value.trim() || "",
                saida2: document.querySelector(`[name="${dia}Saida2"]`)?.value.trim() || ""
            };
        });

        // Exibe os dados no console para depuração
        console.log(dados);

        // Salva os dados no Local Storage
        localStorage.setItem("formularioDados", JSON.stringify(dados));

        // Abre a página 2 em uma nova guia
        window.open("pagina_02_01.html", "_blank");
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Ocorreu um erro ao salvar os dados. Por favor, tente novamente.");
    }
}




/*
function salvarDados() {
    try {
        // Verifica se os elementos essenciais existem antes de pegar os valores
        const nomeColaborador = document.getElementById("nomeColaborador");
        const nif = document.getElementById("nif");
        const dataPreenchimento = document.getElementById("data") // qui

        if (!nomeColaborador || !nif || !data) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const dados = {
            dataPreenchimento:dataPreenchimento.value.trim(), // aqui
            nomeColaborador: nomeColaborador.value.trim(),
            nif: nif.value.trim(),
            periodo: document.querySelector('input[name="periodo"]:checked')?.value || "",
            dataAPartirDe: getValue('input[name="dataAPartirDe"]'),
            dataSomenteNoDia: getValue('input[name="dataSomenteNoDia"]'),
            dataInicio: getValue('input[name="dataInicio"]'),
            dataFim: getValue('input[name="dataFim"]'),
            horarios: {}
        };

        // Array que contém os dias da semana
        const dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

        // Captura os horários de cada dia da semana
        dias.forEach(dia => {
            dados.horarios[dia] = {
                entrada1: getValue(`[name="${dia}Entrada1"]`),
                saida1: getValue(`[name="${dia}Saida1"]`),
                entrada2: getValue(`[name="${dia}Entrada2"]`),
                saida2: getValue(`[name="${dia}Saida2"]`)
            };
        });

        // Validação dos dados
        if (!dados.nomeColaborador || !dados.nif) {
            alert("Por favor, preencha o nome do colaborador e o NIF.");
            return;
        }

        // Verifica se ao menos um horário foi preenchido
        const horariosPreenchidos = dias.some(dia => Object.values(dados.horarios[dia]).some(horario => horario));
        if (!horariosPreenchidos) {
            alert("Por favor, preencha ao menos um horário.");
            return;
        }

        // Exibe os dados no console para depuração
        console.log(dados);

        // Salva os dados no Local Storage
        localStorage.setItem("formularioDados", JSON.stringify(dados));

        // Abre a página 2 em uma nova guia
        window.open("pagina_02_01.html", "_blank");
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Ocorreu um erro ao salvar os dados. Por favor, tente novamente.");
    }
}
*/

// Função auxiliar para obter o valor de um campo
function getValue(selector) {
    const element = document.querySelector(selector);
    return element ? element.value.trim() : "";
}

// Seleciona todos os campos de data e adiciona o evento de foco
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        dateInput.addEventListener("focus", (event) => {
            const radio = event.target.closest("label").querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true; // Seleciona o radio
            }
        });
    });
});
