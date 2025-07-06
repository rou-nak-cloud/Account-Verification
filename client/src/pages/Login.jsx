import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-1 bg-gradient-to-br from-blue-200/90 to bg-purple-400/60'>
      <img src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900/95 p-10 rounded-lg shadow-md w-full sm:w-96 text-indigo-300 text-sm'>
        <h2 className='text-3xl font-semibold text-white text-center mb-1'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='text-sm font-light text-center mb-6'>{state === 'Sign Up' ? 'Create your Account' : 'Login to your account!'}</p>

          <form action="#"
          >
            {state === 'Sign Up' && ( 
              <div className='mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-3xl bg-[#333A6C]'>
              <img src={assets.person_icon} alt="input logo" />
              <input type="text" placeholder='Full Name' required 
              className='bg-transparent outline-none text-white' />
            </div>
            )}
           
            <div className='mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-3xl bg-[#333A6C]'>
              <img src={assets.mail_icon} alt="input logo" />
              <input type="email" placeholder='Your Email' required 
              className='bg-transparent outline-none text-white' />
            </div>
            <div className='mb-4 flex items-center gap-3 w-full px-4 py-2 rounded-3xl bg-[#333A6C]'>
              <img src={assets.lock_icon} alt="input logo" />
              <input type="password" placeholder='Password' required 
              className='bg-transparent outline-none text-white' />
            </div>

            <p className='text-xs pl-2 underline underline-offset-2 mb-4'>Forget your password?</p>
            <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500/90 to-indigo-800/90 text-gray-200 font-medium cursor-pointer hover:text-gray-400 transition-all duration-300 ease-in'>
              {state}
            </button>
          </form>

            {state === 'Sign Up' ? ( 
              <p className='text-gray-400 text-center text-sm mt-4'>Already have an account?{' '}
            <span 
            onClick={() => setState('Login')}
            className='text-blue-600/90 cursor-pointer underline underline-offset-2 hover:text-blue-600'>Login here</span>
          </p>
        ) : (
            <p className='text-gray-400 text-center text-sm mt-3'>Don't have an account?{' '}
            <span 
            onClick={() => setState('Sign Up')}
            className='text-blue-600/90 cursor-pointer underline underline-offset-2 hover:text-blue-600'>SignUp here</span>
          </p>
        )}
         
      </div>
    </div>
  )
}

export default Login
