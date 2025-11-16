const { z } = require('zod');

const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

const budgetBase = {
  categoryId: z.string().min(1, 'categoryId is required'),
  month: z
    .string()
    .regex(monthRegex, 'month must be in YYYY-MM format'),
  amount: z
    .number({ invalid_type_error: 'amount must be a number' })
    .min(0, 'amount must be >= 0'),
  currency: z.string().min(1).max(10).optional()
};

const createBudgetSchema = z.object(budgetBase);

const updateBudgetSchema = z
  .object({
    amount: budgetBase.amount.optional(),
    currency: budgetBase.currency
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  });

module.exports = {
  createBudgetSchema,
  updateBudgetSchema
};
