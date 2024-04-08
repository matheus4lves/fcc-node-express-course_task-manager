require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
import connectDB from "./db/connect.cjs";

// Custom middlewares
const notFound = require("./middlewares/not-found.cjs");
const errorHandler = require("./middlewares/error-handler.cjs");

// Helps secure the application by setting various HTTP headers
app.use(
  helmet({
    // Your policy should include a default-src policy directive, which is a fallback
    // for other resource types when they don't have policies of their own
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net/"],
      },
    },
  })
);

/* Parses incoming requests with JSON payloads and creates a **body** object
containing the parsed data in the request object (**req.body**) */
app.use(express.json());

app.use(express.static("build/public"));

// Routers
const tasksRouter = require("./routers/tasksRouter.cjs");

// Routes
// You want to forward requests made to this route to this router
app.use("/api/v1/tasks", tasksRouter);

app.use(notFound);

// This must be added after all the routes, including the "Not Found" route
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(port, () => console.log(`Server is listening on http://localhost:${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
