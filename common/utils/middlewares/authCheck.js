const jwt = require('jsonwebtoken');
const appSecret  = require('../../../config').appSecret;
const { handleError } = require('./requestHandlers');
const { get } = require('../../../dbservice/user');


module.exports.isAuthenticated = async function isAuthenticated(
  req,
  res,
  next,
) {
  let token;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await jwt.verify(token, appSecret);
    req.userData = user;
  
    req.user = await get(user._id, '_id');
    // console.log('req issssssssssssssssssssssss',req.user)
    // console.log('requser',req.user.token)
    if (!req.user) throw 'Invalid token,No user exists';
    // console.log('token is ',token)
    if (req.user.token !== token) {
      throw 'Your login session has expired';
    }
    return next();

  } catch (err) {
    return handleError({ res, err, statusCode: 401 });
  }
  // req.userId =  req.userData;
};


