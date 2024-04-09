class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

// To avoid having to manually instantiate
const createCustomError = (message: string, statusCode: number) => new CustomError(message, statusCode);

export { CustomError, createCustomError };
