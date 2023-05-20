const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");

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

    const token = user.getJWTToken();

    res.status(201).json({
        success : true,
        token,
        user
    })

})
