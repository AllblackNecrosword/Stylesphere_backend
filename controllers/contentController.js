const { BannerAdd } = require("../Models/contentModel");
const cloudinary = require("../utils/cloudinary");

const AddBanner = async (req, res) => {
  const { text1, text2, comment1, comment2 } = req.body;
  const image1 = req.files.file1[0];
  const image2 = req.files.file2[0];

  if (!image1 || !image2) {
    return res.status(400).json({ error: "Both image files must be uploaded" });
  }

  try {
    const result1 = await cloudinary.uploader.upload(image1.path, {
      folder: "Stylesphere",
      resource_type: "image",
    });

    const result2 = await cloudinary.uploader.upload(image2.path, {
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
    banner.bannerText1 = text1;
    banner.image1 = result1.secure_url;
    banner.bannerText2 = text2;
    banner.image2 = result2.secure_url;
    banner.bannercomment1 = comment1;
    banner.bannercomment2 = comment2;

    // Save the banner document
    await banner.save();

    // Respond with success message
    res.json({ message: "Banner content updated successfully" });
  } catch (error) {
    console.error("Error updating banner content:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getHerobanner = async (req, res) => {
  try {
    const data = await BannerAdd.findOne();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AddBanner,
  getHerobanner,
};
