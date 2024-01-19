const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
    },
    player: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: [
          'Recruta',
          'Soldado',
          'Cabo',
          'Sargento',
          'Sub-Tenente',
          'Tenente',
          'Major',
          'Capitão',
          'Sub-Comando',
          'Comando',
        ],
        default: 'Recruta',
        required: true,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      statusClock: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = {
  Player: mongoose.model('Player', PlayerSchema),
  PlayerSchema,
};
