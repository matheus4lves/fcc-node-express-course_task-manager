"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_cjs_1 = require("../errors/custom-error.cjs");
const errorHandler = (error, _req, res, _next) => {
    // Your custom error message
    if (error instanceof custom_error_cjs_1.CustomError) {
        res.status(error.statusCode).json({ msg: error.message });
    }
    // Generic error message
    res.status(500).json({ msg: "Something went wrong! Try again later." });
};
exports.default = errorHandler;
