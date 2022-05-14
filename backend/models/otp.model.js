const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp : String,
    mobile : String,
    email: String,
    created: {
        type: Date,
        expires: 299
    }
});
otpModel = mongoose.model('otps' , otpSchema);
module.exports = otpModel;