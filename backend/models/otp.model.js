const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp : String,
    mobile : String,
    email: String,
    created: Date,
});
otpModel = mongoose.model('otps' , otpSchema);
module.exports = otpModel;