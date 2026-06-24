import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-0 px-4 sm:px-4 font-medium bg-white shadow-sm mb-0'>
        <img src={assets.logo2} className='w-20 sm:w-28 md:w-32 lg:w-40 h-auto object-contain' alt="Logo" />
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm hover:bg-gray-700 transition-colors'>Logout</button>
    </div>
  )
}

export default Navbar
