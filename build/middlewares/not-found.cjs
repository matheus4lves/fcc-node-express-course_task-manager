"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (_req, res, _next) => {
    res.status(404).send("The page you're looking for does not exist!");
};
exports.default = notFound;
