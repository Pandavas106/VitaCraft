import React from 'react'
import Logo from './../assets/Logo.png';  

function Nav() {
  return (
    <div className="bg-grey-500 text-black p-4 mx-7 flex justify-between items-center">
        <div className='flex gap-3 '>
            <img src={Logo} alt="Logo" className='h-10'/>
            <div className="text-2xl font-bold">VitaCraft</div>
        </div>
        <div className="space-x-8">
            <a href="/" className="hover:text-[#406B98]">Home</a>
            <a href="/about" className="hover:text-blue-500">About</a>
            <a href="/contact" className="hover:text-blue-500">Contact</a>
            <button className='bg-[#406B98] text-white text- px-4 py-2.5 font-semibold hover:text-[#406B98] hover:bg-white hover:border-1'>Log in</button>
        </div>
    </div>
  )
}

export default Nav
