require('dotenv').config({path: __dirname + '/../.env'});
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const TOKEN_EXPIRES = process.env.JWT_TOKEN_EXPIRES;

const generateJwtToken = (data) => {
    return jwt.sign(data,JWT_SECRET,{ algorithm: 'RS256' ,expiresIn: 60*TOKEN_EXPIRES} );
}

const verifyJwtToken = (token)=>{
    return jwt.verify(token,JWT_SECRET, { algorithms: ['RS256']});
}

module.exports = {
    generateJwtToken,
    verifyJwtToken,
}