const fs = require('fs');
const path = require('path');
const { ObjectId } = require('mongoose').Types;
const ProductModel = require('../model/productModel');
const request = require('request');

module.exports.save = (data) => new ProductModel(data).save();

module.exports.get = async (idOrEmail, fieldName = '_id') => {
    // console.log('zzz',idOrEmail);
    // console.log('yyy',idOrEmail);
  const data = await Model.findOne({
    [fieldName]: `${idOrEmail}`,
  });
  return data;
};

module.exports.getUserData = async (userdata, fieldName) => {
  const data = await Model.find({
    [fieldName]: { $in: userdata },
  });
  return data;
};
module.exports.fetchproduct = async () => {
    try {
      const productData = await ProductModel.find({})
      console.log('userdata is',productData)
      return productData;
    } catch (error) {
      throw error;
    }
  };

  module.exports.productupdate = async(req, productId)=>{
    try{
      const product_name = req.body.product_name;
    const price  = req.body.price;
    const updatedata = await ProductModel.findByIdAndUpdate(
            {_id:productId},
            {
              $set: {
                product_name:product_name,
                price:price,
              },
            },
            {
             upsert: true
            },
          );
          return updatedata;
  
    }catch(err){
      throw err;
    }
  };


