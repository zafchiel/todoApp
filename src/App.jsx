import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home"
import HomeRoute from "./components/HomeRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Todo from "./pages/Todo"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5ebdc4",
    },
    secondary: {
      main: "#f92c85",
    },
    background: {
      default: "#d2daff",
    },
  },
  typography: {
    fontFamily: ["Satoshi", "sans-serif"],
  },
})

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" />
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
      </ThemeProvider>
    </>
  )
}

export default App
