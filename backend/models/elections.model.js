const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true,
        immutable: true,
        index: true
    },
    subtitle: {
        type: String,
        required: true
    },
    choices: {
        type: Array,
        required: true,
        immutable: true
    },
    voteend: {
        required: true,
        immutable: true,
        type: Number,
        default: Date.now() + 2628000
    },
    votelevel: {
        required: true,
        immutable: true,
        type: String,
        default: "NATIONAL"
    },
    votetype: {
        required: true,
        immutable: true,
        type: String,
        default: "ELECTION"
    },
    lastblock: {
        type: mongoose.Schema.Types.ObjectId,
    }
})

electionModel = mongoose.model('ballots', electionSchema);
module.exports = electionModel;

