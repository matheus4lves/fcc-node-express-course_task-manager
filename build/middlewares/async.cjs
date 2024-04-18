"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper = (fn) => {
    return (req, res, next) => {
        // Try executing the function it received as an argument, returning
        // the successful result or forwarding the error to the next middleware.
        try {
            fn(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = asyncWrapper;
