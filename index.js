require('node:dns/promises').setServers(["1.1.1.1", "8.8.8.8"])


require('dotenv').config()
const express = require("express");
const dbConnection = require('./config/dbConnection');
const { registrationController, loginController, logoutController } = require('./controllers/authController');
const { profileCreateController, getProfileShow, getSingleProfile, updateProfile, holdProfile } = require('./controllers/profileCreateController');
const app = express();

app.use(express.json());
dbConnection();

app.post('/register', registrationController);
app.post('/login', loginController);
app.post('/logout', logoutController);

//profile create
app.post('/profileCreate', profileCreateController);
app.get('/getprofile', getProfileShow);
app.get('/getprofile/:id', getSingleProfile);

//profile update
app.post('/update/:id',updateProfile);
//hold profile
app.post('/hold',holdProfile);


console.log(process.env.PORT);
const port = process.env.PORT || 8000;

app.listen(8000, () => {
    console.log(`server is running on port ${port}`);
});
