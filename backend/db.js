const process = require("process");
const mongoose = require('mongoose');
const connection = mongoose.connection;

var connected = false;

var connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/voterspace');
}

try {
    connectDB();
    connection.on('connecting', () => {
        console.log("Initialising mongoose connection");
    })

    connection.on('disconnecting', () => {
        console.log("Mongoose connection disconnecting");
    })

    connection.on('disconnected', () => {
        console.log("Mongoose connection disconnected");
    })

    connection.on('connected', () => {
        console.log("Mongoose connection established");
        connected = true;
    });
} catch (error) {
    console.log("DB Exception", error);
}

process.on('SIGINT', (signal) => {
    console.log(`Received ${signal}`);
    connected ? mongoose.disconnect() : console.log('DB already disconnected');
    process.exit();
})