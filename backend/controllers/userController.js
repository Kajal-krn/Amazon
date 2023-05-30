const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register a user
exports.registerUser = catchAsyncError(async(req,res,next) => {
    
    const {name, email, password} = req.body;

    const myAvatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder : "avatars",
        width : 150,
        crop : "scale"
    })
    
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : myAvatar.public_id,
            url : myAvatar.secure_url
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

// login user
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

    const PasswordMatched = await user.comaprePassword(password);   // function is userModel file to compare password
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

// logout user
exports.logout = catchAsyncError(async(req,res,next) => {

    const options = {
        expires : new Date(Date.now()),
        httpOnly : true
    };

    res.cookie("token",null,options);

    res.status(200).json({
        success : true,
        message : "Logged Out"
    })
})

// forgot password
exports.forgotPassword  = catchAsyncError(async(req,res,next) => {
    
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    // get reset Password token
    const resetToken = await user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

    try{  // sending email
        await sendEmail({
            email : user.email,
            subject : `Amazon Password Recovery`,
            message
        })

        res.status(200).json({
            success : true,
            message : `Email sent to ${user.email} successfully`
        });

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave : false});

        return next(new ErrorHandler(error.message,500));
    }

})

//reset passwprd
exports.resetPassword = catchAsyncError(async(req,res,next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire : {$gt : Date.now()} });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
    
})

// get user detail
exports.getUserDetails = catchAsyncError(async(req,res,next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user
    })

})

// update User Password
exports.updatePassword = catchAsyncError(async(req,res,next) => {

    const user = await User.findById(req.user.id).select("+password");

    const PasswordMatched = await user.comaprePassword(req.body.oldPassword);   // function is userModel file to compare password

    if(!PasswordMatched){
        return next(new ErrorHandler("Old Password is incoorent",400));
    }

    if(req.body.newPassword != req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.newPassword;
    
    await user.save();

    sendToken(user,200,res);

})

// update user profile
exports.updateProfile = catchAsyncError( async(req,res,next) => {

    const {name,email} = req.body;

    const newUserData = {
        name,
        email
    }

    if(req.body.avatar !== "undefined"){
        const user = await User.findById(req.user.id);

        const imageId = user.avatar.public_id;
        
        await cloudinary.v2.uploader.destroy(imageId);

        const myAvatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder : "avatars",
            width : 150,
            crop : "scale"
        })

        newUserData.avatar = {
            public_id : myAvatar.public_id,
            url : myAvatar.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true
    });

})

// get all users -admin
exports.getAllUser = catchAsyncError(async(req,res,next) => {

    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    });

})

// get single user details -admin
exports.getSingleUser = catchAsyncError(async(req,res,next) => {

    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id : ${id}`,404));
    }

    res.status(200).json({
        success : true,
        user
    });

})

// update user role -admin
exports.updateUserRole = catchAsyncError( async(req,res,next) => {

    const {name,email,role} = req.body;

    const {id} = req.params;

    const newUserData = {
        name,
        email,
        role
    }

    const user = await User.findByIdAndUpdate(id, newUserData, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true
    });

})

// delete user -admin
exports.deleteUser = catchAsyncError( async(req,res,next) => {

    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id : ${id}`, 404));
    }

    // cloudinary avatar deleted
    const imageId = user.avatar.public_id;
        
    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
        success : true,
        message : "User deleted successfully"
    });

})
