const formCadastro = document.getElementById("formCadastro");
const formLogin = document.getElementById("formLogin");

// local
const API_URL = "http://localhost:3000";

// produção: troque por algo como:
//const API_URL = "https://techeduca.onrender.com";

if (formCadastro) {
  formCadastro.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const mensagem = document.getElementById("mensagemCadastro");

    mensagem.textContent = "";

    if (!nome || !email || !senha || !confirmarSenha) {
      mensagem.textContent = "Preencha todos os campos.";
      return;
    }

    if (senha !== confirmarSenha) {
      mensagem.textContent = "As senhas não coincidem.";
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nome, email, senha })
      });

      const dados = await resposta.json();
      mensagem.textContent = dados.mensagem || dados.erro;

      if (resposta.ok) {
        formCadastro.reset();
      }
    } catch {
      mensagem.textContent = "Erro ao conectar com o servidor.";
    }
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const senha = document.getElementById("senhaLogin").value;
    const mensagem = document.getElementById("mensagemLogin");

    mensagem.textContent = "";

    if (!email || !senha) {
      mensagem.textContent = "Preencha e-mail e senha.";
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();
      mensagem.textContent = dados.mensagem || dados.erro;

      if (resposta.ok) {
        window.location.href = "./cursos.html";
      }
    } catch {
      mensagem.textContent = "Erro ao conectar com o servidor.";
    }
  });
}