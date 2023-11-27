require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const connectDB = require("./db/connect");

// Helps secure the application by setting various HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
      },
    },
  })
);

/* Parses incoming requests with JSON payloads and creates a **body** object
containing the parsed data in the request object (**req.body**) */
app.use(express.json());

app.use(express.static("public"));

// Routers
const tasksRouter = require("./routers/tasksRouter");

// Routes
app.use("/api/v1/tasks", tasksRouter);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
