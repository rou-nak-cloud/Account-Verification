import React from 'react'
import { Route, Routes } from 'react-router-dom'
 import { ToastContainer } from 'react-toastify';

import { Home,
        Login,
        EmailVerify,
        ResetPassword,
} from './context/clientPageRoute'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
