let alunos = []; // Array global para armazenar os dados dos alunos
let alunoCount = 0;



function adicionarAluno() {
  const nomeAluno = document.getElementsByName("nome_aluno")[0].value;
  const dataDesistencia = document.getElementsByName("data_desistencia")[0].value;
  const dataUltimaFrequencia = document.getElementsByName("data_ultima_frequencia")[0].value;
  const cargaHorariaCursada = document.getElementsByName("carga_horaria_cursada")[0].value;
  const curso = document.getElementsByName("curso")[0].value;
  const codigoTurma = document.getElementsByName("codigo_turma")[0].value;
  const nomeProfessor = document.getElementsByName("nome_professor")[0].value;

  // Validação dos campos obrigatórios
  if (!nomeAluno || !dataDesistencia || !cargaHorariaCursada || !curso || !codigoTurma || !nomeProfessor) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
  }

  const aluno = {
      id: ++alunoCount,
      nomeAluno,
      dataDesistencia,
      dataUltimaFrequencia: dataUltimaFrequencia || null,
      cargaHorariaCursada,
      curso,
      codigoTurma,
      nomeProfessor
  };

  alunos.push(aluno);
  atualizarTabela();
  document.getElementById("formulario").reset();
}

function atualizarTabela() {
  const tabela = document.getElementById("tabelaAlunos");
  tabela.innerHTML = ""; // Limpa a tabela antes de atualizar

  alunos.forEach(aluno => {
      const row = tabela.insertRow();
      row.dataset.id = aluno.id;

      row.insertCell(0).innerText = aluno.id;
      row.insertCell(1).innerText = aluno.nomeAluno;
      row.insertCell(2).innerText = formatarDataBR(aluno.dataDesistencia);
      row.insertCell(3).innerText = aluno.dataUltimaFrequencia ? formatarDataBR(aluno.dataUltimaFrequencia) : "";
      row.insertCell(4).innerText = aluno.cargaHorariaCursada;
      row.insertCell(5).innerText = aluno.curso;
      row.insertCell(6).innerText = aluno.codigoTurma;

      const cellAcao = row.insertCell(7);
      cellAcao.innerHTML = '<i class="fas fa-trash-alt action-icon" onclick="excluirAluno(this)" style="cursor: pointer; color: red;"></i>';
  });
}

function excluirAluno(icon) {
  const row = icon.closest("tr");
  const alunoId = parseInt(row.dataset.id);

  alunos = alunos.filter(aluno => aluno.id !== alunoId);
  atualizarTabela();
}

function visualizar() {
  if (alunos.length > 0) {
      sessionStorage.setItem("alunos", JSON.stringify(alunos));
      window.open("pagina_01_01.html", "_blank");
  } else {
      alert("Nenhum aluno para visualizar.");
  }
}

async function enviarEmail() {
  const fileInput = document.getElementById('attachment');
  const statusDiv = document.getElementById('status');

  if (fileInput.files.length === 0) {
      statusDiv.innerHTML = "<p class='text-red-500'>Por favor, selecione um arquivo.</p>";
      return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = async function (e) {
      const base64File = e.target.result.split(",")[1];
      const corpoEmail = prepararCorpoEmail();

      try {
          const result = await Email.send({
              SecureToken :"b1f32749-9ba9-454f-ad0d-2c5309670b81",
              Host: "smtp.elasticemail.com",
              Username: "senaispbras@outlook.com",
              Password: "EE3DDE698842C1DD225C5A9C9F4DDDDF9C07",
              To: "senaispbras@outlook.com",
              From: "senaispbras@outlook.com",
              Subject: "FormHub - Sistema de Solicitações",
              Body: `Prezados, 

Estou escrevendo para solicitar o desligamento dos alunos abaixo:

${corpoEmail}

Segue anexo o documento com os detalhes.

Agradeço pela atenção e pela pronta colaboração nesse processo. 
Caso necessitem de mais informações ou esclarecimentos, estou à disposição.`,
              Attachments: [
                  {
                      name: file.name,
                      data: base64File
                  }
              ]
          });

          if (result === "OK") {
              statusDiv.innerHTML = "<p class='text-green-500'>E-mail enviado com sucesso!</p>";
              setTimeout(() => {
                  fecharJanelaEmail(); // Fecha a janela pop-up após o envio
              }, 3000); // Espera 3 segundos antes de fechar
          } else {
              statusDiv.innerHTML = `<p class='text-red-500'>Erro ao enviar e-mail: ${result}</p>`;
          }
      } catch (sendError) {
          console.error("Erro ao enviar e-mail:", sendError);
          statusDiv.innerHTML = `<p class='text-red-500'>Erro ao enviar e-mail: ${sendError.message}</p>`;
      }
  };

  reader.onerror = function(error) {
      console.error("Erro ao ler arquivo:", error);
      statusDiv.innerHTML = "<p class='text-red-500'>Erro ao ler o arquivo selecionado.</p>";
  };

  reader.readAsDataURL(file);
}

function prepararCorpoEmail() {
  return alunos.map(aluno => 
      `Aluno: ${aluno.nomeAluno}\n` +
      `Data da Desistência: ${formatarDataBR(aluno.dataDesistencia)}\n` +
      `Data da Última Frequência: ${aluno.dataUltimaFrequencia ? formatarDataBR(aluno.dataUltimaFrequencia) : 'Não informada'}\n` +
      `Curso: ${aluno.curso}\n` +
      `Código da Turma: ${aluno.codigoTurma}\n` +
      `Professor: ${aluno.nomeProfessor}\n\n`
  ).join('');
}

function abrirJanelaEmail() {
  const emailDialog = document.createElement("div");
  emailDialog.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg p-6 w-96">
              <h2 class="text-lg font-bold mb-4">Enviar E-mail com Anexo</h2>
              <input type="file" id="attachment" class="block w-full mb-4 border rounded-md p-2">
              <div id="status" class="mb-4"></div>
              <div class="flex justify-between">
                  <button onclick="fecharJanelaEmail(this)" class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">Cancelar</button>
                  <button onclick="enviarEmail()" class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Enviar</button>
              </div>
          </div>
      </div>
  `;
  document.body.appendChild(emailDialog);
}

function fecharJanelaEmail(button) {
  const emailDialog = button.closest("div.fixed");
  if (emailDialog) {
      emailDialog.remove();
  }
}

function formatarDataBR(dataISO) {
  if (!dataISO) return '';
  const partes = dataISO.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}



// ENVIO DE EMAIL PELO FORM

 // Função para abrir o formulário
 function abrirFormulario() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const popup = document.createElement('div');
    popup.className = 'popup';

    popup.innerHTML = `
      <h2>Enviar Formulário</h2>
      <label for="nome">Nome Completo</label>
      <input type="text" id="nome" placeholder="Digite seu nome completo">
      
      <label for="email">E-mail</label>
      <input type="email" id="email" placeholder="Digite seu e-mail">
      
      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" placeholder="Digite sua mensagem"></textarea>
      
      <label for="arquivo">Anexo</label>
      <input type="file" id="arquivo" accept=".pdf,.doc,.docx,.jpg,.png,.jpeg">
      
      <div id="status" style="color: red; margin-top: 10px;"></div>
      
      <button onclick="enviarFormulario()">Enviar</button>
      <button onclick="fecharFormulario()">Cancelar</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
  }

  // Função para fechar o formulário
  function fecharFormulario() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }

  // Função para enviar o formulário
  async function enviarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    const arquivoInput = document.getElementById('arquivo');
    const statusDiv = document.getElementById('status');

    // Verifica se todos os campos estão preenchidos
    if (!nome || !email || !mensagem || arquivoInput.files.length === 0) {
      statusDiv.textContent = 'Preencha todos os campos!';
      return;
    }

    const arquivo = arquivoInput.files[0];

    // Chama a função de envio
    const resultado = await enviarFormularioComAnexo({ nome, email, mensagem, arquivo });

    if (resultado.success) {
      alert('Formulário enviado com sucesso!');
      fecharFormulario();
    } else {
      statusDiv.textContent = `Erro ao enviar: ${resultado.error}`;
    }
  }

  // Função enviarFormularioComAnexo (do exemplo anterior)
  async function enviarFormularioComAnexo({ nome, email, mensagem, arquivo }) {
    const formData = new FormData();
    formData.append("name", nome);
    formData.append("email", email);
    formData.append("message", mensagem);
    formData.append("attachment", arquivo);
    formData.append("_next", "https://obrigado.com");
    formData.append("_subject", "Novo Formulário Recebido");
    formData.append("_captcha", "false");

    try {
      const response = await fetch("https://formsubmit.co/senaispbras@outlook.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        return { success: true };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


  //AQUI

  function abrirJanelaEmail() {
    // Remove qualquer modal existente
    const existingModal = document.querySelector('.fixed.inset-0');
    if (existingModal) {
      existingModal.remove();
    }
  
    const emailDialog = document.createElement("div");
    emailDialog.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-96">
          <h2 class="text-lg font-bold mb-4">Enviar Formulário</h2>
          <form 
            id="emailForm"
            action="https://formsubmit.co/748cb839fe7ba1db7d8b4dd101fec84b" 
            method="POST" 
            enctype="multipart/form-data"
          >
            <input 
              type="file" 
              id="attachment" 
              name="attachment"
              accept=".pdf"
              required 
              class="block w-full mb-4 border rounded-md p-2"
              onchange="validarArquivo(this)"
            >
            
            <!-- Mensagem Padrão -->
            <input type="hidden" name="message" value="Olá,
  
  Este é um e-mail automático do Sistema de Solicitações FormuSubmit.
  
  Estamos enviando o formulário para sua verificação. Por favor, revise o documento em anexo e, se tudo estiver correto, sinta-se à vontade para imprimi-lo.
  
  Atenciosamente,
  FormuSubmit - Sistema de Solicitações do SENAI">
            
            <input type="hidden" name="_subject" value="Envio de Formulário via FormSubmit">
            <input type="hidden" name="_next" value="https://formsubimit.netlify.app">
            <input type="hidden" name="_captcha" value="false">
  
            <div id="status" class="mb-4 text-red-500 text-center"></div>
            
            <div class="flex justify-between">
              <button 
                type="button"
                onclick="fecharJanelaEmail()" 
                class="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                onclick="return enviarEmail(event)"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(emailDialog);
  }
  
  function validarArquivo(input) {
    const statusDiv = document.getElementById('status');
  
    // Limpar status anterior
    statusDiv.textContent = '';
  
    if (input.files.length === 0) {
      statusDiv.textContent = 'Por favor, selecione um arquivo!';
      return false;
    }
  
    const arquivo = input.files[0];
    if (arquivo.type !== 'application/pdf') {
      statusDiv.textContent = 'Somente arquivos PDF são permitidos.';
      return false;
    }
  
    if (arquivo.size > 5 * 1024 * 1024) { // Limite de 5MB
      statusDiv.textContent = 'O arquivo excede o limite de 5MB.';
      return false;
    }
  
    return true;
  }
  
  function enviarEmail(event) {
    const arquivoInput = document.getElementById('attachment');
    const statusDiv = document.getElementById('status');
  
    // Validar arquivo
    if (!validarArquivo(arquivoInput)) {
      event.preventDefault();
      return false;
    }
  
    // Mostrar mensagem de envio
    statusDiv.classList.remove('text-red-500');
    statusDiv.classList.add('text-green-500');
    statusDiv.textContent = 'Enviando, por favor aguarde...';
  
    return true;
  }
  
  function fecharJanelaEmail() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
      modal.remove();
    }
  }