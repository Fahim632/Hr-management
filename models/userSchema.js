const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "username is required"],
    },
    email:{
        type: String,
        required: [true, " email is required"],
        trim : true,
        lowerCase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password:{
        type: String,
        required: [true,"password is required"],
        min: [5,"too low"],
        max: [8,"too high"],
        // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Please enter a strong password'],
    },
    photo:{
        type: String,
    },

    nid:{
        type: Number,
        min: [10,"too low"],
        max: [17,"too high"],

    },

    address:{
        type: String,
    },
    
    islogin:{
        type: Boolean,
        default: false,
    },

    
})

module.exports = mongoose.model("User", userSchema);