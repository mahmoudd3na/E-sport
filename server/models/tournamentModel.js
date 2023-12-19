const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The tournament name is required. Please provide a valid string.'],
    },
    users: {
        type: [String],
        default: [],
    },
    place: {
        type: String,
        required: [true, 'The place field is required. Please provide a valid string.'],
    },
    day: {
        type: String,
        required: [true, 'The day field is required. Please provide a valid string.'],
    },
    time: {
        type: String,
        required: [true, 'The time field is required. Please provide a valid string.'],
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        default: "open",
    },
    draw: {
        type: Object,
        default: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 },
    },
    round2: {
        type: Object,
        default: null
    },
    round3: {
        type: Object,
        default: null,
    },
    winner: {
        type: String,
        default: null,
    },
});



module.exports = mongoose.model('Tournament', tournamentSchema);
