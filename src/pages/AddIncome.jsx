import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { transactionService } from '../services/transactionService'
import { useLocation } from "react-router-dom";

function AddIncome() {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const selectedDate = location.state?.date || new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Bangkok",
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description || !amount) return alert('Please fill in all fields')

    setLoading(true)
    try {
      // บันทึกข้อมูล โดยระบุ type เป็น 'income' เสมอ
      await transactionService.addTransaction({
        description,
        amount: parseFloat(amount),
        type: 'income',
        date: selectedDate   
      })
      navigate('/home', { state: { date: selectedDate } })// บันทึกเสร็จกลับไปหน้า Home
    } catch (error) {
      alert('Error saving income: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-lilita p-4 border
                      bg-[radial-gradient(circle_at_center,_#E9F7FF_0%,_#CDEBFF_60%,_#B8E0FF_100%)]">
      {/* white card */}
      <div className="bg-white rounded-[22px] w-full max-w-sm p-8 shadow-figma text-center relative">
        
        <h2 className="text-[#295F8D] text-[50px] mb-1">New Entry</h2>
        <h1 className="text-[45px] mb-8 text-[#37AD59]">
          INCOME
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className=" text-[#7194B3] text-[25px] mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Salary, Bonus"
              className="w-full bg-gray-50 rounded-xl px-4 py-3 text-[#000000] outline-none border-2 border-transparent focus:border-green-300 transition"
              autoFocus
            />
          </div>

          <div>
            <label className=" text-[#7194B3] text-[25px] mb-2">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-[#000000] outline-none border-2 border-transparent focus:border-green-300 transition"
              />
              <span className="absolute right-4 top-3 text-[#000000]">THB</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#37AD59] text-white py-3 rounded-2xl text-[20px] shadow-figma hover:brightness-110 transition transform active:scale-95"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="w-full bg-white border-2 border-gray-200 text-gray-500 py-3 rounded-2xl text-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddIncome