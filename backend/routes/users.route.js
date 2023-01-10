const auth = require('../middleware/auth');
const checkotp = require('../middleware/checkotp');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const otpModel = require('../models/otp.model');

router.get('/exists/:type', async (req, res) => {
	try {
		let type = req.params.type;
		let id = req.query.id;
		let thisUser = await userModel.findOne({ [type]: id })
		if (thisUser) return res.send(true);
		else return res.send(false);
	}
	catch (e) {
		console.log("---\nExistence check exception:\n", e);
		res.send("Internal Server Error");
	}


})

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
		console.log("---\nSigned up successfully:\n", newUser);
		res.json({
			success: true,
			message: "Welcome to Voter-Space"
		});

	} catch (error) {
		console.log("---\nException users/signup", error);
		res.json({
			success: false,
			message: "Internal Server Error"
		});
	}

})

router.post('/refresh-token', async (req, res) => {
	try {
		let refresh_token = req.body.refresh_token;
		try {
			if (refresh_token == null) {
				return res.json({
					success: false,
					message: "Token Not Provided"
				})
			}
			jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, {algorithms: ['HS256']}, (err, payload) => {
				if (err) {
					console.log("---\nRefresh Token Exceeption during auth:\n", err);
					return res.json({
						success: false,
						message: "Invalid Token"
					})
				}
				if(!mongoose.isValidObjectId(payload._id)) return res.status(403).json({
					success: false,
					message: 'Error in user id at refresh authentication'
				});
				req.user = payload;
			})
		}
		catch (error) {
			console.log("---\nRefresh Token Exceeption during auth 1:\n", error);
			return res.status(500).send("");
		}
		let user = req.user;
		let thisUser = await userModel.findOne({ _id: user._id }, 'refresh_token');
		console.log(thisUser);
		if (!thisUser) return res.status(501).json({ error: 'Internal Server Error 1' });
		if (!(thisUser.refresh_token)) return res.status(501).json({ error: 'Internal Server Error' });

		
		if (thisUser.refresh_token === refresh_token) {

			let access_token = thisUser.generateAccessToken();
			res.json({ "access_token": access_token });

		} else {
			res.status(401).send("Bad Request!");
		}
	} catch (error) {
		console.log("---\nException refresh token", error);
		res.status(500).send("Refresh Token error");
	}
})

router.post('/pre-login', async (req, res) => {
	try {
		let mobile = req.body.mobile;
		let pass = req.body.password;
		let thisUser = await userModel.findOne({ 'mobile': mobile }, 'password');
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
		console.log("---\nException pre-login:\n", error);
		res.status(500).send("Internal Server Error");
	}
})

router.post('/login', checkotp, async (req, res) => {
	try {
		console.log(req.body.otp);
		let mobile = req.body.mobile;
		let thisUser = await userModel.findOne({ 'mobile': mobile }, 'mobile, refresh_token');
		if (!thisUser) return res.status(400).send("User not signed up.");
		let access_token = thisUser.generateAccessToken();
		let refresh_token = thisUser.generateRefreshToken();
		thisUser.refresh_token = refresh_token;
		thisUser = await thisUser.save();
		console.log("---\nUser and refresh token ", thisUser);
		res.json({
			success: true,
			access_token: access_token,
			refresh_token: refresh_token
		});
	}
	catch (error) {
		console.log("---\nException login error:\n", error);
		res.send("Login Error");
	}
})

router.post('/logout', async (req, res) => {
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
		console.log("---\nException logout error:\n", error);
		res.status(500).send("Internal Server Error");
	}
})

router.post('/getuser', auth, async (req, res) => {
	try {
		let user = req.user;
		let thisUser = await userModel.findOne({ _id: user._id }, 'mobile events');
		if (!thisUser) return res.json({
			success: false,
			message: "User may not exist"
		});
		console.log(thisUser.events);
		res.json({
			success: true,
			message: "User Gotten",
			userData: {
				mobile: thisUser.mobile,
				events: thisUser.events
			}
		})
	}
	catch (error) {
		console.log("---\nException getuser:\n", error);
	}

})


module.exports = router;