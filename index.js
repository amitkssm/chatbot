
 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pincodeDirectory = require("india-pincode-lookup");
const zipcodes = require('zipcodes');

var validator = require('gstin-validator');


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


// app.get('/searchByString',async(req,res)=>{
//     console.log('..............aaaaaaaaaa............')
//     try {
//         let question = req.body.question
//        let result = await Question.find({ question: { $regex: question , $options: "i" }},{question:1});

//         // let result = await Question.find({ '$text': {'$search' : question } } ).toArray(function(err, docs) {
//         //     assert.equal(err, null);
//         //     console.log("Found the following records");
//         //     console.log(docs);
//         //     callback(docs);
//         //   }); 

//         res.status(200).send(result);
//         console.log(result);
    
//     } catch (error) {
//         res.status(400).send(error);
//     }
// })
 


app.post('/searchLocationByPincode',async(req,res)=>{
    console.log("searchLocationByPincode")
    let pincode = req.body.pincode ? req.body.pincode : ""
    console.log("pincode : ",pincode)
 try {
     let result =  await pincodeDirectory.lookup(pincode)
            console.log(result,"asasasasasas...........")
        if (result) {
            res.status(200).json({
                error: false,
                code: 200,
                message: "successfully  ",
                data: result
            })
        }
        else {
            res.status(401).json({
                error: true,
                code: 401,
                message: "something went wrong",
            })
        }
    
 } catch (error) {
    console.log(error)
    res.status(401).json({
        error: true,
        code: 401,
        message: "something went wrong",
    })
 }

})


app.post('/getDetailsByGSTIN',async(req,res)=>{
    console.log("getDetailsByGSTIN")
    let GSTnumber = req.body.GSTnumber ? req.body.GSTnumber : ""
    console.log(GSTnumber)

    try {
        let result =  await validator.getGSTINInfo(GSTnumber);
           if (result) {
               res.status(200).json({
                   error: false,
                   code: 200,
                   message: "Found Datails successfully  ",
                   data: result
               })
           }
           else {
               res.status(201).json({
                   error: true,
                   code: 201,
                   message: "something went wrong",
               })
           }
       
    } catch (error) {
        console.log(error)
       res.status(401).json({
           error: true,
           code: 401,
           message: "something went wrong",
           data : error
       })
    }
})








app.listen((2222), () => {
    console.log("app is running on port 2222")
})




