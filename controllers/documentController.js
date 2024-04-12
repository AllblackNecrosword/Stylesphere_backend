const { CartAdd } = require("../Models/cartModel");


const addtoCart = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      res
        .status(400)
        .json({ message: "Please provide both userId and productId" });
      return;
    }
    const data = await CartAdd.create({
      userId,
      productId,
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addtoCart,
};
