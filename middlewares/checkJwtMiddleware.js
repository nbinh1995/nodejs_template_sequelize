const jwt = require("jsonwebtoken");
const { generateJwtToken , verifyJwtToken } = require('../config/jwt.config');
const {dataPayload} = require('../config/var.config');

const checkJwtMiddleware = (req , res , next ) => {
  //Get the jwt token from the head
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  let jwtPayload;
  //Try to validate the token and get data
  try {
    jwtPayload = verifyJwtToken(token);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  if(Date.now() >= jwtPayload.exp*1000){
    let data = dataPayload(jwtPayload);
    const newToken = generateJwtToken(data);
    res.setHeader("authorization",'Bearer '+newToken);
  }

  //Call the next middleware or controller
  next();
};

module.exports = checkJwtMiddleware;