const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secret = "chave_secreta_super_segura"; // depois colocaremos no .env

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário", details: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.json({ message: "Login bem-sucedido", token });
  } catch (err) {
    res.status(500).json({ error: "Erro no login", details: err });
  }
};
