import { RequestHandler, Request, Response, NextFunction } from "express";

const asyncWrapper = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Try executing the function it received as an argument, returning
    // the successful result or forwarding the error to the next middleware.
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
