const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true
    },
    color: {
      type: String
    },
    icon: {
      type: String
    }
  },
  { timestamps: true }
);

// Unique name per user
categorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
