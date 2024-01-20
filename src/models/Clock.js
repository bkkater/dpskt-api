const mongoose = require('mongoose');

const { PlayerSchema} = require('./User');

const clockSchema = new mongoose.Schema(
{
    player: {
        type: PlayerSchema,
        required: true,
        select: false,
    },
    startAt: {
        type: Date,
        default: Date.now,
    },
    endAt: {
        type: Date,
        default: Date.now,
    },


}, {timestamps: true})

module.exports = mongoose.model('Clock', clockSchema);
