function salvarDados() {
    try {
        // Obtém os elementos essenciais
        const nomeColaborador = document.getElementById("nomeColaborador");
        const nif = document.getElementById("nif");
        const dataPreenchimento = document.getElementById("data");
        const periodoSelecionado = document.querySelector('input[name="periodo"]:checked');

        // Campos de datas
        const dataAPartirDe = document.querySelector('input[name="dataAPartirDe"]');
        const dataSomenteNoDia = document.querySelector('input[name="dataSomenteNoDia"]');
        const dataInicio = document.querySelector('input[name="dataInicio"]');
        const dataFim = document.querySelector('input[name="dataFim"]');

        // Validação: Nome do Colaborador
        if (!nomeColaborador?.value.trim()) {
            alert("Por favor, preencha o nome do professor.");
            return;
        }

        // Validação: NIF
        if (!nif?.value.trim()) {
            alert("Por favor, preencha o NIF.");
            return;
        }

        // Validação: Período
        if (!periodoSelecionado) {
            alert("Por favor, selecione o período.");
            return;
        }

        let dataValida = false;
        switch (periodoSelecionado.value) {
            case "aPartirDe":
                if (dataAPartirDe?.value.trim()) {
                    dataValida = true;
                } else {
                    alert("Por favor, preencha a data 'A partir de'.");
                }
                break;
            case "somenteNoDia":
                if (dataSomenteNoDia?.value.trim()) {
                    dataValida = true;
                } else {
                    alert("Por favor, preencha a data 'Somente no dia de'.");
                }
                break;
            case "intervalo":
                if (dataInicio?.value.trim() && dataFim?.value.trim()) {
                    if (new Date(dataInicio.value) <= new Date(dataFim.value)) {
                        dataValida = true;
                    } else {
                        alert("A data de início não pode ser posterior à data de fim.");
                    }
                } else {
                    alert("Por favor, preencha as datas de início e fim do intervalo.");
                }
                break;
            default:
                alert("Seleção de período inválida.");
                return;
        }

        if (!dataValida) return;

        // Validação: Horários
        const dias = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
        const horariosPreenchidos = dias.some(dia => 
            ["Entrada1", "Saida1", "Entrada2", "Saida2"].some(horario => {
                const campo = document.querySelector(`[name="${dia}${horario}"]`);
                return campo && campo.value.trim();
            })
        );
        
        if (!horariosPreenchidos) {
            alert("Por favor, preencha ao menos um horário para algum dia da semana.");
            return;
        }
        

        // Validação: Data de Registro
        if (!dataPreenchimento?.value.trim()) {
            alert("Por favor, preencha a data de registro.");
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

        // Captura os horários
        dias.forEach(dia => {
            dados.horarios[dia] = {
                entrada1: document.querySelector(`[name="${dia}Entrada1"]`)?.value.trim() || "",
                saida1: document.querySelector(`[name="${dia}Saida1"]`)?.value.trim() || "",
                entrada2: document.querySelector(`[name="${dia}Entrada2"]`)?.value.trim() || "",
                saida2: document.querySelector(`[name="${dia}Saida2"]`)?.value.trim() || ""
            };
        });

        console.log(dados);

        // Salva no Local Storage
        localStorage.setItem("formularioDados", JSON.stringify(dados));

        // Abre a nova página
        window.open("pagina_02_01.html", "_blank");
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        alert("Ocorreu um erro ao salvar os dados. Por favor, tente novamente.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os campos de data
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        // Adiciona um evento ao alterar a data
        dateInput.addEventListener("change", (event) => {
            // Encontra o radio correspondente dentro do mesmo grupo (label ou div)
            const radio = event.target.closest("label").querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true; // Marca o radio button
            }
        });
    });
});
