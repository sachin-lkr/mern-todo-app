import React, { useEffect, useState } from "react";
import "../style/list.css";

const List = () => {
  const [taskData, setTaskData] = useState();
  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    const List = await fetch("http://localhost:8080/tasks");
    const list = await List.json();
    console.log(list);
    if (list.success) {
      setTaskData(list.result);
    }
  };
  return (
    <>
      <div className="taskContainer">
        <h1>Task List</h1>
        <ul className="task-list">
         <div className="header-container">
          <li className="list-header">S.No</li>
          <li className="list-header">Title</li>
          <li className="list-header">Description</li>
         </div>

          {taskData &&
            taskData.map((item, index) => {
              return (
                <>
                  <div key={index}>
                    <li className="list-item">{index+1}</li>
                    <li className="list-item">{item.title}</li>
                    <li className="list-item">{item.description}</li>
                  </div>
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default List;
