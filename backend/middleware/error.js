const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    // wrong mongodb Id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // mongoose duplicate key
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }

    // wrong Jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Please try again`;
        err = new ErrorHandler(message,400);
    }

    // Jwt expire error
    if(err.name === "TokenExpiredError"){
        const message = "Json Web Token expired, Please try again";
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}