import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import supabase from "../services/supabase"

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

    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      })
      navigate(`/todos/${data.user.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  // Handle Google OAuth
  const handleGoogle = async () => {
    try {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "google",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-100% h-screen bg-#fdf5df flex justify-center items-center">
        <div className="bg-#f92c85 shadow-2xl shadow-rose p-10 w-xl rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-5xl text-#5ebec4 font-bold">Register</h1>
            <div
              className="p-0 w-45 h-10 rounded-xl bg-transparent cursor-pointer b-3 b-solid b-#d2daff
          hover:bg-#b1b2ff flex items-stretch justify-items-stretch tracking-wide text-lg"
            >
              <Link
                to="/"
                className="no-underline text-#d2daff w-100% h-100% flex items-center justify-center  font-semibold uppercase"
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
                    min={6}
                    placeholder="password"
                    onChange={onMutate}
                    className="w-100% h-40px rounded-lg outline-none b-1 pl-9 bg-#fdf5df"
                  />
                </div>

                <div className="flex items-center gap-5">
                  <button
                    type="submit"
                    className="p-2 bg-#5ebec4 rounded-lg outline-0 b-0 cursor-pointer uppercase tracking-wider font-bold text-#fdf5df b-0 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:scale-102"
                  >
                    Continue
                  </button>
                  <p>
                    Already registered? <Link to="/register">Sign-in</Link>
                  </p>
                </div>

                <div className="w-100%">
                  <button
                    onClick={handleGoogle}
                    className="w-100% flex bg-#5ebec4 itmes-center cursor-pointer justify-center gap-2 p-3 rounded-lg outline-none b-0 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:scale-102"
                  >
                    <div className="i-mdi:google-plus text-xl"></div>
                    <p>Sign up with Google</p>
                  </button>
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
