const fs = require('fs');
const path = require('path');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const db = require('../config').mongoUrl


const Productmodel = require('../model/productModel')
const Usermodel = require('../model/userModel')
const {
    save,
    fetchproduct,
    productupdate,
    } = require('../dbservice/product');

  const {
  handleResponse,
  handleError,
} = require('../common/utils/middlewares/requestHandlers');
const appSecret = require('../config').appSecret




module.exports.addproduct = async (req, res) => {
    try {
        let productDetails = {
          "product_name": req.body.product_name,
          "price": req.body.price,
          "userId":req.user._id,
        };
      product = await save(productDetails);
      handleResponse({ res,msg:'Product addded Successfully', data: product });
    } catch (err) {
      return handleError({ res, err });
    }
  };
  module.exports.getproduct = async (req,res,next) => {
    try {
      const products = await fetchproduct();
      handleResponse({
        res,
        statusCode: 200,
        msg: 'Your fetch data successully',
        data:products,
      });
      } catch (err) {
      handleError({ res, err });
    }
  };

  module.exports.updateproduct = async (req, res)  => {
    try {
      const productId = req.params.productId
      const products = await Productmodel.findById({_id:productId});
    if(products.userId.toString()!==req.userData._id){
      const error = new Error('no authorization user');
      res.send('no authorization user');
  }else{
    const data = await productupdate(req,productId)
        if(data){
          handleResponse({ res,msg:'ProductDetails update successfully', data: data });
        }else{
          throw 'not data found'
        }
  }
    }
    catch (err) {
      handleError({ res, err });
    }
}
module.exports.deleteproduct = async (req, res) => {
  try {
    const productId = req.params.productId
    const products = await Productmodel.findById({_id:productId});
    if(products.userId.toString()!==req.userData._id){
      const error = new Error('no authorization user');
      res.send('no authorization user');
  }else{
    const product = await Productmodel.findOneAndRemove({_id: productId})
    if(product){
      handleResponse({ res,msg:'ProductDetails Delete successfully', });
    }else{
      console.log('not delete')
    }
  }
    } catch (err) {
    handleError({ res, err });
  }
};




