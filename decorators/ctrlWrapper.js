// 1. Recevies controller as parameter of the function
// 2. Creates try catch wrapper with the controller
// 3. Executes and returns controller results

const ctrlWrapper = (controller) => {
  const func = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
