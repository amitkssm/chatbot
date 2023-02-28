
 
const express = require("express");
const mongoose = require("mongoose");
const { Parser } = require("json2csv")
const {excelJS } = require('exceljs')
const fs = require('fs')
const {parse, stringify} = require('flatted');

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
        res.status(201).send(question);2
        console.log('save');
    }).catch((error) => {
        res.status(400).send(error);
    })
    
})
 

//const ObjectId = require('mongoose').Types.ObjectId;
app.post('/getQuestionById', async (req, res) => {
    const actionId = req.body.action_id ? req.body.action_id : null
    const question = await Question.find({ action_id: actionId} );
    console.log('find');
    try {
        if (question) {
            console.log(question.length);
            res.status(201).send(question);
        } 
    }
    catch (error) {
        res.status(400).send(err);
    }

});
  

app.get('/QuestionCsv' , async (req,res)=>{
    try {
        console.log('aaa')
        const question = await new excelJS.Question();
        const worksheet =  question.addworksheet("My Questions")
        console.log('vvv')

         worksheet.columns = [

            {header : "S No." , key : "s_no"},
            {header : "Id" , key : "_id"},
            {header : "Question" , key : "question"},
            {header : "ActionID" , key : "action_id"}

        ]

        let counter = 1;
        const questionData = await Question.find({})
        questionData.forEach((Question)=>{
            Question.s_no = counter;
            worksheet.addRow(Question);
            counter++;
        });
        worksheet.getRow(1).eachCell((cell)=>{
            cell.font = {bold : true};
        })

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocuments.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",`attachment; filename=user.xlsx`
        );

        return workbook.xlsx.write(res).then(()=>{
            res.status(200)
        })

    } catch (error) {

        res.status(400).send(error)
        
    }
})



app.get('/get-csv',function(req,res){
    const json2csvParser = new Parser();
    const questionData = Question.find({})
    const csv = json2csvParser.parse(questionData)

console.log(questionData)
})






app.get('/getQuestion',async(req,res)=>{

    //const questions = req.params.question ? req.params.question : "" 
    try {
        const result = await Question.find({ } ,{_id : 0 , question : 1 });
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




