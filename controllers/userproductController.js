//**************************************************************************************** */
const { Product } = require("../Models/productModel");
// const { dataModel } = require("../Models/dataModel");
const { Reviews } = require("../Models/reviewModel");
const Signupdata = require("../Models/signupModel");

const getMenData = async (req, res) => {
  const product = await Product.find({ category: "men" });
  res.status(200).json(product);
};

const getWomenData = async (req, res) => {
  const product = await Product.find({ category: "women" });
  res.status(200).json(product);
};

const getKidData = async (req, res) => {
  const product = await Product.find({ category: "kids" });
  res.status(200).json(product);
};

//Search Product
const searchProduct = async (req, res) => {
  try {
    const { searchData } = req.searchData;
    const regex = new RegExp(searchData, "i"); //Case-insensitative

    const products = await Product.find({ name: regex });
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Store review in the db
const createReview = async (req, res) => {
  try {
    const { productId, username, comment, rating } = req.body;
    const review = await Reviews.create({
      productId,
      username,
      comment,
      rating,
    });
    res.status(201).json({ review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get reviews according to the id
const getReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Reviews.find({ productId });
    if (!reviews || reviews.length === 0) {
      res.status(404).json({ error: "No reviews found for this product" });
      return;
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getallUser = async (req, res) => {
  try {
    // const users = await Signupdata.find({});
    const users = await Signupdata.find({}).select("name phoneno email  isAdmin");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting users" });
  }
};

module.exports = {
  getMenData,
  getWomenData,
  getKidData,
  searchProduct,
  createReview,
  getReview,
  getallUser,
};
