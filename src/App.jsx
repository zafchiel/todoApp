import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import HomeRoute from "./components/HomeRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Todo from "./pages/Todo"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/todos/:userId" element={<PrivateRoute />}>
            <Route path="/todos/:userId" element={<Todo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
