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
    const users = await Signupdata.find({}).select(
      "name phoneno email  isAdmin"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting users" });
  }
};

const getsingleMenProduct = async (req, res) => {
  const catgeory = req.params.category;
  try {
    const product = await Product.find({
      category: "men",
      productType: catgeory,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
};

const getsingleWomenProduct = async (req, res) => {
  // res.status(200).json({message:"I am running"});
  const product = await Product.find({
    category: "women",
    productType: "clothes",
  });
  res.status(200).json(product);
};
const getsingleKidProduct = async (req, res) => {
  // res.status(200).json({message:"I am running"});
  const product = await Product.find({
    category: "kids",
    productType: "clothes",
  });
  res.status(200).json(product);
};

const getlatestMenData = async (req, res) => {
  try {
    // Find the latest 4 products of the specified category
    const latestProducts = await Product.find({ category: "men" })
      .sort({ createdAt: -1 })
      .limit(4);
    res.json(latestProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
};
const getlatestWomenData = async (req, res) => {
  try {
    // Find the latest 4 products of the specified category
    const latestProducts = await Product.find({ category: "women" })
      .sort({ createdAt: -1 })
      .limit(4);
    res.json(latestProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
};
const getlatestKidsData = async (req, res) => {
  try {
    // Find the latest 4 products of the specified category
    const latestProducts = await Product.find({ category: "kids" })
      .sort({ createdAt: -1 })
      .limit(4);
    res.json(latestProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch latest products" });
  }
};

// const Apple=(req,res)=>{
// res.status(200).json({message:"I am Apple"})
// }

const handleUserMangement = async (req, res) => {
  const userId = req.params.userid;
  const { isAdmin } = req.body;

  try {
    const user = await Signupdata.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    user.isAdmin = isAdmin;
    await user.save();

    res.send({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error updating user role" });
  }
  // res.status(200).json({message:"Working"});
};

module.exports = {
  getMenData,
  getWomenData,
  getKidData,
  searchProduct,
  createReview,
  getReview,
  getallUser,
  getsingleMenProduct,
  getsingleWomenProduct,
  getsingleKidProduct,
  getlatestMenData,
  getlatestWomenData,
  getlatestKidsData,
  handleUserMangement
};
