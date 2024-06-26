import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import connectDB from "./db/connect.cjs";

// Custom middlewares
import notFound from "./middlewares/not-found.cjs";
import errorHandler from "./middlewares/error-handler.cjs";

// Routers
import router from "./routers/tasksRouter.cjs";

dotenv.config();
const app = express();
// Just to be more descriptive...
const tasksRouter = router;

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
