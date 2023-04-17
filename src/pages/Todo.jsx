import supabase from "../services/supabase"
import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import Spinner from "../components/Spinner"
import { useAuthStatus } from "../hooks/useAuthStatus"
import TaskDetails from "../components/TaskDetails"
import { Button, TextField } from "@mui/material"
import { toast } from "react-hot-toast"

function Todo() {
  const [taskText, setTaskText] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedtask] = useState(null)

  // State to refresh list
  const [changeSaved, setChangeSaved] = useState(false)

  // Validation of task input
  const [isValid, setIsValid] = useState(true)

  const { session } = useAuthStatus()

  // Logout user
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // Handle adding task
  const addTask = async (e) => {
    e.preventDefault()

    if (taskText.length > 0 && taskText.length < 16) {
      try {
        const { data } = await supabase
          .from("todos")
          .insert({
            task: taskText,
            is_completed: false,
            user_id: session.user.id,
          })
          .select()
        setSelectedtask(data[0])
        setChangeSaved(true)
      } catch (error) {
        console.log(error)
      }
      setTaskText("")
    }
  }

  // Handle delete task
  const deleteTask = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id)
    if (error) {
      console.log(error)
    } else {
      toast.success("Task deleted")
      setChangeSaved(true)
      if (selectedTask.id === id) {
        setSelectedtask(null)
      }
    }
  }

  // Handle select task
  const selectTask = (id) => {
    setSelectedtask(tasks.filter((task) => task.id === id)[0])
  }

  useEffect(() => {
    setChangeSaved(false)
    const fetchTasks = async () => {
      try {
        const { data } = await supabase.from("todos").select()
        setTasks(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTasks()
  }, [changeSaved])

  // Handle input task
  const handleChange = (e) => {
    setTaskText(e.target.value)
    if (e.target.value.length <= 0 || e.target.value.length > 15) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="w-100% h-screen overflow-hidden bg-#fdf5df flex justify-between">
        <div className="flex flex-col gap-10 p-10 h-screen w-100% md:w-40%">
          <Button variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
          <div>
            <form onSubmit={addTask}>
              <div className="flex gap-2 w-100%">
                <TextField
                  error={!isValid}
                  helperText={!isValid && "Must be Between 1 and 15 letters"}
                  fullWidth
                  id="outlined-basic"
                  label="Enter your task"
                  variant="outlined"
                  value={taskText}
                  onChange={handleChange}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col w-100% gap-4 overflow-y-scroll">
            {tasks?.map((task, index) => (
              <ListItem
                key={index}
                task={task}
                deleteTask={deleteTask}
                selectTask={selectTask}
              />
            ))}
          </div>
        </div>
        {selectedTask && (
          <div className="clip">
            <TaskDetails
              selectedTask={selectedTask}
              setChangeSaved={(state) => setChangeSaved(state)}
              setSelectedtask={(state) => setSelectedtask(state)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Todo
