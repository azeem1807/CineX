const Notification = require("../models/Notification");


exports.getNotifications = async(req,res)=>{

try{

const notifications =
await Notification
.find()
.sort({createdAt:-1});


res.json(notifications);


}
catch(error){

res.status(500)
.json({
message:error.message
});

}

};
exports.createNotification = async(req,res)=>{

try{

const notification = await Notification.create({

user:req.body.user,

title:req.body.title,

message:req.body.message,

type:req.body.type || "system"

});


res.status(201).json(notification);


}
catch(error){

res.status(500)
.json({
message:error.message
});

}

};