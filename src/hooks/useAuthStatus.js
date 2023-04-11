import { json } from "react-router-dom"
import supabase from "../services/supabase"
import { useEffect, useState } from "react"

export const useAuthStatus = () => {
  const [user, setUser] = useState(false)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState({})

  useEffect(() => {
    let gotSession = localStorage.getItem("sb-tydssuelttxsxgtapjym-auth-token")
    if (gotSession) {
      setSession(JSON.parse(gotSession))
      setUser(true)
      setLoading(false)
    }
    async function getSession() {
      setLoading(false)
      const { subscription } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session) {
            localStorage.setItem(
              "sb-tydssuelttxsxgtapjym-auth-token",
              JSON.stringify(session)
            )
            setSession(session)
            setUser(true)
          } else {
            localStorage.removeItem("sb-tydssuelttxsxgtapjym-auth-token")
            setUser(false)
          }
          setLoading(false)
        }
      )
      return () => {
        subscription?.unsubscribe()
      }
    }
    getSession()
  }, [])

  return { user, loading, session }
}
