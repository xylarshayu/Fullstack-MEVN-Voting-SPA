const otpModel = require('../models/otp.model');

let otpVerify = async (req, res, next) => {
    try {
        let mobile = req.body.mobile;
        let email = req.body.email;
        let otp = req.body.otp;
        let thisOtp = undefined;
        if (mobile) {
            thisOtp = await otpModel.findOne({ 'mobile': mobile }, 'otp');
        }
        else {
            thisOtp = await otpModel.findOne({ 'email': email }, 'otp');
        }
        if (!thisOtp) return res.status(403).send("No OTP registered");
        if (thisOtp.otp != otp) return res.status(401).send("Incorrect OTP");
        next();
    }
    catch (error) {
        console.log(error);
        res.send("Internal server error - checkotp");
    }

}

module.exports = otpVerify;