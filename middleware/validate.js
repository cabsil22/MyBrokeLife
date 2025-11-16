// src/middleware/validate.js
function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const details = parsed.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }));
      return res.status(400).json({
        error: 'Validation failed',
        details
      });
    }
    req.validatedBody = parsed.data;
    next();
  };
}

module.exports = { validateBody };
