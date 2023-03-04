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
        default: []
    },

    created_date: {
        type: Date,
        default: Date.now
    }

});

Question = mongoose.model("Questions", questionSchema);
module.exports = Question