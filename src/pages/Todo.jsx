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

  const { session } = useAuthStatus()

  // Logout user
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // Handle adding task
  const addTask = async (e) => {
    e.preventDefault()

    if (taskText.length > 0) {
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
    }

    setTaskText("")
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

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="w-100% h-screen max-h-screen bg-#fdf5df flex justify-between">
        <div className="flex flex-col gap-10 p-10 h-screen">
          <Button variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
          <div>
            <form onSubmit={addTask}>
              <div className="flex gap-2">
                <TextField
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </div>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Todo
