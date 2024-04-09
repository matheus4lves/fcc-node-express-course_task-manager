"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
// To avoid having to manually instantiate
const createCustomError = (message, statusCode) => new CustomError(message, statusCode);
exports.createCustomError = createCustomError;
