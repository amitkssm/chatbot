const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/ChatBot",
{useNewUrlParser : true},(err,result)=>{
    if(err){
        console.log("not connected",err)
    }else{
    console.log("db Connected")
    }

});

