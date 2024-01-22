const mongoose = require('mongoose');

const clockSchema = new mongoose.Schema(
  {
    // receber hash do player
    // modificar update
    hash: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Clock', clockSchema);
