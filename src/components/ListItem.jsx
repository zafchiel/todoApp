import React from "react"

function ListItem({ task, deleteTask, updateTask, selectTask }) {
  return (
    <div className="flex gap-5 w-50 justify-between items-center">
      <div onClick={() => selectTask(task.id)} className="h-15 b-1">
        {task.task}
      </div>
      <div>
        <div
          className="i-mdi:note-edit-outline text-3xl cursor-pointer"
          onClick={() => updateTask(task.id)}
        ></div>
        <div
          className="i-mdi:trash-can-outline text-3xl cursor-pointer"
          onClick={() => deleteTask(task.id)}
        ></div>
      </div>
    </div>
  )
}

export default ListItem
