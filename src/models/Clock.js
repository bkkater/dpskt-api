const mongoose = require('mongoose');

const clockSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    startAt: {
      type: String,
    },
    endAt: {
      type: String,
    },
  },

);

module.exports = mongoose.model('Clock', clockSchema);
