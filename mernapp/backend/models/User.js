const mongoose=require('mongoose')
const { Schema }= mongoose;

const UserSchema= new Schema({
    name:{
        type:String, required:true
    },
    email:{
        type:String, required:true,unique: true
    },
    phone:{
        type:String, requird:true
    },
    pass:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    Client_type:{type:String},

    image: { type: String },
     // New field to store image URL
    date:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
    

});
module.exports= mongoose.model('user',UserSchema)