const userModel = require('../models/user.model');
const otpModel = require('../models/otp.model');
const auth = require('../middleware/auth');
const checkotp = require('../middleware/checkotp');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

router.post('/generate-otp', async (req, res) => {
	try {
		let mobile = req.body.mobile;
		let email = req.body.email;
		let otp = undefined;
		if (mobile) {
			let regExp = /[a-zA-Z]/g;
			if (mobile.length != 10 || regExp.test(mobile)) {
				console.log(mobile);
				return res.json( {
				success: false,
				message : "Invalid number"
			} );}
			otp = await otpModel.findOne({'mobile': mobile}, 'created');
		}
		else if (email) {
			let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (!regExp.test(email)) return res.json({
				success: false,
				message: "Invalid Email Address"
			});
			otp = await otpModel.findOne({'email': email}, 'created');
		}
		else {
			return res.status(400).json({ 
				success: false,
				message: "Invalid Request Body"
			});
		}
		
		if (!otp) {
			let otp_key = Math.floor(Math.random() * 10000);
			if (mobile) {
				otp = new otpModel({
					otp: otp_key,
					mobile: mobile,
					created: Date.now()
				});
			}
			else {
				otp = new otpModel({
					otp: otp_key,
					email: email,
					created: Date.now()
				})
			}
			
			otp = await otp.save();
		}
		console.log(otp);
		return res.json({
			success: true,
			message: "OTP generated successfully for " + (mobile || email),
			otptime : otp.created.getTime(),
		});
	}
	catch (error) {
		console.log("Exception OTP:\n", error);
		res.send("Internal Server Error");
	}
})

router.post('/verifyotp', checkotp, async (req, res) => {
	res.json({
		success: true,
		message: "OTP correct"
	});
});


module.exports = router;