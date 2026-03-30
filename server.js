require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const pool = require("./db");

const app = express();

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://SEUUSUARIO.github.io"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: "techeduca.sid",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sessionConfig.cookie.sameSite = "none";
  sessionConfig.cookie.secure = true;
} else {
  sessionConfig.cookie.sameSite = "lax";
  sessionConfig.cookie.secure = false;
}

app.use(session(sessionConfig));

// rota já existente
app.post("/mensagem", (req, res) => {
  console.log(req.body);
  res.send("Mensagem recebida com sucesso!");
});

// cadastro
app.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Preencha todos os campos." });
    }

    const [existe] = await pool.execute(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(409).json({ erro: "E-mail já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );

    res.status(201).json({ mensagem: "Cadastro realizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao cadastrar usuário." });
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Preencha e-mail e senha." });
    }

    const [rows] = await pool.execute(
      "SELECT id, nome, email, senha FROM usuarios WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado." });
    }

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha inválida." });
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    res.json({ mensagem: "Login realizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
});

// verifica sessão
app.get("/me", (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({ logado: false });
  }

  res.json({
    logado: true,
    usuario: req.session.usuario
  });
});

// logout
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("techeduca.sid");
    res.json({ mensagem: "Logout realizado com sucesso." });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando");
});