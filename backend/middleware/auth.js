const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next) => {

    const {token} = req.cookies;
    // console.log((token));
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    const DecodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(DecodedData.id);

    next();

})

exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){ // checks if not a admin
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource`, 403));
        }

        next();  // id admin, just calls next()

    }
}