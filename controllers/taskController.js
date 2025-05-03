const Task = require('../models/task');

exports.listTasks = async (req, res) => {
  const { page = 1 } = req.query;
  const tasks = await Task.find({ userId: req.session.userId })
    .sort({ dueDate: 1 });
  res.render('tasks/list', { tasks });
};

exports.getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.session.userId });
  res.render('tasks/detail', { task });
};

exports.getCreateForm = (req, res) => {
  res.render('tasks/create');
};

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  await Task.create({ title, description, dueDate, priority, userId: req.session.userId });
  res.redirect('/tasks');
};

exports.getEditForm = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.session.userId });
  res.render('tasks/edit', { task });
};

exports.updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  await Task.updateOne(
    { _id: req.params.id, userId: req.session.userId },
    { title, description, dueDate, priority, status }
  );
  res.redirect('/tasks');
};

exports.deleteTask = async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.session.userId });
  res.redirect('/tasks');
};


