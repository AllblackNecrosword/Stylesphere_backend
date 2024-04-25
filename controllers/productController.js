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

    // Handle image upload
    // if (!req.file || !req.file.filename) {
    //   res.status(400);
    //   throw new Error("Image upload failed");
    // }

    // Handle image upload to Cloudinary
  
    if (!req.file) {
      res.status(400);
      throw new Error("Image upload failed");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "FYP project",
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
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update a product

// const updateProduct = async (req, res) => {
//   const { name, category, quantity, price, description } = req.body;
//   const { id } = req.params;
//   const product = await Product.findById(id);

//   if (!product) {
//     res.status(404).json({ message: "Product not found" });
//     return;
//   }

//   //This one is to match product to the user
//   if (product.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User not autherized");
//   }

//   //handle file upload
//   let fileData = {};
//   if (req.file) {
//     // save in cloudinary
//     let uploadImage;
//     try {
//       uploadImage = await cloudinary.uploader.upload(req.file.path, {
//         folder: "Product img",
//         resource_type: "image",
//       });
//     } catch (error) {
//       res.status(500);
//       throw new Error("Image could not be uploaded");
//     }
//     fileData = {
//       fileName: req.file.originalname,
//       filePath: uploadImage.secure_url,
//       fileType: req.file.mimetype,
//       fileSize: fileSizeFormatter(req.file.size, 2),
//     };
//   }
//   // update products
//   const updatedProduct = await Product.findByIdAndUpdate(
//     { _id: id },
//     {
//       name,
//       category,
//       quantity,
//       price,
//       description,
//       image: Object.keys(fileData).length === 0 ? product.image : fileData,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(202).json(updatedProduct);
// };

module.exports = {
  createProduct,
  getProducts,
  totalProducts,
  getProductsingle,
  deleteProduct,
  // updateProduct,
};
