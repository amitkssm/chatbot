
 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


require("./db/config");
const Question = require("./db/question");

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("home page");
})

app.post('/saveQuestion', async (req, res) => {
 
    const question = await new Question(req.body);
    question.save().then((question) => {
        res.status(201).send(question);
        console.log('save');
    }).catch((error) => {
        res.status(400).send(error);
    })
    
})
 

const ObjectId = require('mongoose').Types.ObjectId;
app.post('/getQuestionById', async (req, res) => {
    try {
        const actionId = req.body.actionId ? req.body.actionId : null
        const question = await Question.find({ _id: ObjectId(actionId)});
        console.log('find');
        if (question) {
            console.log(question.length);
            res.status(201).send(question);
        } 
    }
    catch (error) {
        res.status(400).send(err);
    }

});


app.get('/getQuestion',async(req,res)=>{

    //const questions = req.params.question ? req.params.question : "" 
    try {
        const result = await Question.find({} ,{_id : 0 , question : 1 });
        if (result) {
            console.log(result.length);
            res.status(201).send(result);
        } 
    }
    catch (error) {
        res.status(400).send(err);
    }

});


 

app.listen((2222), () => {
    console.log("app is running on port 2222")
})




