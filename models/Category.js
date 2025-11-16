const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true
    },
    color: { type: String }, // optional, for UI (e.g. #FF0000)
    icon: { type: String }   // optional, e.g. "shopping_cart"
  },
  { timestamps: true }
);

categorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
