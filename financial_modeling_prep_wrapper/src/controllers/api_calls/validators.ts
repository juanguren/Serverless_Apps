const validateTickerExists = (req, res, next: Function) => {
  const { ticker } = req.params;
  if (ticker) {
    return next();
  }
  return res.status(404).json('Remember to include the ticker as parameter!');
};

export { validateTickerExists };
