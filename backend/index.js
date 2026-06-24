import express from "express";
import { ObjectId } from "mongodb";
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

   
});
// update task form
app.get("/task/:id",async(req,res)=>{
    const db= await connection();
    const collection =await db.collection(collectioName);
    const {id}=req.params;
    const result =await collection.findOne({_id:new ObjectId(id)});

    if(result){
        res.send({message:"task list fetched",success:true,result});
    }else{
        res.send({message :"error try after sometime", success:false,})
    };  
});

// update task:-
app.put("/update-task",async(req,res)=>{
    const db= await connection();
    const collection =await db.collection(collectioName);
    const{_id,...fields}=req.body;
    const update= {$set:fields};
    console.log(fields);
    const result = await collection.updateOne({_id:new ObjectId(_id)},update);
     if(result){
        res.send({message:"task data updated",success:true,result});
    }else{
        res.send({message :"error try after sometime", success:false,})
    };
    
});
// single delete
app.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    const db= await connection();
    const collection =await db.collection(collectioName);
    const result =await collection.deleteOne({_id:new ObjectId(id)});

    if(result){
        res.send({message:"task deleted",success:true,result});
    }else{
        res.send({message :"error try after sometime", success:false,})
    }

    res.send("working......");
});
// multiple delete
app.delete("/delete-multiple",async(req,res)=>{
    const db= await connection();
    const Ids = req.body;
    const deleteTaskId= Ids.map((item)=>new ObjectId(item));
    console.log(Ids)
    
     const collection =await db.collection(collectioName);
     const result =await collection.deleteMany({_id:{$in:deleteTaskId}});

    if(result){
        res.send({message:"task deleted",success:result});
    }else{
        res.send({message :"error try after sometime", success:false,})
    }

   
});


app.listen(PORT,()=>{
    console.log("server listen on port 8080");
})