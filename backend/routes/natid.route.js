const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const natidModel = require('../models/natid.model');


router.post('/makeid', async (req, res) => {
    try {
        let mobile = req.body.mobile;
        let checkMobile = await natidModel.findOne({ mobile: mobile });
        if (checkMobile) return res.send(checkMobile.national_id);
        let id = Math.floor(1000000000 + Math.random() * 9000000000);
        /* This checks if the national ID already exists, randomizes it again if yes */
        while (await natidModel.findOne({ national_id: id.toString() })) {
          id = Math.floor(1000000000 + Math.random() * 9000000000);
        }
        let user = new natidModel({
            mobile: mobile,
            national_id: id.toString()
        });
        user = await user.save();
        console.log("---\nUser NatID Genereted:\n**************************\n", user);
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
        console.log("---\n/getnumber\n", req.body);
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
        console.log("---\nGetNumber Exception:\n", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
})

module.exports = router;