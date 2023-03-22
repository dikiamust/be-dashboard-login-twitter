const express = require('express');
const indexRouter = express.Router();

const taskRoutes = require('./task/routes/task.route');

indexRouter.get('/', function(req, res) {
    res.send('Task management API is running!');
});

indexRouter.use('/tasks', taskRoutes);

module.exports = indexRouter;
