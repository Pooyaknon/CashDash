import { useState } from 'react'
import { authService } from '../services/authService'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetRequest = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.sendResetPasswordEmail(email)
      setMessage('Reset password link sent to your email!')
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D1E9FF] p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-[40px] font-bold text-center text-[#295F8D] font-lilita mb-6">Forgot Password</h2>
        
        {message ? (
          <div className="text-center">
            <p className="text-green-600 mb-4">{message}</p>
            <Link to="/login" className="text-indigo-600 hover:underline">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-4">
            <p className="text-sm text-gray-600 text-center mb-4">
              กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่
            </p>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#295F8D] text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <div className="text-center">
              <Link to="/login" className="text-sm text-gray-500 hover:underline">Cancel</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword