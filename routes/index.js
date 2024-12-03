const express = require('express'),
  router = express.Router(),
  { register, login } = require('../controllers/authControllers'),
  {
    createReminder,
    getReminders,
    updateReminder,
    deleteReminder,
  } = require('../controllers/reminderControllers'),
  { authMiddleware } = require('../middlewares/authMiddleware');

//! Auth Routes 
router.post('/auth/register', register);
router.post('/auth/login', login);

//! Reminder Routes
router.post("/create-reminder", authMiddleware, createReminder);
router.get("/all-reminder", authMiddleware, getReminders);
router.get("/all-reminder/:status", authMiddleware, getReminders);
router.put("/reminder/:id", authMiddleware, updateReminder);
router.delete("/reminder/:id", authMiddleware, deleteReminder);

module.exports = router;
