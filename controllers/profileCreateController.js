const profile = require("../models/profileCreateModel");

let profileCreateController = (req, res) => {
    const { name, email, phoneNumber, bloodGroup, gender, dob } = req.body;
    // id create kora
    let fastThreeLetter = name.slice(0, 3);
    let randomNumber = Date.now().toString();
    let emid = fastThreeLetter + randomNumber.slice(-3);
    // console.log(randomNumber.slice(-3));

    let profileCreate = new profile({
        employeeId: emid,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        bloodGroup: bloodGroup,
        gender: gender,
        dob: dob,
    })
    profileCreate.save();

    res.status(201).json({
        status: true,
        message: "profile created"
    })
    console.log('hit');

}

let getProfileShow = async (req, res) => {
    let data = await profile.find({})
    res.status(200).json({
        status: true,
        message: "all profile",
        data: data,
    })
}

let getSingleProfile = async (req, res) => {
    const { id } = req.params
    let data = await profile.findOne({ _id: id })
    res.status(200).json({
        status: true,
        message: `${data.name} profile`,
        data: data,
    })

    console.log(`show ${data.name} profile`);
}

let updateProfile = async (req, res) => {
    const { id } = req.params;
    let data = await profile.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json({
        status: true,
        message: "Update Successful",
        data: data,
    })
}

let holdProfile = async (req, res)=>{
    const {id} = req.body;
    let existingUser = await profile.findOne({_id:id})
    existingUser.ishold = true;
    existingUser.save();
    res.status(200).json({
        status: true,
        message: "Hold Successful",
    })
}

let getHoldProfile = async (req,res)=>{
    let data = await profile.find({ishold: {$eq: true}})
    res.send(data)
}

let deleteProfile = async (req,res)=>{
    let {id} = req.params;
    let data = await profile.findByIdAndDelete({_id:id})

}

module.exports = { profileCreateController, getProfileShow, getSingleProfile, updateProfile, holdProfile,getHoldProfile,deleteProfile }