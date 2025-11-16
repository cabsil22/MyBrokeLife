const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
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
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true
    },
    date: {
      type: Date,
      required: true,
      index: true
    },
    description: {
      type: String,
      trim: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
