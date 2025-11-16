const { z } = require('zod');

const categoryBase = {
  name: z
    .string()
    .min(1, 'name is required')
    .max(50, 'name must be 50 characters or less'),
  type: z.enum(['expense', 'income'], {
    required_error: 'type is required'
  }),
  color: z.string().max(20).optional(),
  icon: z.string().max(50).optional()
};

const createCategorySchema = z.object(categoryBase);

const updateCategorySchema = z
  .object({
    name: categoryBase.name.optional(),
    type: categoryBase.type.optional(),
    color: categoryBase.color,
    icon: categoryBase.icon
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  });

module.exports = {
  createCategorySchema,
  updateCategorySchema
};
