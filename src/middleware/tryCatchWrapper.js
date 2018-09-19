const tryCatchWrapper = asyncFunc => {
    return async (req, res, next) => {
      try {
        await asyncFunc(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  };

  module.exports = tryCatchWrapper