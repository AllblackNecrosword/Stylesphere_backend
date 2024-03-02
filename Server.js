const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
const userRoute = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoute.js");
const path=require("path");
//

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use("uploads",express.static(path.join(__dirname,"uploads")))

//Routes Middlewares
app.use("/api",userRoute);
app.use("/api/products",productRoute);


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
  


