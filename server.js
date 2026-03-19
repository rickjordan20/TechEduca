// 1. Importa o Express — ele cria e gerencia nosso servidor
const express = require("express");

// 2. Importa o CORS — permite que o navegador "converse" com o servidor
// Sem isso, o navegador bloqueia a comunicação por segurança
const cors = require("cors");

// 3. Cria o servidor (como ligar um computador)
const app = express();

// 4. Ativa o CORS — libera a comunicação entre front-end e back-end
app.use(cors());

// 5. Ativa o leitor de JSON — permite entender os dados recebidos
// Sem isso, o servidor não consegue ler o que o formulário envia
app.use(express.json());

// 6. Define a rota POST "/mensagem"
// Quando o formulário enviar dados para /mensagem, essa função roda
app.post("/mensagem", (req, res) => {

 // 7. req.body contém os dados enviados pelo formulário (nome, email, mensagem)
 console.log(req.body); // Mostra os dados no terminal para você ver

 // 8. Envia uma resposta de volta para o navegador
 res.send("Mensagem recebida com sucesso!");
});

// 9. Inicia o servidor na porta 3000
// Depois disso, o servidor fica "ouvindo" por novas mensagens
app.listen(3000, () => {
 console.log("Servidor rodando em http://localhost:3000");
});