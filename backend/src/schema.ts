import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    username : {
        type : String,
        required:true,
        unique:true
    },
    password:{
        type : String,
        required : true
    },
    publickey : {
        type : String
    },
    privatekey : {
        type : String
    }
})

const User = mongoose.model('User',Userschema);

export {
    User
}