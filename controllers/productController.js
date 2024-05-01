const { Product } = require("../Models/productModel");
const cloudinary = require("../utils/cloudinary");

const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description, category, productType, sizes } =
      req.body;

    // Basic validation
    if (!name || !price || !quantity || !description) {
      res.status(400);
      throw new Error("Please fill all the required fields");
    }

    // Handle image upload to Cloudinary
    if (!req.file) {
      res.status(400);
      throw new Error("Image upload failed");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Stylesphere",
      resource_type: "image",
    });

    // Create product
    const product = await Product.create({
      name,
      price,
      quantity,
      description,
      category,
      productType,
      sizes,
      // image: req.file.filename, // Set the filename as the image property
      image: result.secure_url,
    });

    // Send response with the created product
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//Get all products
const getProducts = async (req, res) => {
  const products = await Product.find().sort("-createdAt");
  res.status(200).json(products);
};

//Get Total number of products available in database

const totalProducts = async (req, res) => {
  try {
    const product = await Product.countDocuments();
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching total count of products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get single products
const getProductsingle = async (req, res) => {
  const product = await Product.findById(req.params.id);
  //if product doesnot exists
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  //This one is to match product to the user
  // if (product.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error("User not autherized");
  // }
  res.status(200).json(product);
};

//Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(401).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Sucessfully Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateProduct = async (req, res) => {
//   // console.log(req.file);
//   try {
//     const { name, price, quantity, description, category, productType, sizes } =
//       req.body;

//     // Basic validation
//     if (!name || !price || !quantity || !description) {
//       res.status(400);
//       throw new Error("Please fill all the required fields");
//     }

//     let updatedData = {
//       name,
//       price,
//       quantity,
//       description,
//       category,
//       productType,
//       sizes,
//     };

//     let product = await Product.findById(req.params.id);

//     // Handle image update if a new image is uploaded
//     if (req.file) {
//       // Delete the old image from Cloudinary
//       await cloudinary.uploader.destroy(product.imageId);

//       // Upload the new image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Stylesphere",
//         resource_type: "image",
//       });

//       // Update the image URL and image ID in the product object
//       updatedData.image = result.secure_url;
//       updatedData.imageId = result.public_id;
//     }

//     // Update the product data in the database
//     product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
//       new: true,
//     });

//     // Send the updated product data in the response
//     res.status(200).json({ product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, category, productType, quantity, price, description, sizes } =
    req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Update the product fields
    product.name = name;
    product.category = category;
    product.productType = productType;
    product.quantity = quantity;
    product.price = price;
    product.description = description;
    product.sizes = sizes;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product.image = result.secure_url;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  totalProducts,
  getProductsingle,
  deleteProduct,
  updateProduct,
};
