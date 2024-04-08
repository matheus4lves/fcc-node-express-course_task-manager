import { RequestHandler } from "express";

const notFound: RequestHandler = (_req, res, _next) => {
  res.status(404).send("The page you're looking for does not exist!");
};

export default notFound;
