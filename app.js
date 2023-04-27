const express = require("express");
const app = express();
const helmet = require("helmet");

// Helps secure the application by setting various HTTP headers
app.use(helmet());

/* Parses incoming requests with JSON payloads and creates a **body** object
containing the parsed data in the request object (**req.body**) */
app.use(express.json());

// Routers
const tasksRouter = require("./routers/tasksRouter");

// Routes
app.use("/api/v1/tasks", tasksRouter);

const port = 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
