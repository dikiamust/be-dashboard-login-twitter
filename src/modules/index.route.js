const express = require('express');
const indexXouter = express.Router();

const taskRoutes = require('./task/routes/task.route');

indexXouter.get('/', function(req, res) {
    res.send('Task management API is running!');
});

indexXouter.use('/tasks', taskRoutes);

module.exports = indexXouter;
