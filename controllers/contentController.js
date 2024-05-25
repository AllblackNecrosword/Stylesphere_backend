// const { BannerAdd } = require("../Models/contentModel");
// const cloudinary = require("../utils/cloudinary");

// const AddBanner = async (req, res) => {
//   const { text } = req.body;
//   const image = req.file;
//   try {
//     const result = await cloudinary.uploader.upload(image.path, {
//       folder: "Stylesphere",
//       resource_type: "image",
//     });
//     const banner = await BannerAdd.findOne();
//     banner.bannerText1 = text;
//     banner.image1 = result.secure_url;
//     // Save the banner document
//     await banner.save();
//     // Respond with success message
//     res.json({ message: "Banner content updated successfully" });
//   } catch (error) {
//     console.error("Error updating banner content:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = {
//   AddBanner,
// };
const { BannerAdd } = require("../Models/contentModel");
const cloudinary = require("../utils/cloudinary");

const AddBanner = async (req, res) => {
  const { text } = req.body;
  const image = req.file; // Get the file from the request

  if (!image) {
    return res.status(400).json({ error: "No image file uploaded" });
  }

  try {
    const result = await cloudinary.uploader.upload(image.path, {
      folder: "Stylesphere",
      resource_type: "image",
    });

    // Check if a banner already exists
    let banner = await BannerAdd.findOne();

    if (!banner) {
      // Create a new banner if it does not exist
      banner = new BannerAdd();
    }

    // Update the banner fields
    banner.bannerText1 = text;
    banner.image1 = result.secure_url;

    // Save the banner document
    await banner.save();

    // Respond with success message
    res.json({ message: "Banner content updated successfully" });
  } catch (error) {
    console.error("Error updating banner content:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  AddBanner,
};
