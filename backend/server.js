const db = require('./db');
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const auth = require('./middleware/auth');

app.use(bodyParser.json());

const usersRoute = require('./routes/users.route');
const otpsRoute = require('./routes/otps.route');
const natRoute = require('./routes/natid.route');
const voteRoute = require('./routes/vote.route');
app.use('/api/users', usersRoute);
app.use('/api/otps', otpsRoute);
app.use('/api/natid', natRoute);
app.use('/api/vote', voteRoute);

const port = process.env.PORT;

app.listen(port, function() {
	console.log("Backend running on port: ", port);
});