import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Logo from "./../assets/Logo.png";
import { useAuth } from "../context/auth_context";
import { Link } from "react-router-dom";

function Nav({ setShowPopup, setIsSignUp }) {
  const { authUser, isLoggedIn, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (isSignup) => {
    setShowPopup(true);
    setIsSignUp(isSignup);
    setIsOpen(false);
  };

  async function _logout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black p-4 z-[9999] shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <img src={Logo} alt="Logo" className="h-10" />
          <div className="text-2xl font-bold">VitaCraft</div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-[#406B98]">
            Home
          </a>
          <Link to="/templates" className="hover:text-[#406B98]">
            Templates
          </Link>
          <a href="/coverpage" className="hover:text-[#406B98]">
            Cover Page
          </a>
          <a href="/ats" className="hover:text-[#406B98]">
            ATS Checker
          </a>

          {isLoggedIn && authUser ? (
            <>
              <div className="flex items-center space-x-2 cursor-pointer">
                <FaUserCircle className="text-2xl text-[#406B98]" />
                <span className="font-semibold text-[#406B98]">
                  {authUser?.displayName || "Profile"}
                </span>
              </div>
              <button
                onClick={() => _logout()}
                className="text-sm font-medium cursor-pointer text-white px-3 py-2 bg-red-600 rounded hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick(true)}
                className="px-4 py-2 font-semibold text-[#406B98] hover:text-gray-700"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleNavClick(false)}
                className="bg-[#406B98] text-white px-4 rounded py-2.5 font-semibold hover:bg-white hover:text-[#406B98] border transition"
              >
                Log In
              </button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={handleToggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 bg-white p-4 rounded shadow-md">
          <a href="/" onClick={() => setIsOpen(false)}>
            Home
          </a>
          <a href="/templates" onClick={() => setIsOpen(false)}>
            Templates
          </a>
          <a href="/coverpage" onClick={() => setIsOpen(false)}>
            Cover Page
          </a>
          <a href="/ats" onClick={() => setIsOpen(false)}>
            ATS Checker
          </a>

          {isLoggedIn && authUser ? (
            <>
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-xl text-[#406B98]" />
                <span className="font-semibold text-[#406B98]">
                  {authUser?.displayName || "Profile"}
                </span>
              </div>
              <button
                onClick={() => {
                  _logout();
                  setIsOpen(false);
                }}
                className="text-sm font-medium cursor-pointer text-white px-3 py-2 bg-red-600 rounded hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick(true)}
                className="text-[#406B98] font-semibold"
              >
                Sign Up
              </button>
              <button
                onClick={() => handleNavClick(false)}
                className="bg-[#406B98] text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-[#406B98] border"
              >
                Log in
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
