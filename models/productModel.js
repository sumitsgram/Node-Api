// In order to creat a model we need to access mongoose
const mongoose = require('mongoose')
// On order to make schema we need mongoose
const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter a product nama"]
        },
        quantity: {
            type:Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true,
        },
    },
    {
        timestamp:true
    }
)
// this model is used to save data in mongoDB;
const Product = mongoose.model('Product', productSchema);
module.exports = Product;