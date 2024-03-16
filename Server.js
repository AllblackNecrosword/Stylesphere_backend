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
const userproductRoute = require("./Routes/userproductRoute.js"); 
const path = require("path");
const bodyParser = require("body-parser");
//Middlewares
app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes Middlewares
app.use("/api", userRoute);
app.use("/api/products", productRoute);
app.use("/", userproductRoute);


//handle payloadtoo large 
// Increase the limit to handle larger payloads
// Your routes and other middleware here...

// Error handling middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,parameterLimit:100000,limit:"500mb" }));

// Your routes and other middleware here...

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send({ error: 'Invalid JSON payload' });
  } else {
    next();
  }
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
