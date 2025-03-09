  import React from 'react'
  import Logo from './../assets/Logo.png';  

  function Nav({setShowPopup,setIsSignUp}) {
    return (
      <div className="fixed top-0 left-0 w-full bg-white text-black p-4 flex justify-between items-center z-50">

          <div className='flex gap-2 ml-4'>
              <img src={Logo} alt="Logo" className='h-10'/>
              <div className="text-2xl font-bold">VitaCraft</div>
          </div>
          <div className="space-x-6">
              <a href="/" className="hover:text-[#406B98]">Home</a>
              <a href="/templates" className="hover:text-[#406B98]">Templates</a>
              <a href="/coverpage" className="hover:text-[#406B98]">Cover Page</a>
              <a href="/ats" className="hover:text-[#406B98]">ATS Checker</a>
              <button onClick={()=>{setShowPopup(true);setIsSignUp(true)}} className='px-2 py-2 font-semibold text-[#406B98] tracking-wide hover:text-gray-700 hover:cursor-pointer'>Sign Up</button>
              <button onClick={()=>{setShowPopup(true);setIsSignUp(false)}} className='bg-[#406B98] text-white px-4 rounded ho hover:rounded tracking-wide py-2.5 text-[17px] font-semibold hover:text-[#406B98] hover:cursor-pointer hover:bg-white hover:border-1'>Log in</button>
          </div>
      </div>
    )
  }

  export default Nav
