const cron = require('node-cron'),
  Reminder = require('../models/reminders');

const reminderCron = cron.schedule('* * * * *', async () => {
  try {
    const reminders = await Reminder.find({
      status: 'pending',
    });
    
    console.log("cron triggered");

    for (const reminder of reminders) {
      console.log(`Reminder status updated to Triggered: ${reminder.id}`);
      reminder.status = 'triggered';
      await reminder.save();
    }
  } catch (err) {
    console.error('Error in cron job:', err);
  }
});

module.exports = reminderCron;
