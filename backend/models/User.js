///models/User.js
import mongoose from "mongoose"

const UserScheme = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const UserModel =mongoose.model("User",UserScheme)

export {UserModel as User}