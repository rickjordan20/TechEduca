/* 
===============================================
1 PARTE - CONFIGURAR O SERVIDOR
===============================================
*/
// 1. Importar o Express - ele cria e gerencia o servidor
const express = require("express");

// 2. Importar o CORS - permite que o navegador "converse" com o servidor
const cors = require("cors");

// 3. Cria o servidor (como ligar um pc por ex)
const app = express();

// 4. Ativa o CORS - libera a comunicação entre front-end e back-end
app.use(cors());

// 5. Ativa o leitor de JSON - permite entender os dados recebidos
// Sem isso, o servidor não consegue ler o que o formulário envia
app.use(express.json());

/* 
===============================================
2 PARTE - CRIAR ROTA E INICIAR
===============================================
*/
// 6. Define a rota POST "/mensagem"
// Quando o formulário enviar os dados para /mensagem, essa função roda
app.post("/mensagem", (req,res) => {
     //7. req.body contém os dados enviados pelo formulário
        //(nome,email, mensagem)
    console.log(req.body); // mostra os dados no terminal

    //8. Envia uma mensagem de volta para o navegador
    res.send("Mensagem recebida com sucesso!");
});

// 9. Inicia o Servidor na PORTA 3000
// Depois, o servidor fica "ouvindo" por novas mensagens
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});














