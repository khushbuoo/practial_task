const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;


const db = require('../config').mongoUrl

// Define our post schema
const productSchema = new Schema({
    product_name: {
        type: String,
        required:true
      },
      price: {
        type: Number,
        required:true
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      }
});
module.exports = mongoose.model('Product', productSchema);
