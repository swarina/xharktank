const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/xharktank", {
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err) console.log(err)
    else console.log("Successfully connected.")
})

app.listen(8081, () => {
    console.log("On Port 8081")
})