const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please add the product Name"],
        trim : true
    },
    description : {
        type : String,
        required : [true,"Please add the product description"]
    },
    price: {
        type : Number,
        required : [true,"Please add the product Price"],
        maxLength : [8,"Price cannot exceed 8 figures"]
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true,"Please add the product Category"]
    },
    Stock : {
        type : Number,
        required : [true, "Please add product Stock"],
        maxLength : [4, "Product stock cannot exceed 4 figures"],
        default : 1
    },
    numOfReviews : {
        type : Number,
        deafult : 0
    },
    reviews : [
        {   user : { // which user rated it
                type : mongoose.Schema.ObjectId,
                ref : "User",
                required : true
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    user : { // which admin created it
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);