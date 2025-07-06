import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home,
        Login,
        EmailVerify,
        ResetPassword,
} from './context/clientPageRoute'

const App = () => {
  return (
    <div>
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
