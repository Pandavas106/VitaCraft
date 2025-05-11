import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import Logo from "./../assets/Logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaFileAlt,
  FaClipboard,
  FaCheckCircle,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";

function Nav({ setShowPopup, setIsSignUp }) {
  const { authUser, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScrollRef = useRef(0);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAuthPopup = (isSignup) => {
    setShowPopup(true);
    setIsSignUp(isSignup);
    setIsOpen(false);
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setVisible(prevScrollRef.current > currentScroll || currentScroll < 10);
    prevScrollRef.current = currentScroll;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function _logout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/templates", label: "Templates", icon: <FaFileAlt /> },
    { to: "/coverpage", label: "Cover Page", icon: <FaClipboard /> },
    { to: "/ats", label: "ATS Checker", icon: <FaCheckCircle /> },
  ];

  const getLinkClass = (path) =>
    `flex items-center gap-2 font-medium transition ${
      location.pathname === path
        ? "text-[#406B98] font-semibold"
        : "text-gray-700 hover:text-[#406B98]"
    }`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-full bg-white shadow-md z-[9999]"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 ml-[-10px]">
              <img src={Logo} alt="Logo" className="h-10" />
              <span className="text-xl font-bold text-[#406B98]">
                VitaCraft
              </span>
            </Link>

            <div className="hidden md:flex gap-8 items-center pl-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={getLinkClass(link.to)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              {isLoggedIn && authUser ? (
                <>
                  <div className="flex items-center gap-2 text-[#406B98] font-semibold">
                    <FaUserCircle className="text-xl" />
                    <Link to="/profile" className={getLinkClass("/profile")}>
                      {authUser?.displayName || "Profile"}
                    </Link>
                  </div>
                  <button
                    onClick={_logout}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthPopup(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#406B98] hover:text-gray-600 transition"
                  >
                    <FaUserPlus className="text-lg" />
                    Sign Up
                  </button>
                  <button
                    onClick={() => handleAuthPopup(false)}
                    className="flex items-center gap-2 bg-[#406B98] text-white px-4 py-2 rounded hover:bg-[#325577] transition font-medium"
                  >
                    <FaSignInAlt className="text-lg" />
                    Log In
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden bg-white px-6 py-4 space-y-4 border-t"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={getLinkClass(link.to)}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                {isLoggedIn && authUser ? (
                  <>
                    <div className="flex items-center gap-2 text-[#406B98] font-medium">
                      <FaUserCircle className="text-xl" />
                      {authUser?.displayName || "Profile"}
                    </div>
                    <button
                      onClick={() => {
                        _logout();
                        setIsOpen(false);
                      }}
                      className="w-full py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAuthPopup(true)}
                      className="flex items-center justify-center gap-2 w-full text-[#406B98] py-2 border rounded hover:bg-[#f5f7fa]"
                    >
                      <FaUserPlus />
                      Sign Up
                    </button>
                    <button
                      onClick={() => handleAuthPopup(false)}
                      className="flex items-center justify-center gap-2 w-full bg-[#406B98] text-white py-2 rounded hover:bg-[#325577]"
                    >
                      <FaSignInAlt />
                      Log In
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default Nav;
