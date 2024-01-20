const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
    },
    player: {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      corporation:{
        type: String,
        enum: ['DPSKT','FBI','GOT'],
        default: 'DPSKT',
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
  User: mongoose.model('User', UserSchema),
  UserSchema,
};
