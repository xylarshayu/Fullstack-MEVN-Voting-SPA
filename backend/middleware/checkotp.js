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
        if (!thisOtp) {
            console.log(req.body);
            return res.status(403).json({ 
                success: false,
                message: "No OTP Registered"
            });
        } 
        if (thisOtp.otp != otp) {
            console.log("oo", req.body);
            console.log(thisOtp);
            return res.status(401).json({ 
                success: false,
                message: "Incorrect OTP"
            });
        } 
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server error - checkotp");
    }

}

module.exports = otpVerify;