import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import supabase from "../services/supabase"
import { Button } from "@mui/material"
import { Snackbar } from "@mui/material"
import { toast } from "react-hot-toast"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const navigate = useNavigate()

  // Hanlde change in form
  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  // Hanlde login
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email.length === 0 || password.length === 0) {
      toast.error("All fields must be filled!")
      return
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (user) navigate(`/todos/${user.id}`)

    if (error) toast.error(error.message)
  }

  // Handle Google OAuth
  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })
    if (error) toast.error(error.message)
  }

  return (
    <div className="w-100% h-screen w-full bg-#fdf5df sm:flex justify-center items-center">
      <div className="bg-#f92c85 shadow-2xl shadow-rose flex justify-center items-center flex-col p-3 sm:p-10 w-100% h-screen sm:h-auto sm:w-xl sm:rounded-lg">
        <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl sm:text-5xl text-#5ebec4 font-bold">Login</h1>
          <div
            className="p-0 w-30 sm:w-45 h-10 rounded-xl bg-transparent cursor-pointer b-3 b-solid b-#d2daff
          hover:bg-#b1b2ff flex justify-between items-stretch justify-items-stretch tracking-wide text-lg"
          >
            <Link
              to="/"
              className="no-underline text-#d2daff w-100% h-100% flex items-center justify-center  font-semibold uppercase hover:text-#f92c85"
            >
              Return
            </Link>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col w-100% gap-5px relative">
                <label htmlFor="email">Email</label>

                <div className="i-mdi:email-arrow-right-outline absolute left-12px bottom-12px z-5"></div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  onChange={onMutate}
                  className="w-100% h-40px rounded-lg outline-0 b-1 pl-9 bg-#fdf5df"
                />
              </div>

              <div className="flex flex-col w-100% gap-5px relative">
                <label htmlFor="email">Password</label>

                <div className="i-mdi:password-add-outline absolute left-12px bottom-12px z-5"></div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength={6}
                  placeholder="password"
                  onChange={onMutate}
                  className="w-100% h-40px rounded-lg outline-none b-1 pl-9 bg-#fdf5df"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <Button
                  variant="contained"
                  type="submit"
                  className="p-2 w-full bg-#5ebec4 rounded-lg outline-0 b-0 cursor-pointer uppercase tracking-wider font-bold text-#fdf5df b-0 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:scale-102"
                >
                  Continue
                </Button>
                <p className="sm:w-25rem">
                  Yet not registered? <Link to="/register">Sign-up</Link>
                </p>
              </div>

              <div className="w-100%">
                <Button
                  variant="contained"
                  onClick={handleGoogle}
                  className="w-100% flex bg-#5ebec4 itmes-center cursor-pointer justify-center gap-2 p-3 hover:scale-102"
                >
                  <div className="i-mdi:google-plus text-xl"></div>
                  <p>Continue with Google</p>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
