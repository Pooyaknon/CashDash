import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

const ProtectedRoute = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }
    checkUser()

    // listen to event for in case logout
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  // ระหว่างโหลด ให้แสดงหน้าจอว่าง ๆ หรือ Spinner ไปก่อน
  if (loading) return <div className="min-h-screen bg-[#D1E9FF] flex items-center justify-center font-bold text-[#2D5A8E]">Loading...</div>

  // if no user will navigate to login page
  if (!user) return <Navigate to="/login" replace />

  // if have User will accept to Home page
  return <Outlet />
}

export default ProtectedRoute