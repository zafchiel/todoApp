import { useEffect, useState } from "react"
import supabase from "../services/supabase"
import { toast } from "react-hot-toast"
import Button from "@mui/material/Button"
import { Checkbox, FormControlLabel, TextField } from "@mui/material"

function TaskDetails({ selectedTask, setChangeSaved, setSelectedtask }) {
  const [editedTask, setEditedTask] = useState(selectedTask)

  useEffect(() => {
    setEditedTask(selectedTask)
  }, [selectedTask])

  // Handle check complete
  const onCheckChange = () => {
    setEditedTask((state) => ({
      ...state,
      is_completed: !state.is_completed,
    }))
  }

  // Handle saving changes
  const onSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("todos")
      .update({
        task: editedTask.task,
        description: editedTask.description,
        is_completed: editedTask.is_completed,
      })
      .eq("id", selectedTask.id)
    if (error) {
      console.log(error)
      toast.error("Could not save")
    } else {
      toast.success("Saved")
      setChangeSaved(true)
    }
  }

  if (selectedTask) {
    return (
      <div className="bg-#f92c85 w-100% h-100% flex flex-col gap-10 justify-center items-center">
        <form className="flex flex-col gap-5">
          <TextField
            id="outlined-basic"
            label="Task"
            variant="outlined"
            value={editedTask.task}
            onChange={(e) =>
              setEditedTask((prevState) => ({
                ...prevState,
                task: e.target.value,
              }))
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={editedTask.description ? editedTask.description : ""}
            onChange={(e) =>
              setEditedTask((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            placeholder="Enter your description"
          />
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={editedTask.is_completed}
                  onChange={onCheckChange}
                  name="isCompleted"
                />
              }
              label="Completed"
            />
          </div>

          <Button variant="contained" onClick={onSubmit} className="#d2daff">
            Save Changes
          </Button>
          <Button
            variant="outlined"
            className="m-5"
            onClick={() => setSelectedtask(null)}
          >
            Close
          </Button>
        </form>
      </div>
    )
  }
  return null
}

export default TaskDetails
