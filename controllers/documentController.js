const { CartAdd } = require("../Models/cartModel");
const {Product} =require("../Models/productModel");
// const addtoCart = async (req, res) => {
//   console.log("Request body:", req.body);
//   try {
//     const { userId, productId } = req.body;
//     if (!userId || !productId) {
//       res
//         .status(400)
//         .json({ message: "Please provide both userId and productId" });
//       return;
//     }
//     const data = await CartAdd.create({
//       userId,
//       productId,
//     });
//     res.status(201).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const addtoCart = async (req, res) => {
  // console.log("Request body:", req.body);
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      res
        .status(400)
        .json({ message: "Please provide both userId and productId" });
      return;
    }

    // Find the user's cart
    const userCart = await CartAdd.findOne({ userId });

    if (userCart) {
      // If the user's cart exists, push the new product into the products array
      const productIndex = userCart.products.findIndex(
        (product) => product.productId === productId
      );

      if (productIndex === -1) {
        // If the product doesn't exist in the user's cart, push it as a new item
        userCart.products.push({ productId });
      } else {
        // If the product already exists in the user's cart, increment the quantity
        userCart.products[productIndex].quantity += 1;
      }

      await userCart.save();
      res.status(200).json(userCart);
    } else {
      // If the user's cart doesn't exist, create a new one
      const data = await CartAdd.create({
        userId,
        products: [{ productId }],
      });
      res.status(201).json(data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// const showaddtocart = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const cartData = await CartAdd.findOne({ userId }).populate('products.productId');
//     res.status(200).json(cartData);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const showaddtocart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartData = await CartAdd.findOne({ userId });
    if (!cartData) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Extract product IDs from the cart
    const productIds = cartData.products.map(product => product.productId);

    // Fetch product details from the Product collection based on the product IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Merge product details with quantities from the cart
    const cartItems = cartData.products.map(cartProduct => {
      const productDetails = products.find(product => product._id.equals(cartProduct.productId));
      return {
        _id: productDetails._id,
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        image: productDetails.image,
        quantity: cartProduct.quantity
      };
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  addtoCart,
  showaddtocart,
};
