const mongoose = require('mongoose');

let  {Schema} = mongoose
let profileCreate = new Schema({

    employeeId:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    bloodGroup:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        enum: ["male","female","custom"],
        required: true,
    },
    dob:{
        type: String,
        required: true,
    },

    ishold:{
        type: Boolean,
        default: false,
    },


})

module.exports = mongoose.model("profile",profileCreate);