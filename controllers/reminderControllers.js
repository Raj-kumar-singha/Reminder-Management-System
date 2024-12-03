const Reminder = require('../models/reminders'),
  crypto = require('crypto');

//* Generating unique id using node Built-in Method
function generateUniqueId() {
  return crypto.randomBytes(8).toString('hex');
}

exports.createReminder = async (req, res) => {
  try {
    const { message, time, recurrence } = req.body;

    const reminder = await Reminder.create({
      id: generateUniqueId(),
      message,
      time,
      recurrence,
      user: req.user._id,
    });

    // Populate `user` with `username` and `_id`
    const populatedReminder = await Reminder.findById(reminder._id)
      .populate('user', 'username _id')
      .select('-__v -_id'); // Exclude `__v`

    res.status(201).json({
      Msg: 'Reminder created successfully',
      Reminder: populatedReminder,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const { status } = req.query; // Optional status filter
    const userId = req.user._id; // Get the logged-in user

    const query = { user: userId };

    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Fetch reminders for the logged-in user
    const reminders = await Reminder.find(query)
      .populate('user', 'username _id')
      .select('-__v -_id');

    res
      .status(200)
      .json({ noOfReminders: reminders.length, Reminders: reminders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve reminders' });
  }
};

exports.updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const reminder = await Reminder.findOneAndUpdate(
      { id, user: req.user._id },
      update,
      { new: true }
    )
      .populate('user', 'username _id')
      .select('-__v -_id');

    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res
      .status(200)
      .json({ Msg: 'Reminder updated successfully', Reminders: reminder });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminder.findOneAndDelete({
      id,
      user: req.user._id,
    });
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res.json({ message: `${id} Reminder deleted successfully` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
