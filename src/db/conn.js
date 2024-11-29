const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/team").then(()=>{console.log("connected with mongo")}).catch((e)=>{console.log(e)});