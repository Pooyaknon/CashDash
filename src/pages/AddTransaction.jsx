import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { transactionService } from '../services/transactionService'

function AddTransaction() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // ดึงค่า type จาก URL (เช่น ?type=income หรือ ?type=expense)
  const type = searchParams.get('type') || 'expense'
  const isIncome = type === 'income'

  // เก็บข้อมูลฟอร์ม
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  // กำหนดสีตามประเภท
  const themeColor = isIncome ? 'text-[#4CAF50]' : 'text-[#E55C5C]'
  const buttonColor = isIncome ? 'bg-[#4CAF50]' : 'bg-[#E55C5C]'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description || !amount) return alert('Please fill in all fields')

    setLoading(true)
    try {
      // เรียกใช้ Service เพื่อบันทึกลง Supabase
      await transactionService.addTransaction({
        description,
        amount: parseFloat(amount), // แปลงเป็นตัวเลข
        type,
        date: new Date().toISOString().split('T')[0] // ใช้วันปัจจุบัน 
      })
      navigate('/') // บันทึกเสร็จกลับไปหน้า Home
    } catch (error) {
      alert('Error saving transaction: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#D1E9FF] flex flex-col items-center justify-center font-sans p-4">
      
      {/* Card Container */}
      <div className="bg-white rounded-[40px] w-full max-w-sm p-8 shadow-2xl text-center relative">
        
        {/* Header Text */}
        <h2 className="text-[#2D5A8E] font-bold text-2xl mb-1">New Entry</h2>
        <h1 className={`font-black text-4xl uppercase mb-8 ${themeColor}`}>
          {type}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          
          {/* Description Input */}
          <div>
            <label className="block text-[#2D5A8E] font-bold text-lg mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Mama, Salary"
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-700 font-bold outline-none border-2 border-transparent focus:border-blue-300 transition"
              autoFocus
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-[#2D5A8E] font-bold text-lg mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-gray-700 font-bold outline-none border-2 border-transparent focus:border-blue-300 transition"
              />
              <span className="absolute right-4 top-3 text-gray-400 font-bold">THB</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-2xl font-black text-xl shadow-lg hover:brightness-110 transition transform active:scale-95 ${buttonColor}`}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full bg-white border-2 border-gray-200 text-gray-500 py-3 rounded-2xl font-bold text-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddTransaction