const fs = require('fs');
const path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const db = require('../config').mongoUrl


const Usermodel = require('../model/userModel')
const {
    save,
    get,
    getUsersMainProfileData,
    } = require('../dbservice/user');

  const {
  handleResponse,
  handleError,
} = require('../common/utils/middlewares/requestHandlers');
const appSecret = require('../config').appSecret

const generateJwtToken = async (user) => {
  const token = await jwt.sign(user._doc || user, appSecret, {expiresIn: "1h"});
  return token;
};

 module.exports.login = async ({
    body: {
      email,
      password,
    },
  },
    res,
  ) => {
    try {
        if (!email || !password) {
          return handleResponse({ res,statusCode:404,msg:'Required Params Missing' });
        }
        const user = await get(email, 'email');
        // console.log('hyy',user)
      if (!user) {
        return handleResponse({ res,statusCode:403,msg:'Email Is Incorrect' });
      }
        if (!(await user.verifyPassword(password))) {
          return handleResponse({ res,statusCode:403,msg:' Password Is Incorrect' });
        }
      delete user._doc.password;
      const withoutToken = { ...user._doc };
      delete withoutToken.token
      const newToken = await generateJwtToken(withoutToken);
      const updatedata =  await Usermodel.findByIdAndUpdate(
        {
          _id:user._id
        },
        {
          $set:
          {
            token:newToken,
          }},
        {
          upsert: true
        })
      const updatedUserData = await getUsersMainProfileData(user._id);
      handleResponse({ res,msg:'Login Successfully',data: updatedUserData });
    } catch (err) {
      handleError({ res, err });
    }
  };
  