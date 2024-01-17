const { CustomError } = require("../errors/custom-error");

const errorHandler = (error, req, res, next) => {
  // Your custom error message
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ msg: error.message });
  }

  // Generic error message
  res.status(500).json({ msg: "Something went wrong! Try again later." });
};

module.exports = errorHandler;
