import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

function Home() {
  return (
    <div>
      <div className="h-screen w-100% flex justify-center items-center sticky bg-#fdf5df top-0">
        <div className="text-center w-90% md:w-2xl flex flex-col m-2 gap-5 items-center">
          <h1 className="text-size-4xl md:text-size-6xl tracking-wide font-bold text-#5ebec4">
            Simple ToDo List
          </h1>
          <p className="text-size-md md:text-size-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae deleniti, expedita voluptate aperiam aspernatur nam
            dolorem minima.
          </p>
          <div className="flex gap-5 justify-center w-90% md:w-2xl">
            <button
              className="p-3 w-30 md:w-45 rounded-lg  bg-#5ebec4 cursor-pointer tracking-wide font-semibold outline-0 b-0 md:text-lg 
            hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:scale-102
            transition"
            >
              <Link
                to="/register"
                className="no-underline text-#fdf5df  uppercase"
              >
                Get Started
              </Link>
            </button>
            <button
              className="p-0 w-30 md:w-45 rounded-lg bg-transparent cursor-pointer b-3 b-solid b-#5ebec4
            hover:bg-#5ebec4 flex items-stretch justify-items-stretch tracking-wide md:text-lg 
            "
            >
              <Link
                to="/log-in"
                className="no-underline text-#5ebec4 w-100% h-100% hover:text-#fdf5df flex items-center justify-center  font-semibold uppercase"
              >
                Log In
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="lower-card h-screen w-100% flex justify-center items-center sticky bg-#EEF1FF top-0">
        <h1>TEXT</h1>
      </div>
    </div>
  )
}

export default Home
