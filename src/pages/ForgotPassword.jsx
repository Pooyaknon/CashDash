import { useState } from 'react'
import { authService } from '../services/authService'
import { Link } from 'react-router-dom'
import toast from "react-hot-toast";
import logo from "../assets/logo.png";


function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetRequest = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await authService.sendResetPasswordEmail(email)
      toast.success('Check your email for a link to reset your password.')
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F5FF] dark:bg-gray-900 p-4">
      <div className="max-w-md w-full p-8">
        <img
          src={logo}
          alt="CashDash Logo"
          className="w-[120px] h-[120px] mx-auto mb-4"
        />
        <h2 className="text-[50px] text-center text-[#295F8D] dark:text-[#e6edf3] font-lilita mb-6">Forgot Password</h2>

          {/* fill format */}
          <form onSubmit={handleResetRequest} className="space-y-4 w-full max-w-[322px] mx-auto">
            
            {/* Email field */}
            <div className="flex flex-col items-center gap-2 ">
              <label className="font-lilita text-[20px] text-[#7194B3] self-start ml-2">
                Email
              </label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="input-base"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-0.5 bg-[#295F8D] rounded-[14px] font-lilita text-white text-[35px]
                          hover:bg-indigo-600 transition disabled:bg-gray-400 shadow-figma"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            {/* Cancel */}
            <Link
              to="/login"
              className="block w-full py-0.5 bg-[#747474] rounded-[14px] font-lilita text-white text-[35px]
                        text-center hover:bg-gray-600 transition shadow-figma"
            >
              Cancel
            </Link>

            {/* Hint text */}
            <p className="text-[15px] text-[#747474] text-center">
              Don’t worry! Enter your email and<br />
              we’ll send you a link to reset your password.
            </p>
          </form>
      </div>
    </div>
  )
}

export default ForgotPassword