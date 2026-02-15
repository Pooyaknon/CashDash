import { useState } from 'react'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()
  const handleUpdate = async (e) => {
  e.preventDefault()
    try {
      await authService.updatePassword(newPassword)

      toast.success('Password updated! Please log in again.')

      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Failed to update password')
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9F5FF] p-4">
      <form onSubmit={handleUpdate} className="max-w-[400px] space-y-4 w-full max-w-[322px] mx-auto">
        <img
          src={logo}
          alt="CashDash Logo"
          className="w-[120px] h-[120px] mx-auto mb-4"
        />
        <div className="text-[50px] text-center text-[#295F8D] font-lilita mb-6">
          <span className="block md:inline">Set New</span>{' '}
          <span className="block md:inline">Password</span>
        </div>
        <div className="max-w-[322px] mx-auto space-y-3">
          <div>
            <label className="block font-lilita text-[20px] text-[#7194B3] mb-1 ml-2">New Password</label>
            <input 
              type="password" placeholder="At least 6 characters" 
              className="input-base w-full"
              onChange={(e) => setNewPassword(e.target.value)} required 
            />
          </div>
            
          <button type="submit" className="w-full py-0.5 bg-[#295F8D] rounded-[14px] font-lilita text-white text-[35px]
                          hover:bg-indigo-600 transition disabled:bg-gray-400 shadow-figma">
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword