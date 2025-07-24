const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewsSchema= new Schema({
    conment:{
        type:String,
    } ,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    create_at:{
        type:Date,
        default: Date.now()},

    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }    


})
 const Reviewmodel= mongoose.model('Reviewmodel',reviewsSchema)

module.exports= Reviewmodel;
