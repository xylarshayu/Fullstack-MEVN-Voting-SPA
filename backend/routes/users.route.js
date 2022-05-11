const auth = require('../middleware/auth');
const checkotp = require('../middleware/checkotp');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const otpModel = require('../models/otp.model');

router.post('/signup', checkotp, async (req, res) => {
	try {
		let mobile = req.body.mobile;
		let email = req.body.email;
		let pass = req.body.password;
		let country = req.body.country;
		let thisMobile = await userModel.findOne({ 'mobile': mobile }, 'mobile');
		if (thisMobile) return res.json({
			success: false,
			message: "User already exists with this number"
		});
		let thisEmail = await userModel.findOne({ 'email': email }, 'email');
		if (thisEmail) return res.json({
			success: false,
			message: "User already exists with this email"
		});
		let newUser = new userModel({ 
			mobile: mobile,
			email: email,
			password: pass,
			country: country
		})
		newUser = await newUser.save();
		console.log("Signed up successfully:\n", newUser);
		res.json({
			success: true,
			message: "Welcome to Voter-Space"
		});
		
	} catch (error) {
		console.log("Exception users/signup", error);
		res.json({
			success: false,
			message: "Internal Server Error"
		});
	}

})

router.post('/refresh-token', auth, async (req, res) => {
	try {

		let user = req.user;
		let thisUser = await userModel.findOne({ _id: user._id }, 'refresh_token');
		console.log(thisUser);
		if (!thisUser) return res.status(501).json({ error: 'Internal Server Error 1' });
		if (!(thisUser.refresh_token)) return res.status(501).json({ error: 'Internal Server Error' });

		const refresh_token = req.headers['authorization'].split(' ')[1];
		if (thisUser.refresh_token === refresh_token) {

			let access_token = thisUser.generateAccessToken();
			res.json({ "access_token": access_token });

		} else {
			res.status(401).send("Bad Request!");
		}
	} catch (error) {
		console.log("Exception refresh token", error);
		res.status(500).send("Refresh Token error");
	}
})

router.post('/pre-login', async (req, res) => {
	try {
		let mobile = req.body.mobile;
		let pass = req.body.password;
		let thisUser = await userModel.findOne({'mobile' : mobile}, 'password');
		if (!thisUser) return res.json({
			success: false,
			message: "User doesn't exist"
		});
		if (thisUser.password != pass) return res.json({
			success: false,
			message: "Password Incorrect"
		});
		else return res.json({
			success: true,
			message: "OTPs generated"
		});
	}
	catch (error) {
		console.log("Exception pre-login:\n", error);
		res.status(500).send("Internal Server Error");
	}
})

router.post('/login', checkotp, async (req, res) => {
	try {
		let mobile = req.body.mobile;
		let thisUser = await userModel.findOne({ 'mobile': mobile }, 'mobile, refresh_token');
		if (!thisUser) return res.send("User not signed up.");
		let access_token = thisUser.generateAccessToken();
		let refresh_token = thisUser.generateRefreshToken();
		let new_tokens = {
			"auth": access_token,
			"refresh": refresh_token,
		}
		thisUser.refresh_token = refresh_token;
		thisUser = await thisUser.save();
		console.log("User and refresh token ", thisUser);
		res.json(new_tokens);
	}
	catch (error) {
		console.log("Exception login error:\n", error);
		res.send("Login Error");
	}
})

router.post('/logout', async(req, res) => {
	try {
		let mobile = req.body.mobile;
		let thisUser = await userModel.findOne({ 'mobile': mobile }, 'refresh_token');
		if (!thisUser) return res.json({
			success: false,
			message: "User doesn't exist?"
		});
		thisUser.refresh_token = "";
		res.json({
			success: true,
			message: "Logged out"
		});
	}
	catch (error) {
		console.log("Exception logout error:\n", error);
		res.status(500).send("Internal Server Error");
	}
})


module.exports = router;