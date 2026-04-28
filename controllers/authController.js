// const model = requier(mongoose)
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

let registrationController = async (req, res) => {
    const { username, email, password } = req.body
    //todo for next --> validation
    // check existing user

    try {
        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hash = bcrypt.hashSync(password, 10);
        console.log(hash);

        // bcrypt.hash(password, 10, function (err, hash) {
        //     if (err) {
        //         console.log(err)
        //         return res.status(500).json({
        //             success: false,
        //             message: "server error"
        //         });
        //     }
        //     console.log(hash);

        // });
        let createUser = new User({
            username: username,
            email: email,
            password: hash,
        });

        createUser.save();

        console.log("hit");
        res.send({
            id: createUser._id,
            username: createUser.username,
            email: createUser.email,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "server error"
        });
    }




    // let createUser = new User({
    //     username: username,
    //     email: email,
    //     password: password
    // });

    // createUser.save();

    // console.log("hit");
    // res.send({
    //     id: createUser._id,
    //     username: createUser.username,
    //     email: createUser.email,
    // });


}

let loginController = async (req, res) => {
    const { email, password } = req.body

    // email diya jodi registration na kora thake tahoke login hobe nah
    let existingUser = await User.findOne({ email: email });
    if (existingUser.islogin) {
        return res.status(400).json({
            success: false,
            message: "please logout from anther device",
        });
    }
    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email not found",
        });
    }

    // pass jodi match na kore tahole login hobe nah
    let pass = bcrypt.compareSync(password, existingUser.password);
    if (pass) {
        existingUser.islogin = true
        existingUser.save();
        return res.status(200).json({
            success: true,
            message: "login successfull",
        })
    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid Credential",
        })
    }
}

let logoutController = async (req, res) =>{
    let {id} = req.body
    let existingUser = await User.findOne({_id:id});
    existingUser.islogin = false
    existingUser.save();
    res.status(200).json({
        success: true,
        message: "logout done",
    })
}

module.exports = { registrationController, loginController,logoutController }