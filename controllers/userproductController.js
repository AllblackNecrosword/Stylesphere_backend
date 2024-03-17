//**************************************************************************************** */
const { Product } = require("../Models/productModel");
const {dataModel}=require("../Models/dataModel");

const getMenData =async (req, res) => {
    const product = await Product.find({category:"men"});
    res.status(200).json(product);
  };

  const getWomenData =async (req, res) => {
    const product = await Product.find({category:"women"});
    res.status(200).json(product);
  };

  const getKidData =async (req, res) => {
    const product = await Product.find({category:"kids"});
    res.status(200).json(product);
  };

  const tryOut = async (req, res) => {
    try {
      const result = await dataModel.create({ image: req.file.filename });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  };
  


module.exports={
    getMenData,
    getWomenData,
    getKidData,
    tryOut

}