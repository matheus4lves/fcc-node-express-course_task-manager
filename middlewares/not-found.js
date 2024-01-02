const notFound = (req, res, next) => {
  res.status(404).send("The page you're looking for does not exist!");
};

module.exports = notFound;
