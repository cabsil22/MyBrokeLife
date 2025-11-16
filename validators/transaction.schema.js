const { z } = require('zod');

const transactionBase = {
  categoryId: z.string().min(1, 'categoryId is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  type: z.enum(['expense', 'income'], { required_error: 'Type is required' }),
  date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'date must be a valid date string'
  }),
  description: z.string().max(500).optional(),
  currency: z.string().min(1).max(10).optional()
};

const createTransactionSchema = z.object(transactionBase);

const updateTransactionSchema = z.object({
  categoryId: transactionBase.categoryId.optional(),
  amount: transactionBase.amount.optional(),
  type: transactionBase.type.optional(),
  date: transactionBase.date.optional(),
  description: transactionBase.description,
  currency: transactionBase.currency
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

module.exports = {
  createTransactionSchema,
  updateTransactionSchema
};
