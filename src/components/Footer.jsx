import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWordpress,
} from "react-icons/fa";
import Logo from "./../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#446D9A] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <h2 className="text-xl font-bold">VitaCraft</h2>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Learn More</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">About VitaCraft</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Resume Tips</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Tools</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#">Resume Builder</a>
            </li>
            <li>
              <a href="#">Cover Letter Generator</a>
            </li>
            <li>
              <a href="#">ATS Checker</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <p className="text-sm">
            Email: <strong>support@vitacraft.com</strong>
          </p>
          <p className="text-sm">
            Phone: <strong>123-456-7890</strong>
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3 text-2xl">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaYoutube className="hover:text-gray-300 cursor-pointer" />
            <FaWordpress className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>
      <p className="text-center mt-8 text-sm border-t border-white/30 pt-4">
        © {new Date().getFullYear()} VitaCraft | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;