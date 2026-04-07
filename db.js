require("dotenv").config();
const mysql = require("mysql2/promise");

const poll = mysql.createPool({  // cria um grupo de conexões
    host: process.env.DB_HOST, // process => lê as credencias do .env
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {rejectUnauthorized:false},    
        // habilita conexão segura com o Aiven via SSL
    waitForConnections: true,
        //se todas conexões tiverem ocupadas, aguarda na fila
    connectionLimit: 10
        // máximo de 10 conexões abertas ao mesmo tempo
});

module.exports = pool; //  exporta o poll para ser usado no server.js