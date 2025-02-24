export const parseBooleanFields = (req, res, next) => {
  if (typeof req.body.isFavourite === 'string') {
    req.body.isFavourite = req.body.isFavourite.toLowerCase() === 'true';
  }
  next();
};
