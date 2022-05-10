const { TokenExpiredError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const typeHeader = req.headers['token-type'];
    let str = process.env.TOKEN_SECRET;
    if (typeHeader && typeHeader == 'refresh'){
      str = process.env.REFRESH_TOKEN_SECRET;
    }
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send("No token provided");
    jwt.verify(token, str, {algorithms: ['HS256'], audience: 'postman'}, (err, payload) => {
      
      /*if(err.name = 'TokenExpiredError')
      {
        return res.status(401).json({ error: 'Expired Token, Send Refresh Token' });
        //console.log(err);
      }*/

      if(err)
      {
        return res.status(401).json({ error: 'Invalid Token' }),
        console.log(err);
      }
       
      if(!mongoose.isValidObjectId(payload._id)) return res.status(403).json({error: 'Error in user id at authentication'});
      req.user = payload;
      next();
    })
  }
 
  module.exports = authenticateToken;