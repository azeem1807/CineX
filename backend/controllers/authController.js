const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// =======================
// REGISTER USER
// =======================

const registerUser = async (req,res)=>{

try{

const {name,email,password}=req.body;


if(!name || !email || !password){

return res.status(400).json({
success:false,
message:"All fields are required"
});

}


const existingUser = await User.findOne({
email:email.toLowerCase()
});


if(existingUser){

return res.status(400).json({
success:false,
message:"User already exists"
});

}


const hashedPassword = await bcrypt.hash(password,10);


const user = await User.create({

name,

email:email.toLowerCase(),

password:hashedPassword

});


res.status(201).json({

success:true,

message:"User registered successfully",

user:{
id:user._id,
name:user.name,
email:user.email
}

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// =======================
// LOGIN USER
// =======================

const loginUser = async(req,res)=>{


try{


const {email,password}=req.body;


if(!email || !password){

return res.status(400).json({

success:false,

message:"All fields are required"

});

}



const user = await User.findOne({

email:email.toLowerCase()

});



if(!user){

return res.status(400).json({

success:false,

message:"Invalid credentials"

});

}



const isMatch = await bcrypt.compare(
password,
user.password
);



if(!isMatch){

return res.status(400).json({

success:false,

message:"Invalid credentials"

});

}




const token = jwt.sign(

{
id:user._id,
email:user.email
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);



res.json({

success:true,

token,

user:{

id:user._id,

name:user.name,

email:user.email

}

});


}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};




// =======================
// FORGOT PASSWORD
// =======================

const forgotPassword = async(req,res)=>{


try{


const {email}=req.body;



const user = await User.findOne({

email:email.toLowerCase()

});



if(!user){

return res.status(404).json({

success:false,

message:"User not found"

});

}




const resetToken = crypto.randomBytes(32).toString("hex");


// save token

user.resetPasswordToken = crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");



user.resetPasswordExpire =
Date.now()+15*60*1000;



await user.save();




// reset link

const resetURL =
`http://localhost:5173/reset-password/${resetToken}`;




// mail setup

const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});




await transporter.sendMail({

from:process.env.EMAIL_USER,

to:user.email,

subject:"CineX Password Reset",

html:`

<h2>CineX Password Reset</h2>

<p>Click below to reset your password</p>

<a href="${resetURL}">
Reset Password
</a>

<p>This link expires in 15 minutes.</p>

`

});





res.json({

success:true,

message:"Password reset link sent to email"

});




}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};





// =======================
// RESET PASSWORD
// =======================


const resetPassword = async(req,res)=>{


try{


const {token}=req.params;

const {password}=req.body;



if(!password || password.length<6){

return res.status(400).json({

success:false,

message:"Password must contain minimum 6 characters"

});

}




const hashedToken = crypto
.createHash("sha256")
.update(token)
.digest("hex");



const user = await User.findOne({

resetPasswordToken:hashedToken,

resetPasswordExpire:{
$gt:Date.now()
}

});




if(!user){

return res.status(400).json({

success:false,

message:"Invalid or expired token"

});

}




user.password =
await bcrypt.hash(password,10);



user.resetPasswordToken=undefined;

user.resetPasswordExpire=undefined;



await user.save();




res.json({

success:true,

message:"Password reset successful"

});



}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};




module.exports={

registerUser,

loginUser,

forgotPassword,

resetPassword

};