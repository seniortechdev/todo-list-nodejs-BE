// load env variables
require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const tasksRouter = require('./routes/tasksRoutes');
const mongoose = require("mongoose");

// Connect to db
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//Enable CORS for all routes
const cors = require('cors');
app.use(cors());

// Body parsing middleware (if you need to handle JSON or URL-encoded data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach your routes to the app
app.use("/tasks", tasksRouter);

// List all endpoints
const listEndpoints = require('express-list-endpoints');
const endpoints = listEndpoints(app);
console.log("List of available routes:");
endpoints.forEach((route) => {
  console.log(`[${route.methods}] ${route.path}`);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
