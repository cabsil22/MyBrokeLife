const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ['google'],
      required: true
    },
    providerId: {
      type: String,
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

// Each providerId is unique per provider
userSchema.index({ provider: 1, providerId: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
