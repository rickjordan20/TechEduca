/* 
===============================================
1 PARTE - CONFIGURAR O SERVIDOR
===============================================
*/
// 1. Importar o Express - ele cria e gerencia o servidor
const express = require("express");

// 2. Importar o CORS - permite que o navegador "converse" com o servidor
const cors = require("cors");

// 3. Importa o session  que permite gerenciar sessões de usuario
const session = require("express-session");

// 4. Importa o bcryptjs - para criptografia e compara senhas
const bcrypt = require("bcryptjs");

// 5. Importa a conexão com o banco de dados
const pool = require("./db.js");

// 6. Cria o servidor (como ligar um pc por ex)
const app = express();

// 7. Cria uma lista de instância de conexões
const listOrigins = [
    "http://localhost:5500", // ambiente local (live server)
    "http://127.0.0.1:5500", // variação de localhost
    "https://user.github.io" // dominio do frontend em produção
]

// 8. Ativa o CORS - libera a comunicação entre front-end e back-end
app.use(cors({
    origin:listOrigins, // só aceita requisições dessas origens
    credentials:true, // permite o envio de cookies entre domínios
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'], 
        // métodos permitidos
    allowedHeaders: ["Content-Type","Authorization"] //cabeçalhos aceitos
}));

// 9. Ativa o leitor de JSON - permite entender os dados recebidos
// Sem isso, o servidor não consegue ler o que o formulário envia
app.use(express.json());

//10. Configuração de Sessão (do navegador)
const sessionConfig = {
    secret: process.env.SESSION_SECRET,     
        // chave secreta para assinar o cookie
    resave: false, 
        // não salva a sessões se não houver mudança
    saveUninitialized: false, 
        // não cria sessão para usuários não logados
    name: "techeduca.sid", 
        // nome personalizado do cookir da sessão
    cookie: {
        httpOnly : true, // bloqueia o acesso via JavaScript
        maxAge: 1000 * 60 * 60 // sessão expira em 1 hora (em mil)
    }
}

// 11. Separa o ambiente de teste(localhost) do de produção(Render)
if(process.env.NODE_ENV == "production"){ // ambiente de produção
    app.set("trust proxy",1), // confia no proxy do Render
    sessionConfig.cookie.sameSite = "none", // necessário para os cookies 
    sessionConfig.cookie.secure = true // cookie só trafega em https
} else{ // ambiente de desenvolvimento(teste)
    sessionConfig.cookie.sameSite="lax", // funciona em locahost sem HTTPS
    sessionConfig.cookie.secure = false // permite cookie sem HTTPS local
}

app.use(session(sessionConfig)) // configura a sessão no servidor

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














