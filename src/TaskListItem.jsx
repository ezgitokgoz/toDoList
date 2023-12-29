import React from 'react'
function TaskListItem({item, editTask, removeTask,compTask}) {
  return (
    <>
      <li className={`list-group-item ${item.isDone ? 'text-decoration-line-through':''}`}
        key={item.uuid}>
            {item.priority && <span 
            className=" bg-danger badge me-2" >!</span>}
            {item.task}
            

            <div className=' btn-group float-end ' role="group">
                <button onClick={()=>removeTask(item.uuid)} 
                 className='btn btn-sm btn-outline-danger float-end'>DELETE</button>
            </div>

            <div className='btn-group float-end mr-2' role="group">
                <button onClick={()=>editTask(item.uuid)} 
                 className='btn btn-sm btn-outline-primary float-end'>EDIT</button>
            </div>

            <div className='btn-group float-start mr-2' role="group">
                <button onClick={()=>compTask(item.uuid)} 
                 className='btn btn-sm btn-outline-success float-end'>COMPLETED</button>
            </div>
            
        </li>
    </>
  )
}

export default TaskListItem
