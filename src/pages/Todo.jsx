import supabase from "../services/supabase"
import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import Spinner from "../components/Spinner"
import { useAuthStatus } from "../hooks/useAuthStatus"
import TaskDetails from "../components/TaskDetails"
import { Button } from "@mui/material"

function Todo() {
  const [taskText, setTaskText] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedtask] = useState(null)

  const { session } = useAuthStatus()

  // Logout user
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
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
  }, [])

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
    }
  }

  // Handle update task
  const updateTask = async (id) => {
    const { error } = await supabase
      .from("todos")
      .update({ task: taskText })
      .eq("id", id)
    if (error) {
      console.log(error)
    }
  }

  // Handle select task
  const selectTask = (id) => {
    setSelectedtask(tasks.filter((task) => task.id === id)[0])
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <div className="absolute left-5 top-5">
        <Button variant="outlined" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div className="w-100% h-screen bg-#fdf5df flex justify-between items-center">
        <div className="flex flex-col gap-10 p-10">
          <div>
            <form onSubmit={addTask}>
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="flex flex-col gap-5">
            {tasks?.map((task, index) => (
              <ListItem
                key={index}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                selectTask={selectTask}
              />
            ))}
          </div>
        </div>
        {selectedTask && (
          <div className="h-screen w-60% flex">
            <div className="clip"></div>
            <TaskDetails selectedTask={selectedTask} />
          </div>
        )}
      </div>
    </>
  )
}

export default Todo
