const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        trim: true,
        required: true
    },

    options : {
        type: Array,
        default: [{
            option:String,
            actionId:String
        }]
    },

    created_date: {
        type: Date,
        default: Date.now
    }

});

Question = mongoose.model("Questions", questionSchema);
module.exports = Question


const uploadExcel = new mongoose.Schema({
    question: {
        type: String,
       
    },

    options : {
        type: Array,
        // default: [{
        //     option:String,
        //     actionId:String
        // }]
    },

    created_date: {
        type: Date,
        default: Date.now
    }

});



Question = mongoose.model("Questions", questionSchema);
module.exports = Question