import { supabase } from './supabaseClient'

export const authService = {
  // Sign Up
  signUp: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username, // ข้อมูลส่วนนี้จะถูก SQL Trigger ดึงไปใส่ตาราง profiles
          full_name: username,
        },
      },
    })
    if (error) throw error
    return data
  },

  // Login
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Reset Password: send reset password email
  sendResetPasswordEmail: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/update-password',
    })
    if (error) throw error
    return data
  },

  // Update Password
  updatePassword: async (newPassword) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) throw error
    return data
  },

  // Logout
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }
}