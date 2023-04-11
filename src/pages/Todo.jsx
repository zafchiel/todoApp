import { useParams } from "react-router-dom"
import supabase from "../services/supabase"
import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"

function Todo() {
  const [tasks, setTasks] = useState([])

  const { userId } = useParams()

  // Logout user
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("todos").select()
      setTasks(data)
    }

    fetchTasks()
  }, [])

  return (
    <div className="w-100% h-screen bg-#d2daff flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="absolute right-5 top-5 p-0 w-45 rounded-xl cursor-pointer b-3 b-solid b-#d2daff
        bg-#b1b2ff tracking-wide text-lg"
      >
        LogOut
      </button>
      <div className="flex flex-col gap-5">
        {tasks.map((task, index) => (
          <ListItem key={index} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Todo
