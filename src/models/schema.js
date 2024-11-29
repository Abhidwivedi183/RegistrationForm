const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const scm = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
    ,
    password:{
        type:String,
        require:true,
      
    },

    confirmpass:{
type:String,
require:true,
    }
    ,
    email:{
        type:String,
        require:true,
        unique:true,
    }
    ,tokens:[{
        token:{
            type:String,
        }
    }]
 
})

scm.methods.generateToken = async function() {
    try {
        const token = jwt.sign({_id:this._id.toString()},"steve smith");
        console.log(token);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

scm.pre("save",async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    console.log(this.password);
    }
    next();
})

const collec = new mongoose.model("guest",scm);
module.exports = collec;