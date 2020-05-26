const express = require('express');

const router = express.Router();

const {login,addproduct,getproduct,updateproduct,deleteproduct} = require('../controller/productController');

// User
router.post('/addProduct', addproduct);
router.get('/getProduct/', getproduct);
router.put('/updateproduct/:productId',updateproduct);
router.delete('/deleteproduct/:productId',deleteproduct);




module.exports = router;

