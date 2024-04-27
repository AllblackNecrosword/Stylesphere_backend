const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

const userRoute = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoute.js");
const userproductRoute = require("./Routes/userproductRoute.js");
const documentRoute = require("./Routes/documentRoute.js");

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Serve static files (images)
app.use("/images", express.static(path.join(__dirname, "productimg")));

//Routes Middlewares
app.use("/api", userRoute);
app.use("/api/products", productRoute);
app.use("/", userproductRoute);
app.use("/doc",documentRoute);

// Route to serve image data
app.get("/api/images/:filename", (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "productimg", filename);

  // Read the image file and send it as a response
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).send("Image not found");
    } else {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    }
  });
});

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected sucessfully");
    app.listen(PORT, () => {
      console.log(`Server Running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Fail to connect", error);
  });