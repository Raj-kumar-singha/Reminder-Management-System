# Reminder Management System

Build a backend system to manage reminders using Node.js. This system should allow users to create, retrieve, update,
and delete reminders, and include additional features to showcase your understanding of Node.js, Express, and cron
jobs.

## Technical Stack:

- Node.js
- Express.js
- JWT
- node-cron
- MongoDB

## Features:

1. User Authentication.
2. CRUD Operations for Reminders.
3. Retrieve Reminders.
4. Update a Reminder.
5. Delete a Reminder
6. Send Notifications.
7. Reminder Status Tracking.

## Setup

1. Clone the repository.
2. Install the dependencies by running 
```
npm install
```
3. Set up the environment variables in `.env` file.
4. Start the server using 
```
npm start
```

## .env

```.env

PORT = 5050
Mongo_Uri = "mongodb+srv://Node_Assessment:Assessment@cluster0.66svo.mongodb.net/nodeAssesment?retryWrites=true&w=majority"
JWT_SECRET = new_secret

```

## API Endpoints

### User Authentication

- **POST /api/v0/auth/register**: Register a new user.
- **POST /api/v0/auth/login**: Login an existing user.

### Reminders

- **POST /api/v0/create-reminder**: Create a new reminder.
- **GET /api/v0/all-reminder**: Retrieve all reminders.
- **PUT /api/v0/reminder/:id**: update reminders.
- **DELETE /api/v0/reminder/:id**: delete reminders.
- **GET /api/v0/all-reminder?status=pending**: get reminders filter api (status=pending or status=triggered).
