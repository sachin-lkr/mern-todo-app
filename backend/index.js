import express from "express";
const app= express();
const PORT =8080;

app.get("/",(req,res)=>{
    res.send("server is start")
});

app.listen(PORT,()=>{
    console.log("server listen on port 8080");
})