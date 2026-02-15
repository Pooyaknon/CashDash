import { useState } from 'react'
import { authService } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import logo from '../assets/logo.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    toast
      .promise(
        authService.signIn(email, password),
        {
          success: 'Welcome back!',
          error: (err) => err.message || 'Login failed',
        }
      )
      .then(() => {
        navigate('/home')
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (
    
    <div className="min-h-screen flex items-center justify-center bg-[#E9F5FF]">
      {/* Card for login */}
      <div className="max-w-md w-full p-12 flex flex-col items-center">
        <img src={logo} alt="CashDash Logo" className="w-[120px] h-[120px] mx-auto mb-4"/>
        {/* Name of web */}
        <div className="text-center mb-2 ">
          <h1 className="font-lilita text-[55px] text-[#295F8D]">
            CashDash
          </h1>
          <p className="font-lilita text-[50px] text-[#295F8D]">
            Login
          </p>
        </div>

        {/* fill format */}
        <form onSubmit={handleLogin} className="w-[322px] space-y-4 ">
          <div>
            <label className="font-lilita text-[20px] text-[#7194B3] ml-2">Email</label>
            <input 
              type="email" 
              className="input-base"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-lilita text-[20px] text-[#7194B3] ml-2">Password</label>
            <input 
              type="password" 
              className="input-base"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* forgot pass */}
          <p className="text-[14px] text-right">
            <Link to="/forgot-password" disable className="text-[#295F8D] hover:underline">Forgot password?</Link>
          </p>

          {/* submit btn  */}
          <div className='pt-4'>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-0.5 bg-[#295F8D] rounded-[14px] font-lilita text-white text-[35px]
                        hover:bg-indigo-600 transition disabled:bg-gray-400 shadow-figma"
            >
              {loading ? 'Welcome back…' : 'LOGIN'}
            </button>
          </div>
        </form>

        {/* Register  */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-[15px]">
            Don't have an account? <Link to="/signup" className="text-[#295F8D] hover:underline">Register here</Link>
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default Login