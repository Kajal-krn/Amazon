const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//register a user
exports.registerUser = catchAsyncError(async(req,res,next) => {
    
    const {name, email, password} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            "public_id" : "Sample id",
            "url" : "ProfileUrl"
        }
    });

    // const token = user.getJWTToken(); // function in userModel file to get JSON WEB TOKEN 

    // res.status(201).json({
    //     success : true,
    //     token,
    //     user
    // })

    sendToken(user,201,res);  // function to send token in jwtToken file

})

exports.loginUser = catchAsyncError(async(req,res,next) => {

    const {email, password} = req.body;

    //checkin if user has email and password
    if(!email || !password){
        return next(new ErrorHandler("Please enter Email and Password",400));
    }

    const user = await User.findOne({email : email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const PasswordMatched = user.comaprePassword(password);   // function is userModel file to compare password

    if(!PasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    // const token = user.getJWTToken();  // function in userModel to get JSON WEB TOKEN

    // res.status(201).json({
    //     message : "success",
    //     token,
    //     user
    // })

    sendToken(user,200,res);   // function to send token in jwtToken file
 
})