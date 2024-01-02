const asyncWrapper = fn => {
  return async (req, res, next) => {
    // Try executing the function it received as an argument, returning
    // the successful result or forwarding the error to the next middleware.
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
