
require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conn");
const path = require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
const guest = require("./models/schema")
app.use(express.json());
//it is use to tell the express that we are acquiring html data
app.use(express.urlencoded({extended:false}));

const bcrypt = require("bcryptjs");

// const securepassword = async (password)=>{
//     //this convert normal password to hash value
// const hashvalue = await bcrypt.hash(password,11);
// console.log(hashvalue);

// //now from hash value to real value comparison
// const ans =  await bcrypt.compare(password,hashvalue);
// console.log(ans);
// }

// securepassword("abcd");

console.log(process.env.MYKEY);


app.get("/",(req,res)=>{
res.render("index");
})
app.get("/index",(req,res)=>{
    res.render("index");
    })
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/signin",(req,res)=>{
    res.render("sigin");
})
app.post("/signin",async (req,res)=>{
    const email = req.body.email;

    const password = req.body.password;
    
    const user  = await guest.findOne({ email: email });
    const check = await bcrypt.compare(password,user.password);

    const token = await user.generateToken();
    console.log(token);
    if( check || user.password === password)
        {
        res.send("successful validation");
    }
    else
    {
        res.send("invalid details");
    }

})



app.post("/login", async(req,res)=>{
 try {
//one way

    // const pass = req.body.password;
    // const ans = await bcrypt.hash(pass,10);

    // const s = new guest({
    //     name:req.body.name,
       
    //     password:ans,
    //     confirmpass:req.body.confirmpass,
    //     email:req.body.email,
    // });

//another way
const s = new guest(req.body);
const token = await s.generateToken();
    const g = await s.save();
   
    console.log(token);
    res.send("succesfully registered");

 }
 catch (error) {
    console.log(error);
 }
})





//app.render




app.listen(port,()=>{
    console.log("server is running");
})

