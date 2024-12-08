const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    time: { type: Date, required: true },
    recurrence: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'triggered'],
      default: 'pending',
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reminder', reminderSchema);
