const mongoose = require('mongoose');

const natidSchema = new mongoose.Schema({
    national_id : { 
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        index: true
    },
    mobile: { 
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        index: true
    }
});

natidModel = mongoose.model('NationaIDs', natidSchema);
module.exports = natidModel;