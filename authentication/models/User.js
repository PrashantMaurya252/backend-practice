const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        requird:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        requird:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        requird:true,
        
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

},{timestamps:true})

module.exports = mongoose.model('User',UserSchema)

