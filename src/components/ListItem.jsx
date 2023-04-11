import React from "react"

function ListItem({ task, deleteTask }) {
  return (
    <div className="flex gap-5">
      <p>{task.task}</p>
      <div
        className="i-mdi:trash-can-outline"
        onClick={() => deleteTask(task.id)}
      ></div>
    </div>
  )
}

export default ListItem
