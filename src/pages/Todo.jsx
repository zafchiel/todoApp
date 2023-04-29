import supabase from "../services/supabase"
import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import Spinner from "../components/Spinner"
import { useAuthStatus } from "../hooks/useAuthStatus"
import TaskDetails from "../components/TaskDetails"
import { Button, TextField } from "@mui/material"
import { toast } from "react-hot-toast"
import { Modal, Box } from "@mui/material"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "#fdf5df",
  boxShadow: 24,
  p: 3,
}

function Todo() {
  const [taskText, setTaskText] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedtask] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)

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

    if (isValid) {
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

  // Make array of completed tasks
  const completedTasks = tasks
    .filter((task) => task.is_completed === true)
    .map((task) => task.id)

  // Handle delete all completed tasks
  const deleteCompletedTasks = async (idArr) => {
    const { error } = await supabase.from("todos").delete().in("id", idArr)
    if (error) {
      console.log(error)
    } else {
      toast.success("Tasks deleted")
      setChangeSaved(true)
      setSelectedtask(null)
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

  // Handle input task
  const handleChange = (e) => {
    setTaskText(e.target.value)
    if (e.target.value.length <= 0 || e.target.value.length > 15) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  // Handle double clicking task
  const handleQuickComplete = async (task) => {
    const { error } = await supabase
      .from("todos")
      .update({
        is_completed: !task.is_completed,
      })
      .eq("id", task.id)
    if (error) {
      console.log(error)
    } else {
      setChangeSaved(true)
    }
  }

  // Fetch tasks
  useEffect(() => {
    setChangeSaved(false)
    const fetchTasks = async () => {
      try {
        const { data } = await supabase
          .from("todos")
          .select()
          .order("created_at")
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
      <div className="w-100% h-screen overflow-hidden bg-#fdf5df flex justify-between">
        <div className="flex flex-col gap-10 p-2 md:p-10 h-screen w-100% md:w-40%">
          <div className="flex justify-between gap-2 w-100%">
            <Button variant="outlined" onClick={handleLogout}>
              Log Out
            </Button>

            <Button
              variant="contained"
              type="error"
              onClick={() => setModalOpened(true)}
            >
              Del Completed
            </Button>
          </div>
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
          <SimpleBar style={{ maxHeight: "calc(100% - 200px)" }}>
            {tasks?.map((task, index) => (
              <ListItem
                handleQuickComplete={handleQuickComplete}
                key={index}
                task={task}
                deleteTask={deleteTask}
                selectTask={selectTask}
              />
            ))}
          </SimpleBar>
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

      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        <Box sx={style}>
          <div className="flex flex-col gap-3">
            <h3>Are you sure?</h3>
            <div className="flex justify-between">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteCompletedTasks(completedTasks)
                  setModalOpened(false)
                }}
              >
                Delete
              </Button>
              <Button variant="outlined" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default Todo
