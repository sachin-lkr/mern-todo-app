import express from "express";
import cors from "cors";
import { collectioName, connection } from "./dbconfig.js";
const app= express();
const PORT =8080;

app.use(express.json());// access body data middleware
app.use(cors()); // cors issu fix

app.post("/add-task",async(req,res)=>{
    const db= await connection();
    const collection =await db.collection(collectioName);
    const result =await collection.insertOne(req.body);

    if(result){
        res.send({message:"new task added",success:true,result});
    }else{
        res.send({message :"task not add", success:false,})
    }

    res.send("working......");
});

app.get("/tasks",async(req,res)=>{
    const db= await connection();
    const collection =await db.collection(collectioName);
    const result =await collection.find().toArray();

    if(result){
        res.send({message:"task list fetched",success:true,result});
    }else{
        res.send({message :"error try after sometime", success:false,})
    }

    res.send("working......");
})



app.listen(PORT,()=>{
    console.log("server listen on port 8080");
})