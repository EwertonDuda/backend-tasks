const Task = require("../models/Task");
const authMiddleware = require("../middlewares/authMiddleware");


// Listar todas as tarefas
exports.getAllTasks = async (req, res) => {
  console.log("🚀 Rota POST /api/tasks acessada!");
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};

// Criar nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

    task.title = title;
    task.description = description;
    task.completed = completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

// Deletar tarefa
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });

    await task.destroy();
    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar tarefa" });
  }
};
