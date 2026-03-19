// 1. Pega o formulário pelo ID que colocamos no HTML
const form = document.getElementById("formContato");

// 2. Fica "ouvindo" o momento em que o usuário clica em Enviar
form.addEventListener("submit", async function (event) {

 // 3. Impede que a página recarregue (comportamento padrão do formulário)
 event.preventDefault();

 // 4. Lê o que o usuário digitou em cada campo
 const nome = document.getElementById("nome").value;
 const email = document.getElementById("email").value;
 const mensagem = document.getElementById("mensagem").value;

 // 5. Agrupa os dados em um objeto (como uma caixinha organizada)
 const novaMensagem = { nome, email, mensagem };
 try {
    // 6. Envia os dados para o servidor usando fetch
    const resposta = await fetch("http://localhost:3000/mensagem", {
      method: "POST",            // POST = estamos enviando dados
      headers: {
        "Content-Type": "application/json" // Avisa que o formato é JSON
      },
      body: JSON.stringify(novaMensagem)   // Converte o objeto para texto JSON
    });

    // 7. Lê a resposta que o servidor enviou de volta
    const dados = await resposta.text();

    // 8. Mostra a resposta para o usuário
    alert(dados);

    // 9. Limpa os campos do formulário após o envio
    form.reset();

  } catch (erro) {
    // 10. Se algo deu errado (servidor offline, por exemplo), avisa o usuário
    alert("Erro ao conectar com o servidor.");
  }
 
});

 