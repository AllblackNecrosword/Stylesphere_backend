const Product = require("../Models/productModel");


const createProduct = (async(req,res)=>{

const {name,sku,category,quantity,price,description}=req.body

//validation 
if(!name || !category || !quantity || !price || !description){
res.status(400)
throw new Error("Please fillin all fields");
}
//Manage image upload

//create product in db
const product = await Product.create({
    user:req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description

})
res.status(201).json(product)
})


module.exports={
    createProduct,
}