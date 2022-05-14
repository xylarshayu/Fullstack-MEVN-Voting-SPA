const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const voteModel = require('../models/vote.model');
const electionModel = require('../models/elections.model');
const hashit = require('crypto-js/sha256');

router.get('/fetch-all', async (req, res) => {
    try {
        let payload = await electionModel.find();
        console.log("All Elections Fetched");
        res.send(payload);
    }
    catch (error) {
        console.log("Fetch All Exception:\n", error);
        res.send("Didn't work");
    }
})

router.post('/add-election', async (req, res) => {
    try {
        let key = req.body.key;
        if (key == process.env.ADMIN_KEY) {
            let newElection = new electionModel({
                event: req.body.event,
                choices: req.body.choices,
                voteend: req.body.voteend,
                votelevel: req.body.votelevel,
                votetype: req.body.votetype,
                subtitle: req.body.subtitle
            })
            newElection = await newElection.save();
            console.log("Saved Election Successfully");
            res.send(newElection);
        }
        else return res.send("Invalid Access");
    }
    catch (error) {
        console.log("Add Election Exception\n", error);
        res.send("Didn't work");
    }
})

router.post('/initialize-block', async (req, res) => {
    try {
        let event = req.body.event;
        let mobile = "0000000000";
        let choice = 999;
        let hash = hashit(event+mobile+choice).toString();
        let firstBlock = new voteModel({
            event: event,
            mobile: mobile,
            choice: choice,
            hash: hash
        });
        firstBlock = await firstBlock.save();
        let election = await electionModel.findOne({event: event});
        election.lastblock = firstBlock._id;
        election = await election.save();
        res.json({
            election: election,
            block: firstBlock
        });
    }
    catch (error) {
        console.log("Init Block Error:\n", error);
        res.send("Init Block unsuccessful");
    }

})

router.post('/add-vote', auth, async (req, res) => {
    try {
        let event = req.body.event;
        let mobile = req.body.mobile;
        let choice = req.body.choice;
        let doesItExist = await voteModel.findOne({event: event, mobile: mobile});
        if (doesItExist) {
            return res.send("Already voted!");
        }
        let election = await electionModel.findOne({event: event}, 'lastblock');
        let prev_block = await voteModel.findById(election.lastblock);
        let prev_hash = prev_block.hash;
        let hash = hashit(event + mobile + choice + prev_hash).toString();
        let newBlock = new voteModel({
            event: event,
            mobile: mobile,
            choice: choice,
            prev_hash: prev_hash,
            hash: hash
        });
        newBlock = await newBlock.save();
        let lastblock = newBlock._id;
        election.lastblock = lastblock;
        election = await election.save();
        let user = await userModel.findOne({mobile: mobile}, 'events');
        user.events = user.events.push(event);
        user = await user.save();
        res.json({
            newBlock: newBlock,
            election: election
        });
    }
    catch(error) {
        console.log("Exception Add-Vote:\n", error);
        res.send("Error in generating new vote in block-chain");
    }
   
})

router.get('/fetch-vote/:event/:mobile', auth, async (req, res) => {
    try {
        let mobile = req.params.mobile;
        let event = req.params.event;
        let vote = await voteModel.findOne({event: event, mobile: mobile}, '_id choice created');
        if (vote) {
            return res.json({
                succes: true,
                id: vote._id,
                choice: vote.choice,
                created: vote.created
            })
        }
        else {
            return res.json({
                success: false
            })
        }
    }
    catch (error) {
        console.log("Fetch vote exception:\n", error);
        res.send("Failed to fetch vote");
    }
})

router.get('/blockchain/:event', async (req, res) => {
    try {
        let blockchain = [];
        let event = req.params.event;
        let election = await electionModel.findOne({event: event}, 'lastblock');
        console.log("Election:\n", election);
        let lastblock =  await voteModel.findById({_id: election.lastblock}, 'hash prev_hash choice');
        blockchain.push({
            hash: lastblock.hash,
            prev_hash: lastblock.prev_hash,
            choice: lastblock.choice
        });
        console.log(lastblock);
        let block = lastblock;
        let prev_hash = lastblock.prev_hash;
        while (true) {
            block = await voteModel.findOne({hash: prev_hash}, 'hash prev_hash choice');
            if (!block) {
                break;
            }
            prev_hash = block.prev_hash;
            blockchain.push({
                hash: hash,
                prev_hash: block.prev_hash,
                choice: block.choice
            });
        }
        return res.json({
            blockchain: blockchain
        })

    }
    catch (error) {
        console.log("Blockchain-fetch exception\n", error);
        res.send("Failed to fetch blockchain, may have been tampered with");
    }
})



module.exports = router;