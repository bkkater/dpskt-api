const mongoose = require('mongoose');

const clockSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Clock', clockSchema);
