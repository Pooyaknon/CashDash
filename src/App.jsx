import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import AddIncome from './pages/AddIncome'
import AddExpense from './pages/AddExpense'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
      <>
        {/* Toast notification (global) */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: '#ffffff',
              color: '#1f2937',
            },
          }}
        />

      <Routes>
        {/* หน้าแรกไปที่ Login*/}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        
        {/* ถ้าไม่ login จะเข้าไม่ได้ */}
        <Route element={<ProtectedRoute />}> 
          {/* หน้า Home */}
          <Route path="/home" element={<Home />} />
          {/* หน้า Add income & expense */}
          <Route path="/add-income" element={<AddIncome />} />   
          <Route path="/add-expense" element={<AddExpense />} /> 
        </Route>
      </Routes>
      </>
      
  )
}

export default App