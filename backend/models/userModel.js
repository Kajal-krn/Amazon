const mongoose = require("mongoose");
const validator = require("validator");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter your Name"],
        maxLength : [40,"Name cannot exceed 40 characters"],
        minLength : [4, "Name should have more than 4 characters"]
    },
    email : {
        type : String,
        required : [true, "Please enter your Email"],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid Email"]
    },
    password : {
        type : String,
        required: [true,"Please enter your Password"], 
        minLength : [8, "Password should be more than characters"],
        select : false  // for find query , password should not be returned
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : "user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){  //if password is not modified on update
        next();
    }
    this.password = await bycript.hash(this.password,10);
})

// Jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRY
    });
}

// compare password
userSchema.methods.comaprePassword = async function(passwordEntered){
    return await bycript.compare(passwordEntered, this.password);  // comapring password entered with hashed password
}

// generating password reset token
userSchema.methods.getResetPasswordToken = async function(){

    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");  //sha256 is an algo

    this.resetPasswordExpire = Date.now() + 15*(60*1000);

    return resetToken;

}

module.exports = mongoose.model("User", userSchema);