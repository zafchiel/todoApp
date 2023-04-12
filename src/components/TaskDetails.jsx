import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import supabase from "../services/supabase"

function TaskDetails({ selectedTask }) {
  const [desc, setDesc] = useState("")
  const [isChecked, setIsChecked] = useState(selectedTask.is_completed)

  useEffect(() => {
    if (selectedTask.description) {
      setDesc(selectedTask.description)
    } else {
      setDesc("")
    }
  }, [selectedTask])

  // Handle saving changes
  const onSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("todos")
      .update({
        description: desc,
        is_completed: isChecked,
      })
      .eq("id", selectedTask.id)
    if (error) {
      console.log(error)
    }
  }

  if (selectedTask) {
    return (
      <div className="bg-#f92c85 w-100% h-100% flex flex-col gap-10 justify-center items-center">
        <h1>{selectedTask.task}</h1>
        <form onSubmit={onSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter your description"
          />
          <div className="flex justify-between">
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="isCompleted">Completed</label>
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    )
  }
  return null
}

export default TaskDetails
