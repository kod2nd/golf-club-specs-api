const tryCatchWrapper = asyncFunc => {
    return async (req, res, next) => {
      try {
        await asyncFunc(req, res, next);
      } catch (error) {
        console.log("ERRORRRRRRRRRRRRRRRR", error)
        next(error);
      }
    }
  };

  module.exports = tryCatchWrapper