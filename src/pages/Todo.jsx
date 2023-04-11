import supabase from "../services/supabase"
import { useEffect, useState } from "react"
import ListItem from "../components/ListItem"
import Spinner from "../components/Spinner"

function Todo() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className="flex flex-col gap-5">
        {tasks.map((task, index) => (
          <ListItem key={index} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Todo
