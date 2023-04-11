import supabase from "../services/supabase"
import { useEffect, useState } from "react"

export const useAuthStatus = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let gotSession = localStorage.getItem("sb-tydssuelttxsxgtapjym-auth-token")
    if (gotSession) {
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

  return { user, loading }
}
