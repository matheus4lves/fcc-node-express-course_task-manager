class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// To avoid having to manually instantiate
const createCustomError = (message, statusCode) => new CustomError(message, statusCode);

module.exports = {
  CustomError,
  createCustomError,
};
