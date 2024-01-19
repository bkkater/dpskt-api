const mongoose = require('mongoose');

const { PlayerSchema} = require('./Player');

const clockSchema = new mongoose.Schema(
{
    player: {
        type: PlayerSchema,
        required: true
    },
    startAt: {
        type: Date,
        default: Date.now
    },
    endAt: {
        type: Date,
        default: Date.now
    },


}, {timestamps: true})

module.exports = mongoose.model('Clock', clockSchema);
