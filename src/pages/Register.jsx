import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import supabase from "../services/supabase"
import Spinner from "../components/Spinner"

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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      navigate("/tasks")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-100% h-screen bg-#d2daff flex justify-center items-center">
        <div className="bg-#B1B2FF shadow-2xl p-10 w-xl rounded-2xl">
          <div className="flex justify-between">
            <h1 className="text-5xl mb-6">Register</h1>
            <button
              className="p-0 w-45 rounded-xl bg-transparent cursor-pointer b-3 b-solid b-#d2daff
          hover:bg-#b1b2ff flex items-stretch justify-items-stretch tracking-wide text-lg"
            >
              <Link
                to="/"
                className="no-underline text-#d2daff w-100% h-100% flex items-center justify-center  font-semibold uppercase"
              >
                Return
              </Link>
            </button>
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
                    className="w-100% h-40px rounded-lg outline-0 b-1 pl-9 bg-#d2daff"
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
                    className="w-100% h-40px rounded-lg outline-none b-1 pl-9 bg-#d2daff"
                  />
                </div>

                <div className="flex items-center gap-5">
                  <button
                    type="submit"
                    className="p-2 bg-#d2daff rounded-xl outline-0 b-0 cursor-pointer"
                  >
                    Continue
                  </button>
                  <p>
                    Already registered? <Link to="/log-in">Sign-in</Link>
                  </p>
                </div>

                <div className="w-100%">
                  <button className="w-100% flex bg-#d2daff itmes-center cursor-pointer justify-center gap-2 p-3 rounded-xl outline-none">
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
