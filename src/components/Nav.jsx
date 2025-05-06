import React, { useState, useEffect } from 'react';
import {
  FaBars,
  FaTimes,
  FaHome,
  FaFileAlt,
  FaClipboardList,
  FaSignInAlt,
  FaUserPlus,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import Logo from './../assets/Logo.png';
import { motion, AnimatePresence } from 'framer-motion';

function Nav({ setShowPopup, setIsSignUp }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (isSignup) => {
    setShowPopup(true);
    setIsSignUp(isSignup);
    setIsOpen(false);
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setVisible(prevScroll > currentScroll || currentScroll < 10);
    setPrevScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full bg-white text-black px-4 md:px-8 py-3 z-[9999] shadow-md"
        >
          <div className="w-full flex items-center">
            {/* Logo on far left */}
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-10" />
              <div className="text-2xl font-bold">VitaCraft</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 ml-auto">
              <a href="/" className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaHome /> Home
              </a>
              <a href="/templates" className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaFileAlt /> Templates
              </a>
              <a href="/coverpage" className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaClipboardList /> Cover Page
              </a>
              <a href="/ats" className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaClipboardList /> ATS Checker
              </a>
              <button
                onClick={() => handleNavClick(true)}
                className="flex items-center gap-2 px-2 py-2 font-semibold text-[#406B98] dark:text-blue-300 hover:text-gray-700"
              >
                <FaUserPlus /> Sign Up
              </button>
              <button
                onClick={() => handleNavClick(false)}
                className="flex items-center gap-2 bg-[#406B98] text-white px-4 py-2.5 rounded text-[17px] font-semibold hover:text-[#406B98] hover:bg-white border hover:border-[#406B98] dark:border-white dark:hover:bg-transparent dark:hover:text-white transition"
              >
                <FaSignInAlt /> Log in
              </button>
            </div>

            {/* Hamburger Menu (Mobile) */}
            <div className="md:hidden flex items-center gap-4 ml-auto">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <FaSun className="text-yellow-300" /> : <FaMoon />}
              </button>
              <button onClick={handleToggleMenu}>
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden mt-4 flex flex-col space-y-6 bg-white dark:bg-gray-800 p-4 rounded shadow-md"
            >
              <a href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaHome /> Home
              </a>
              <a href="/templates" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaFileAlt /> Templates
              </a>
              <a href="/coverpage" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaClipboardList /> Cover Page
              </a>
              <a href="/ats" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-[#406B98] dark:hover:text-blue-300">
                <FaClipboardList /> ATS Checker
              </a>
              <button onClick={() => handleNavClick(true)} className="flex items-center gap-2 text-[#406B98] font-semibold dark:text-blue-300">
                <FaUserPlus /> Sign Up
              </button>
              <button onClick={() => handleNavClick(false)} className="flex items-center gap-2 bg-[#406B98] text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-[#406B98] dark:border-white dark:hover:bg-transparent dark:hover:text-white border hover:border-[#406B98] transition">
                <FaSignInAlt /> Log in
              </button>
            </motion.div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Nav;
