import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="header image" className='w-36 h-36 rounded-full mb-6' />
      <h1 className='text-xl sm:text-3xl font-medium mb-2'>Hey <span className='text-indigo-800/90 font-mono text-shadow-sm  text-shadow-indigo-300/90'>Developer</span></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
      <p className='mb-8 max-w-md'>Let's start with a quick tour and we will have you up and running in no time!</p>
      <button className='border-1 border-gray-400/90 rounded-full px-8 py-3 hover:bg-gray-200/90 transition-all duration-500 ease-in-out'>
        Get Started
      </button>
    </div>
  )
}

export default Header
