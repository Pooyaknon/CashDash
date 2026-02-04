import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import Home from './pages/Home'
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
        
        {/* หน้า Home */}
        <Route path="/home" element={<Home />} />
      </Routes>
      </>
      
  )
}

export default App