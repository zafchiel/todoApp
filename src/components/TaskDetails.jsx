import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"
import supabase from "../services/supabase"
import { toast } from "react-hot-toast"
import Button from "@mui/material/Button"
import { Checkbox, FormControlLabel } from "@mui/material"

function TaskDetails({ selectedTask }) {
  const [desc, setDesc] = useState("")
  const [isChecked, setIsChecked] = useState(null)

  useEffect(() => {
    if (selectedTask.description) {
      setDesc(selectedTask.description)
    } else {
      setDesc("")
    }

    if (selectedTask.is_completed) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
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
    toast.success("Saved")
    if (error) {
      console.log(error)
      toast.error("Could not save")
    }
  }

  if (selectedTask) {
    return (
      <div className="bg-#f92c85 w-100% h-100% flex flex-col gap-10 justify-center items-center">
        <h1>{selectedTask.task}</h1>
        <form>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter your description"
          />
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  name="isCompleted"
                />
              }
              label="Completed"
            />
          </div>

          <Button variant="contained" onClick={onSubmit} className="#d2daff">
            Save Changes
          </Button>
        </form>
      </div>
    )
  }
  return null
}

export default TaskDetails
