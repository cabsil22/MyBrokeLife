function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formatted = result.error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }));
      return res.status(400).json({
        error: 'Validation failed',
        details: formatted
      });
    }
    req.validatedBody = result.data;
    next();
  };
}

module.exports = { validateBody };
