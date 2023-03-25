const express = require('express');
const indexRouter = express.Router();
const authRouter = require('./auth/routes/auth.route');
const taskRoutes = require('./task/routes/task.route');

indexRouter.get('/', function(req, res) {
    res.send('Dashboard-react API is running!');
});

indexRouter.use('/auth', authRouter)
indexRouter.use('/tasks', taskRoutes);

module.exports = indexRouter;
