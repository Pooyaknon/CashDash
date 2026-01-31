import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [username, setUsername] = useState('Loading...')
  const navigate = useNavigate()

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single()

        if (data) setUsername(data.username)
      } else {
        navigate('/login')
      }
    }
    getProfile()
  }, [navigate])

  const handleLogout = async () => {
    await authService.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#D1E9FF] flex flex-col items-center font-sans pb-10">
      {/* Header Section */}
      <div className="w-full max-w-md p-6 flex justify-between items-center">
        <button className="text-[#2D5A8E]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="bg-white rounded-full px-4 py-1 flex items-center shadow-sm border border-gray-100">
          <span className="text-[#2D5A8E] font-bold text-sm">More Date</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-[#2D5A8E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Welcome Message */}
      <h2 className="text-[#2D5A8E] font-black text-xl uppercase mb-4">
        WELCOME, {username}
      </h2>

      {/* Today's Balance Card */}
      <div className="bg-white rounded-[40px] w-[90%] max-w-sm p-8 shadow-xl text-center mb-8 border-[6px] border-white">
        <h3 className="text-[#2D5A8E] font-bold text-xl mb-2">Today's balance</h3>
        <p className="text-[#E55C5C] text-5xl font-black italic tracking-tighter">
          -111,000 THB
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="bg-[#4CAF50] text-white px-6 py-2 rounded-2xl font-black flex items-center shadow-lg hover:scale-105 transition">
          <span className="text-2xl mr-2">+</span> INCOME
        </button>
        <button className="bg-[#E55C5C] text-white px-6 py-2 rounded-2xl font-black flex items-center shadow-lg hover:scale-105 transition">
          <span className="text-2xl mr-2">-</span> EXPENSE
        </button>
      </div>

      {/* Transaction List Container */}
      <div className="bg-white rounded-[35px] w-[90%] max-w-sm p-6 shadow-lg">
        <div className="space-y-5">
          {[
            { name: 'Mama', amount: '-20 THB', color: 'text-[#E55C5C]' },
            { name: 'Car', amount: '-820,999 THB', color: 'text-[#E55C5C]' },
            { name: 'Ice cream', amount: '-20 THB', color: 'text-[#E55C5C]' },
            { name: 'Salary', amount: '+900,000 THB', color: 'text-[#4CAF50]' },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="font-bold text-lg">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg ${item.color}`}>{item.amount}</span>
                <button className="text-gray-300 hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Link */}
      <button 
        onClick={handleLogout}
        className="mt-10 text-[#E55C5C] font-bold underline hover:text-red-700"
      >
        LOG OUT
      </button>
    </div>
  )
}

export default Home