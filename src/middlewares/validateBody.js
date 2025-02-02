import createHttpError from 'http-errors';
export const validateBody = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const responseError = createHttpError(404, error.message, {
        errors: error.detalis,
      });
      next(responseError);
    }
  };
  return func;
};
