// To connect Node with mongoDB;
// Also to start a server on the given port;

const express = require('express');
const app = express();
// So that our application can access json dataType;
app.use(express.json())
// import model from models and schema; 
const Product = require('./models/productModel')
const mongoose = require("mongoose");

mongoose.connect('mongodb://0.0.0.0:27017/Node-API')
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(8080, ()=> {
    console.log(`Node Api is running on port 8080`)
})
})
  .catch((error)=> console.log(error))

// routing to access server or given port i.e 8080;
app.get('/',(req,res)=> {
res.send("Hello Node API")
})

app.get('/blog',(req,res)=> {
    res.send("Hello Blog, My names is Sumit")
})

// api to get all data from database
app.get('/products',async (req,res)=> {
try {
const products = await Product.find({});
res.status(200).json(products);
  } 
catch (error) {
res.status(500).json({message:error.message})
  }
})

// api to find data from datbase by id
app.get('/product/:id',async (req,res)=> {
  try {
  const {id} = req.params;
  const product = await Product.findById(id);
  res.status(200).json(product);
    } 
  catch (error) {
  res.status(500).json({message:error.message})
    }
  })

// to update a data in database
app.put('/products/:id',async (req,res)=> {
  try {
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id,req.body);
  // we cannot find the product
  if(!product){
    return res.status(404).json({message:`cannot find with ID ${id}`})
  }
  res.status(200).json(product);
    } 
  catch (error) {
  res.status(500).json({message:error.message})
    }
  })

// to delete
app.put('/products/:id',async (req,res)=> {
  try {
  const {id} = req.params;
  const product = await Product.findByIdAndDelete(id);
// we cannot find the product
  if(!product){
    return res.status(404).json({message:`cannot find with ID ${id}`})
  }
  res.status(200).json(product);
    } 
  catch (error) {
  res.status(500).json({message:error.message})
    }
  })


// to save data in the database we use post method
// either data is to be tested with postman or sent by frontend;
app.post("/product", async(req,res) => {
//   console.log(req.body)
//   res.send(req.body)
try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
} 
catch (error) {
    console.log(error.message);
    res.status(500).json({message:error.message})
}
})


