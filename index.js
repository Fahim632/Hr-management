require('node:dns/promises').setServers(["1.1.1.1","8.8.8.8"])


require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("database conneted");
}) 

app.get('/', (req,res)=>{
    res.send("hllow");
}); 

console.log(process.env.PORT);
const port = process.env.PORT || 8000;

app.listen(8000,()=>{
    console.log(`server is running on port ${port}`);
});
