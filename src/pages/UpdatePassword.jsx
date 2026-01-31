import { useState } from 'react'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await authService.updatePassword(newPassword)
      alert('เปลี่ยนรหัสผ่านสำเร็จ! กรุณาล็อกอินใหม่')
      navigate('/login')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
        <input 
          type="password" placeholder="Enter new password" 
          className="w-full p-2 mb-6 border rounded"
          onChange={(e) => setNewPassword(e.target.value)} required 
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword