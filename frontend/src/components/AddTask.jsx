import React from 'react'
import "../style/addtask.css";
export const AddTask = () => {
  return(
    <div className='container'>
        <div className="formContainer">
            <h1 className='heading'> Add New Task</h1>
        <form >
          <input type="text" name='title' placeholder='Enter Task' />
          <textarea rows={4} type='text' name='description' placeholder='Task Description'/>
          <button className="btn">Add Task</button>
        </form>
        </div>
        
    </div>
  )
}
