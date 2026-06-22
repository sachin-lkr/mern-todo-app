import React, { useEffect, useState } from 'react'
import "../style/addtask.css";
import {  useNavigate, useNavigation, useParams } from 'react-router-dom';

export const Update = () => {
    const navigate = useNavigate()
  const [taskData , setTaskData]=useState({
  title: "",
  description: "",
});

   useEffect(()=>{
    getTask(id);
   },[])
  const {id}=useParams()// find id 
  const getTask=async(id)=>{
    let task=await fetch("http://localhost:8080/task/"+id);
    let task1 = await task.json();
    if(task1.result){
        setTaskData(task1.result);
    }
  }

  const updateTask=async()=>{
    console.log("update btn click",taskData);
    let task = await fetch("http://localhost:8080/update-task",{method:"put", body:JSON.stringify(taskData),headers:{"Content-Type":"application/json"}});
    task= await task.json()
    if(task.success){
       navigate("/")
    }
  }

  return(
    <div className='container'>
        <div className="formContainer">
            <h1 className='heading'> Update Task</h1>
        <div className='formDiv'>
          <input value={taskData.title} onChange={(e)=>setTaskData({...taskData,title:e.target.value})} type="text" name='title' placeholder='Enter Task' />
          <textarea value={taskData.description} onChange={(e)=>setTaskData({...taskData,description:e.target.value})} rows={4} type='text' name='description' placeholder='Task Description'/>
          <button  className="btn" onClick={updateTask}>Update Task</button>
        </div>
        </div>
        
    </div>
  )
}
