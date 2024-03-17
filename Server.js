const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());



const userRoute = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoute.js");
const userproductRoute = require("./Routes/userproductRoute.js");

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes Middlewares
app.use("/api", userRoute);
app.use("/api/products", productRoute);
app.use("/", userproductRoute);

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
