const { CartAdd } = require("../Models/cartModel");
const { Product } = require("../Models/productModel");
const { FavAdd } = require("../Models/favModel");


  const addtoCart = async (req, res) => {
    try {
      const { userId, productId,size } = req.body;
      if (!userId || !productId) {
        return res.status(400).json({ message: "Please provide both userId and productId" });
      }

      // Quantity deduct
      let product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.quantity < 1) {
        return res.status(400).json({ message: "Product is out of stock" });
      }

      product.quantity -= 1;
      await product.save();

      let userCart = await CartAdd.findOne({ userId });

      if (userCart) {
        const existingProductIndex = userCart.products.findIndex(
          (product) => product.productId === productId
        );

        if (existingProductIndex === -1) {
          userCart.products.push({ productId, quantity: 1,size });
          userCart = await userCart.save();

          return res.status(200).json({
            message: "Product added to cart successfully",
            cart: userCart,
          });
        } else {
          return res.status(400).json({
            error: "Product already exists in the cart. Go to the shopping cart to increase the quantity.",
          });
        }
      } else {
        const data = await CartAdd.create({
          userId,
          products: [{ productId, quantity: 1 ,size}],
        });

        return res.status(201).json({ message: "Cart created with product added", cart: data });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };  


const showaddtocart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartData = await CartAdd.findOne({ userId });
    if (!cartData) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Extract product IDs from the cart
    const productIds = cartData.products.map((product) => product.productId);

    // Fetch product details from the Product collection based on the product IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Merge product details with quantities from the cart
    const cartItems = cartData.products.map((cartProduct) => {
      const productDetails = products.find((product) =>
        product._id.equals(cartProduct.productId)
      );
      return {
        _id: productDetails._id,
        name: productDetails.name,
        description: productDetails.description,
        price: productDetails.price,
        image: productDetails.image,
        quantity: cartProduct.quantity,
      };
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const addtofav = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      res.status(401).json({ message: "Please provide the details" });
    }

    const userFav = await FavAdd.findOne({ userId });

    if (userFav) {
      const productIndex = userFav.products.findIndex(
        (product) => product.productId === productId
      );

      if (productIndex === -1) {
        userFav.products.push({ productId });
      } else {
        userFav.products[productIndex].quantity += 1;
      }

      await userFav.save();
      res.status(200).json(userFav);
    } else {
      const data = await FavAdd.create({
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

const showFav = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favData = await FavAdd.findOne({ userId });
    if (!favData) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIds = favData.products.map((product) => product.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    const favItems = favData.products.map((favProduct) => {
      const productDetails = products.find((product) =>
        product._id.equals(favProduct.productId)
      );
      return {
        _id: productDetails._id,
        name: productDetails.name,
        image: productDetails.image,
      };
    });
    res.status(200).json(favItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updatecartQuantity = async (req, res) => {
  const { userId, cartData } = req.body;
  try {
    let userCart = await CartAdd.findOne({ userId });
    cartData.forEach((item) => {
      const product = userCart.products.find((p) => p.productId === item._id);
      if (product) {
        product.quantity = item.quantity;
      }
    });
    userCart = await userCart.save();
    res
      .status(200)
      .json({ message: "Cart data updated successfully", cartData: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart data" });
  }
};



const deleteCartData = async (req, res) => {

  const userId = req.params.userId;
  const productId = req.params.productId;

  // console.log("Received userId:", userId);
  // console.log("Received productId:", productId);

  try {
    // Find the user's cart data by userId
    let cart = await CartAdd.findOne({ userId });

    // If cart data doesn't exist, return an error
    if (!cart) {
      return res.status(404).json({ message: "Cart data not found" });
    }

    // Filter out the selected product from the cart data
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );

    // Save the updated cart data
    await cart.save();

    // Return success response
    return res
      .status(200)
      .json({ message: "Product deleted from cart successfully" });
  } catch (error) {
    console.error(error);
    // Return error response
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteWishlistdata=async(req,res)=>{
  // res.status(200).json({message:"Running Sucessfully"})
  const userId=req.params.userId;
  const productId = req.params.productId;

  try {
    const item = await FavAdd.findOne({userId});
    if(!item){
      return res.status(404).json({message:"Item not found"});
    }

    item.products = item.products.filter((product)=> product.productId !== productId);

    await item.save();

    return res.status(200).json({message:"Product deleted form wishlist"});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"});
    
  }

}
module.exports = {
  addtoCart,
  showaddtocart,
  addtofav,
  showFav,
  updatecartQuantity,
  deleteCartData,
  deleteWishlistdata,
};