import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error.cjs";

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  // Your custom error message
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ msg: error.message });
  }

  // Generic error message
  res.status(500).json({ msg: "Something went wrong! Try again later." });
};

export default errorHandler;
