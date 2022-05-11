const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const natidModel = require('../models/natid.model');


router.post('/makeid', async (req, res) => {
    try {
        let mobile = req.body.mobile;
        let checkMobile = await natidModel.findOne({ mobile: mobile });
        if (checkMobile) return res.send(checkMobile.national_id);
        let id = Math.floor(Math.random() * 10000000000);
        if (id.toString().length < 10) id += 1000000000;
        while (await natidModel.findOne({ national_id: id.toString() })) {
            id = Math.floor(Math.random() * 10000000000);
        }
        let user = new natidModel({
            mobile: mobile,
            national_id: id
        });
        user = await user.save();
        console.log("User Genereted:\n**************************\n", user);
        return res.send(user.national_id);
    }
    catch (error) {
        console.log("Make ID Exception:\n", error);
        res.status(500).send("Cant generate National ID");
    }
})

router.post('/getnumber', async (req, res) => {
    try {
        let id = req.body.natid;
        console.log(req.body);
        let user = await natidModel.findOne({ national_id: id }, 'mobile');
        if (user) return res.json({
            success: true,
            message: 'Success',
            mobile: user.mobile
        });
        else {
            return res.json({
                success: false,
                message: "ID doesn't exist, make a `/makeid` POST request at same uri",
                mobile: null
            })
        };
    }
    catch (error) {
        console.log("GetNumber Exception:\n", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
})

module.exports = router;