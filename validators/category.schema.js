const { z } = require('zod');

const categoryBase = {
  name: z.string().min(1, 'Name is required').max(50),
  type: z.enum(['expense', 'income'], { required_error: 'Type is required' })
};

const createCategorySchema = z.object(categoryBase);

const updateCategorySchema = z.object({
  name: categoryBase.name.optional(),
  type: categoryBase.type.optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

module.exports = {
  createCategorySchema,
  updateCategorySchema
};
