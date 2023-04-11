import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

function PrivateRoute() {
  const { user, loading } = useAuthStatus()

  if (loading) {
    return <Spinner />
  }

  return user ? <Outlet /> : <Navigate to="/log-in" />
}

export default PrivateRoute
