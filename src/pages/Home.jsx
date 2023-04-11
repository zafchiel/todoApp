import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"

function Home() {
  return (
    <div>
      <div className="h-screen w-100% flex justify-center items-center sticky bg-#D2DAFF top-0">
        <div className="text-center w-2xl flex flex-col gap-5 items-center">
          <h1 className="text-size-6xl tracking-wide font-bold">
            Simple ToDo List
          </h1>
          <p className="text-size-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Repudiandae deleniti, expedita voluptate aperiam aspernatur nam
            dolorem minima.
          </p>
          <div className="flex gap-5 ">
            <button className="p-3 w-45 rounded-xl  bg-#B1B2FF cursor-pointer tracking-wide font-semibold outline-0 b-0 text-lg">
              <Link
                to="/register"
                className="no-underline text-#d2daff uppercase"
              >
                Get Started
              </Link>
            </button>
            <button
              className="p-0 w-45 rounded-xl bg-transparent cursor-pointer b-3 b-solid b-#B1B2FF
            hover:bg-#b1b2ff flex items-stretch justify-items-stretch tracking-wide text-lg"
            >
              <Link
                to="/log-in"
                className="no-underline text-#b1b2ff w-100% h-100% hover:text-#d2daff flex items-center justify-center  font-semibold uppercase"
              >
                Log In
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen w-100% flex justify-center items-center sticky bg-#EEF1FF top-0">
        <h1>TEXT</h1>
      </div>
    </div>
  )
}

export default Home
