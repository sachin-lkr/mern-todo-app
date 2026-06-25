import React, { useEffect, useState } from "react";
import "../style/list.css";
import { Link } from "react-router-dom";

const List = () => {
  const [taskData, setTaskData] = useState();
  const [selectedTask, setSelectedTask]=useState([]);
  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const List = await fetch("http://localhost:8080/tasks",{
      credentials:"include"
    });
    const list = await List.json();
    console.log(list);
    if (list.success) {
      setTaskData(list.result);
    }
  };

  const deleteTask = async (id)=>{
    const items = await fetch("http://localhost:8080/delete/"+id,{method:"delete"});
    const item = await items.json();
    
    if (item.success) {
     getListData()
    }
  };

   const editTask = async (id)=>{
    const items = await fetch("http://localhost:8080/delete/"+id,{method:"delete"});
    const item = await items.json();
    
    if (item.success) {
     getListData()
    }
  }
  const selectAll = (e) => {
    console.log(e.target.checked);
    if(e.target.checked){
      let items = taskData.map((item)=>item._id);
      setSelectedTask(items);
    }else{
      setSelectedTask([]);
      
  }};

  const selectSingleItem=(id)=>{
    console.log(id)

    if(selectedTask.includes(id)){
      let items=selectedTask.filter((item)=>item!=id);
      setSelectedTask(items)
    }else{
      setSelectedTask([...selectedTask, id]);
    }

  }
  const deleteMultiple=async()=>{
    console.log(selectedTask);
      const items = await fetch("http://localhost:8080/delete-multiple/",
        {
          method:"delete",
          body:JSON.stringify(selectedTask),
          headers:{
            "Content-type":"Application/json"
          }

        }
      );
    const item = await items.json();
    
    if (item.success) {
     getListData()
    }
  }


  return (
    <>
      <div className="taskContainer">
        <h1>Task List</h1>
        <button onClick={deleteMultiple} className="delete-btn">Delete</button>
        <ul className="task-list">
         <div className="header-container">
         <li className="list-header"> <input onChange={selectAll} type="checkbox" /> </li>
          <li className="list-header">S.No</li>
          <li className="list-header">Title</li>
          <li className="list-header">Description</li>
          <li className="list-header">Action</li>
         </div>
           <div className="item-container">
          {taskData &&
            taskData.map((item, index) => {
              return (
               
                  <div key={item._id} >
                    <li className="list-item"> <input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox"/>  </li>
                    <li className="list-item">{index+1}</li>
                    <li className="list-item">{item.title}</li>
                    <li className="list-item">{item.description}</li>
                    <li className="list-item"><button onClick={()=>deleteTask(item._id)} className="btn">Delete</button></li>
                    <Link to={"/update/"+item._id}><button  className="btn">Update</button></Link>
                  </div>
                
              );
            })};
          </div>
        </ul>
      </div>
    </>
  );
};

export default List;
