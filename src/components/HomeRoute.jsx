import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

function PrivateRoute() {
  const { user, loading, session } = useAuthStatus()

  if (loading) {
    return <Spinner />
  }

  return user ? <Navigate to={`/todos/${session.user.id}`} /> : <Outlet />
}

export default PrivateRoute
