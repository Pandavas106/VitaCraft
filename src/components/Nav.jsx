import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from './../assets/Logo.png';

function Nav({ setShowPopup, setIsSignUp }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (isSignup) => {
    setShowPopup(true);
    setIsSignUp(isSignup);
    setIsOpen(false); // close mobile menu
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 z-[9999] shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <img src={Logo} alt="Logo" className="h-10" />
          <div className="text-2xl font-bold">VitaCraft</div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-[#406B98]">Home</a>
          <a href="/templates" className="hover:text-[#406B98]">Templates</a>
          <a href="/coverpage" className="hover:text-[#406B98]">Cover Page</a>
          <a href="/ats" className="hover:text-[#406B98]">ATS Checker</a>
          <button onClick={() => handleNavClick(true)} className="px-2 py-2 font-semibold text-[#406B98] tracking-wide hover:text-gray-700">
            Sign Up
          </button>
          <button onClick={() => handleNavClick(false)} className="bg-[#406B98] text-white px-4 rounded py-2.5 text-[17px] font-semibold hover:text-[#406B98] hover:bg-white border hover:border-[#406B98] transition">
            Log in
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={handleToggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 bg-white p-4 rounded shadow-md">
          <a href="/" onClick={() => setIsOpen(false)} className="hover:text-[#406B98]">Home</a>
          <a href="/templates" onClick={() => setIsOpen(false)} className="hover:text-[#406B98]">Templates</a>
          <a href="/coverpage" onClick={() => setIsOpen(false)} className="hover:text-[#406B98]">Cover Page</a>
          <a href="/ats" onClick={() => setIsOpen(false)} className="hover:text-[#406B98]">ATS Checker</a>
          <button onClick={() => handleNavClick(true)} className="text-[#406B98] font-semibold">Sign Up</button>
          <button onClick={() => handleNavClick(false)} className="bg-[#406B98] text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-[#406B98] border hover:border-[#406B98] transition">
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
