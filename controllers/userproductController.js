//**************************************************************************************** */
const { Product } = require("../Models/productModel");


const getMenData =async (req, res) => {
    const product = await Product.find({category:"men"});
    res.status(200).json(product);
  };

  const getWomenData =async (req, res) => {
    const product = await Product.find({category:"women"});
    res.status(200).json(product);
  };

  const getKidData =async (req, res) => {
    const product = await Product.find({category:"kid"});
    res.status(200).json(product);
  };

module.exports={
    getMenData,
    getWomenData,
    getKidData,

}