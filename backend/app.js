const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const ErrorMiddleware = require("./middleware/error");
const dotenv = require("dotenv");
const path = require("path")

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

// middleware for error
app.use(ErrorMiddleware);


module.exports = app;