const mongoose = require('mongoose');
const hashit = require('crypto-js/sha256'); 

const voteSchema = new mongoose.Schema({
    event : {
        type: String,
        required: true,
        immutable: true
    },
    mobile : {
        type: String,
        required: true,
        immutable: true
    },
    choice: { 
        type: Number,
        required: true,
        index: false,
        immutable: true
    },
    created: {
        type: Number,
        default: Date.now(),
        immutable: true
    },
    prev_hash: {
        type: String,
        default: hashit(Date.now()).toString(),
        immutable: true
    },
    hash: {
        type: String,
        immutable: true
    }
});

voteSchema.index({event: 1, mobile: 1,} , {unique: true});



voteModel = mongoose.model('votespace', voteSchema);
module.exports = voteModel;