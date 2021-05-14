require('dotenv').config({path: __dirname + '/../.env'});
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const TOKEN_EXPIRES = process.env.JWT_TOKEN_EXPIRES;

exports.generateJwtToken = (data) => {
    return jwt.sign(data,JWT_SECRET,{ algorithm: 'HS256' ,expiresIn: 60*TOKEN_EXPIRES} );
}

exports.verifyJwtToken = (token)=>{
    return jwt.verify(token,JWT_SECRET, { algorithms: ['HS256']});
}
