import React, { useState } from 'react'
import "../style/addtask.css";
import { useNavigate } from 'react-router-dom';
export const AddTask = () => {
  const [taskData , setTaskData]=useState();
  const navigate =useNavigate()
const handelAddTask= async()=>{
  console.log(taskData);
  let result =await fetch("http://localhost:8080/add-task",{
    method:"post",
    body:JSON.stringify(taskData),
    credentials:"include",
    headers:{
      'Content-Type':'application/JSON'
    }
  });
  let results= await result.json()
  if(results.success){
    navigate("/")
    console.log("new task added");

  }else{
    alert("try after sometime")
  }
 }

  return(
    <div className='container'>
        <div className="formContainer">
            <h1 className='heading'> Add New Task</h1>
        <div className='formDiv'>
          <input onChange={(e)=>setTaskData({...taskData,title:e.target.value})} type="text" name='title' placeholder='Enter Task' />
          <textarea onChange={(e)=>setTaskData({...taskData,description:e.target.value})} rows={4} type='text' name='description' placeholder='Task Description'/>
          <button onClick={handelAddTask} className="btn">Add Task</button>
        </div>
        </div>
        
    </div>
  )
}
