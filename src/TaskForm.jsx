import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";

function TaskForm() {
  const emptyForm = { task: "", priority: false, isDone: false };
  const [formData, setFormData] = useState(emptyForm);
  const [tasks, setTasks] = useState([])
  const [taskChangeCount,setTaskChangeCount]=useState(0)
  const completedTasksCount = countCompletedTasks();

  useEffect(()=>{
    if(taskChangeCount>0)
    {
      localStorage.setItem("tasks",JSON.stringify(tasks))
    }
  },[taskChangeCount])

  useEffect(()=>{
    const localStorageTasks =JSON.parse(localStorage.getItem("tasks"))
    setTasks(localStorageTasks ?? [])
  },[])

  function editTask(uuid) {
    console.log(uuid);
    const task = tasks.find((item) => item.uuid === uuid);
    //console.log(task);
    setFormData({ ...task, isEdited: true });
    setTaskChangeCount(prev=>prev+1)
  }

  function removeTask(uuid) {
    console.log(uuid);
    setTasks((prev) => prev.filter((item) => item.uuid !== uuid));
    setTaskChangeCount(prev=>prev+1)
  }
  function compTask(uuid) {
    const taskIndex = tasks.findIndex(item => item.uuid == uuid)
    const task = tasks[taskIndex]
    task.isDone = !task.isDone
    const newTasks = tasks.slice()
    newTasks[taskIndex] = task
    setTasks(newTasks)
    setTaskChangeCount(prev=>prev+1)
  }

  function handleInputChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      };
    });
  }

  

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formData.isEdited) {
      const taskIndex = tasks.findIndex((item) => item.uuid === formData.uuid);
      const newTasks = tasks.slice();
      newTasks[taskIndex] = { ...formData };
      setTasks(newTasks);
    }
    //console.log(formData);
    else if (formData.task.length > 3) {
      formData.uuid = uuidv4();
      setTasks(
        (prev) => [formData, ...prev] //son eklenen en başa
      );

      //console.log(tasks)
    }
    setTaskChangeCount(prev=>prev+1)
    setFormData(emptyForm);
    event.target.reset();
  }


  function countCompletedTasks() {
    const completedTasks = tasks.filter(task => task.isDone);
    return completedTasks.length;
  }
  


  let currentIndex = 0; // Başlangıç indeksi
  const images = [
    'url("https://images.unsplash.com/photo-1549834146-0702b38f1bed?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    'url("https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    'url("https://images.unsplash.com/photo-1607457471980-84e5d89de2fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    'url("https://images.unsplash.com/photo-1607457516676-055ef951e64e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    'url("https://images.unsplash.com/photo-1608501712351-a4ca8dc996fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',

  ];

  function changeBackground() {
    const table = document.getElementById('table');
  
    // Mevcut indeksteki resmi al
    const currentImage = images[currentIndex];
    
    // Resmi arka plan olarak ayarla
    table.style.backgroundImage = currentImage;
  
    // İndeksi bir sonraki resme geçecek şekilde güncelle
    currentIndex = (currentIndex + 1) % images.length;
  }


  return (
    <div className="container-sm text-black  m-5 border rounded  " id="table">
      <h1 className="lead text-center mt-3 text-black">TO DO LIST</h1>
      <div className="d-flex justify-content-center  ">
      <button 
      onClick={changeBackground}
      type="submit" className="btn btn-outline-light mt-2">
            CHANGE THEME
          </button>
       </div>
      <div className=" p-4 bg-light bg-opacity-75 m-5 border rounded">
        <form onSubmit={handleFormSubmit}>
          <div className="row ">
            <label htmlFor="inputEmail3" className="fw-light col-sm-2 col-form-label">
              Task
            </label>
            <div className="col-sm-10">
              <input
                onChange={handleInputChange}
                type="text"
                value={formData.task}
                className="form-control mb-3"
                id="inputEmail3"
                name="task"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-10 offset-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input "
                  onChange={handleInputChange}
                  type="checkbox"
                  checked={formData.priority}
                  id="priority"
                  name="priority"
                  priority
                />
                <label className=" fw-light  form-check-label" htmlFor="gridCheck1">
                  Priority
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-success">
            SUBMIT
          </button>
        </form>
      </div>
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        compTask={compTask}
      />
      <div>
        <p className="fw-light text-center text-decoration-underline">Completed Tasks Scor: {completedTasksCount}</p>
      </div>
       
    </div>
  );
}



export default TaskForm;
