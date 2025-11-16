const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true
    },
    month: {
      type: String, // 'YYYY-MM'
      required: true,
      match: /^\d{4}-(0[1-9]|1[0-2])$/
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  { timestamps: true }
);

// One budget per user + category + month
budgetSchema.index(
  { userId: 1, categoryId: 1, month: 1 },
  { unique: true }
);

module.exports = mongoose.model('Budget', budgetSchema);
