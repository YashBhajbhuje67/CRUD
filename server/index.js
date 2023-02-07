const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.mongo,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB Connection Successful");
}).catch((err)=>{
    console.log(err.message);
})

const schema = new mongoose.Schema({
    roll_no: Number,
    f_name: String,
    l_name: String,
    email: String,
    age: Number,
    dob: Date,
    ph_no: Number,
},{ collection: "data"});

const dataModel = mongoose.model("Data", schema, "data");

app.get(`/search`,(req,res)=>{
    const roll = req.query.roll;
    dataModel.findOne({roll_no: roll}, function(err, doc){
        if (err){console.log(err);}
        if(doc){res.send(true);}
        else{res.send(false);}
    })
})

app.post('/create/',(req,res)=>{
    const value = req.body;
    dataModel.create(value)
    .then(()=> {
        res.send("Added Successfully");
    })
    .catch((er)=>{
        console.log(er);
    });
})

app.get('/readall',(req, res)=>{
    dataModel.find({})
    .then((docs)=> {
        docs.sort(function(a,b){return a.roll_no-b.roll_no;})
        var ans = []
        docs.forEach((doc)=>{
            var add = {roll_no:doc.roll_no, name:doc.f_name+" "+doc.l_name, age:doc.age, email:doc.email};
            ans.push(add);
        });
        res.send(ans);
    })
    .catch((er)=>{
        console.log(er);
    });
})

app.get('/readone', (req,res)=>{
    // console.log(req.query.roll);
    dataModel.findOne({roll_no: req.query.roll}, function(err, doc){
        if (err){console.log(err);}
        if(doc){
            res.send([doc]);}
        else{
            res.send([]);
        }
    })
})

app.delete(`/delete`,(req,res)=>{
    dataModel.deleteOne({roll_no: req.query.roll}, function(err,doc){
        if (err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`);
  })

