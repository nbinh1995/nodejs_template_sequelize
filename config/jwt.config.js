require('dotenv').config({path: __dirname + '/../.env'});
const jwt = require('jsonwebtoken');
const fs = require('fs');
const {statusToken,pathTokenList,dataPayload} = require('./var.config')
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const TOKEN_EXPIRES = process.env.JWT_TOKEN_EXPIRES;

exports.generateJwtToken = (data) => {
    return jwt.sign(data,JWT_SECRET,{ algorithm: 'HS256' ,expiresIn: 60*TOKEN_EXPIRES} );
}

exports.verifyJwtToken = (token)=>{
    return jwt.verify(token,JWT_SECRET, { algorithms: ['HS256']});
}

exports.checkTokenList = (token) => {
    try {
        if (fs.existsSync(pathTokenList)) {
            const tokenList = require('./tokenList');
            if(tokenList.isArray() && tokenList.indexOf(token)!=-1){
                let  data = this.verifyJwtToken(token);
                if(Date.now() >= data.exp*1000){
                    let jwtPayload = dataPayload(data)
                    const newToken = this.generateJwtToken(jwtPayload);
                    return {status:statusToken.EXPIRE_TOKEN,token:newToken};
                }else{
                    return {status:statusToken.SUCCESS_TOKEN};
                }
            }else{
                return {status:statusToken.FAIL_TOKEN};
            }
        }else{
            return  {status:statusToken.FAIL_TOKEN};
        }
        } catch(err) {
        return {status:'some_errors'};
    }
}
