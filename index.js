const express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  dotenv = require('dotenv'),
  reminderCron = require('./cron/reminderCron'),
  routes = require('./routes/index');
dotenv.config();

app.use(express.json());

app.use('/api/v0', routes);

// Error-handling
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Bad Request',
  });
});

mongoose
  .connect(process.env.Mongo_Uri)
  .then(() => console.log('Db Connected Successfully'))
  .catch((err) => console.log(err));

reminderCron.start();

app.listen(process.env.PORT || 4040, () => {
  console.log(`Server is running on port no ${process.env.PORT || 4040}`);
});
