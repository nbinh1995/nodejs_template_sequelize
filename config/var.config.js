exports.statusAuth = {
    FAIL_EMAIL:'fail_email',
    FAIL_PASSWORD:'fail_password'
}

exports.statusToken = {
    EXPIRE_TOKEN:'expire_token',
    SUCCESS_TOKEN:'success_token',
    FAIL_TOKEN:'fail_token'
}

exports.dataPayload = ({id})=>{
    let result = {id};
    return result;
}

exports.pathTokenList = __dirname+'/tokenList.js'