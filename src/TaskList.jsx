import React, { useState,useEffect } from 'react'
import TaskListItem from './TaskListItem'

function TaskList({tasks, removeTask, editTask, compTask}){
  const [priority,setPriority]=useState(false)
  const [filteredTasks,setFilteredTasks]=useState(tasks)

  function handlePriorityFilter(){
    setPriority(prev=>!prev)
  }

  useEffect(()=>{
    setFilteredTasks(tasks)
  },[tasks])

  useEffect(()=>{
    priority?setFilteredTasks(tasks.filter(
        item=>item.priority===priority)): setFilteredTasks(tasks)
  },[priority])
  return (
    <>
    <div className=' p-4 bg-light bg-opacity-75 m-5 border rounded'>
    <p className=' lead'>DO IT
    <span 
    onClick={handlePriorityFilter} 
    className={`btn btn-sm ${!priority? "btn-outline-danger":"btn-outline-secondary"} float-end`}>
        {!priority? "Show Priorities":"Show All"} 
        </span>
    </p>

    <ul className='list-group my-3'>
        {filteredTasks.map((item,index)=>
        <TaskListItem 
        key={index} 
        item={item} 
        editTask={editTask} 
        removeTask={removeTask}
        compTask={compTask} />)}
    </ul>
    </div>
    

    </>
  )
}

export default TaskList
