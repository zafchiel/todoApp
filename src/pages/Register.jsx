import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import supabase from "../services/supabase"
import { Button } from "@mui/material"
import { toast } from "react-hot-toast"

function Register() {
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

  // Register new user in supabase
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email.length === 0 || password.length === 0) {
      toast.error("All fields must be filled!")
      return
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
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
    <>
      <div className="w-100% h-screen bg-#fdf5df flex justify-center items-center">
        <div className="bg-#f92c85 shadow-2xl shadow-rose p-10 w-90% md:w-xl rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-5xl text-#5ebec4 font-bold ">
              Register
            </h1>
            <div
              className="p-0 w-30 md:w-45 h-10 rounded-xl bg-transparent cursor-pointer b-3 b-solid b-#d2daff
          hover:bg-#b1b2ff flex items-stretch justify-items-stretch tracking-wide text-lg"
            >
              <Link
                to="/"
                className="no-underline text-#d2daff w-100% h-100% flex items-center justify-center hover:text-#f92c85 font-semibold uppercase"
              >
                Return
              </Link>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
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

                <div className="flex items-center gap-5">
                  <Button
                    variant="contained"
                    type="submit"
                    className="tracking-wider hover:scale-102"
                  >
                    Continue
                  </Button>
                  <p>
                    Already registered? <Link to="/register">Sign-in</Link>
                  </p>
                </div>

                <div className="w-100%">
                  <Button
                    variant="contained"
                    onClick={handleGoogle}
                    className="w-100% flex bg-#5ebec4 itmes-center cursor-pointer justify-center gap-2 hover:scale-102"
                  >
                    <div className="i-mdi:google-plus text-xl"></div>
                    <p>Sign up with Google</p>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
