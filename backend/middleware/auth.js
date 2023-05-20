const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = catchAsyncErrors( async(req,res,next) => {

    const {token} = req.cookies;
    // console.log((token));
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    const DecodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(DecodedData.id);

    next();

})

module.exports = isAuthenticatedUser;