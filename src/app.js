const express = require("express");
const sequelize = require("./config/db");
const Task = require("./models/Task");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("API rodando 🎉");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("🟢 Conectado ao PostgreSQL com sucesso!");
    return sequelize.sync();
  })
  .then(() => {
    console.log("📦 Modelo sincronizado com o banco!");
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("🔴 Erro ao conectar ao banco de dados:", err);
  });

module.exports = app;
