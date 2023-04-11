import supabase from "../services/supabase"
import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import Spinner from "../components/Spinner"
import { useAuthStatus } from "../hooks/useAuthStatus"

function Todo() {
  const [taskText, setTaskText] = useState("")
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

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
  }, [tasks])

  // Handle adding task
  const addTask = async (e) => {
    e.preventDefault()
    try {
      const { data } = await supabase.from("todos").insert({
        task: taskText,
        is_completed: false,
        user_id: session.user.id,
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="w-100% h-screen bg-#d2daff flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="absolute right-5 top-5 p-0 w-45 rounded-xl cursor-pointer b-3 b-solid b-#d2daff
        bg-#b1b2ff tracking-wide text-lg"
      >
        LogOut
      </button>
      <div className="flex flex-col gap-10">
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
            <ListItem key={index} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Todo
