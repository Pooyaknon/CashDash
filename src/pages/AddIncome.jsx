import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { transactionService } from '../services/transactionService'

function AddIncome() {
  const navigate = useNavigate()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Other') 
  const categories = ['Salary', 'Bonus', 'Gift', 'Borrow', 'Return', 'Other']
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const selectedDate = location.state?.date || new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description || !amount) return alert('Please fill in all fields')
    setLoading(true)
    try {
      // บันทึกข้อมูล โดยระบุ type เป็น 'income' เสมอ
      await transactionService.addTransaction({ description, amount: parseFloat(amount), type: 'income', category, date: selectedDate })
      navigate('/home', { state: { date: selectedDate } })// บันทึกเสร็จกลับไปหน้า Home
    } catch (error) {
      alert('Error saving income: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-lilita p-4
                    bg-[radial-gradient(circle_at_center,_#E9F7FF_0%,_#CDEBFF_60%,_#B8E0FF_100%)]
                    dark:bg-[radial-gradient(circle_at_center,_#111827_0%,_#111827_100%)]">
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-[22px] w-full max-w-sm p-8 shadow-figma text-center">
        <h2 className="text-[#295F8D] dark:text-[#FFFFFF] text-[50px] mb-1">New Entry</h2>
        <h1 className="text-[45px] mb-8 text-[#37AD59]">INCOME</h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="text-[#7194B3] dark:text-[#7194B3] text-[25px] mb-2 block">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Salary, Bonus"
              className="w-full bg-gray-50 dark:bg-[#233D58] dark:text-gray-100 dark:placeholder-gray-500 rounded-xl px-4 py-3 outline-none border-2 border-transparent focus:border-[#37AD59] transition"
              autoFocus
            />
          </div>

          <div>
            <label className="text-[#7194B3] dark:text-[#7194B3] text-[25px] mb-2 block">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-gray-50 dark:bg-[#233D58] dark:text-gray-100 dark:placeholder-gray-500 rounded-xl px-4 py-3 pr-16 outline-none border-2 border-transparent focus:border-[#37AD59] transition"
              />
              <span className="absolute right-4 top-3 text-gray-400 dark:text-[#FFFFFF]">THB</span>
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[#7194B3] dark:text-[#7194B3] text-[25px] mb-2 block">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#233D58] dark:text-gray-100 rounded-xl px-4 py-3 outline-none border-2 border-transparent focus:border-[#37AD59] transition appearance-none"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#37AD59] text-white py-3 rounded-2xl text-[20px] shadow-figma hover:brightness-110 transition active:scale-95"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="w-full bg-white dark:bg-[#1F2937] dark:border dark:border-gray-600 dark:text-[#FFFFFF] border-2 border-gray-200 text-gray-500 py-3 rounded-2xl text-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition"
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
