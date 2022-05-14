const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    mobile : {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
        index: true
    },
    name : String,
    email : {
        type: String,
        unique: true,
        required: true,
    },
    country : String,
    refresh_token : String,
    password: String,
    events: {
        type: Array,
    }
});

userSchema.methods.generateAccessToken = function() {
    
    return jwt.sign({_id: this._id}, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY, algorithm: 'HS256', audience: 'postman' });
}
userSchema.methods.generateRefreshToken = function() {
    
    return jwt.sign({ _id : this._id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_JWT_EXPIRY , algorithm: 'HS256', audience: 'postman'});
}

userModel = mongoose.model('users', userSchema);

module.exports = userModel;