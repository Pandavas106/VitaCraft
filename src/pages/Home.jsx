import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SignIn from "./SignIn";
import MainP from "./../assets/MainP.png"
import ATS_Score from "./../assets/ATS_Score.png"
import CatTemp from "./../assets/CatTemp.png"
import D1 from "./../assets/D1.png"
import D2 from "./../assets/D2.png"
import Templates from "./../assets/Templates.png"
import Logo from './../assets/Logo.png';  
import CoverPageCard from "../components/CoverPageCard";
import ATS from "./../assets/ATS.png";
import { FaPlus,FaMinus } from "react-icons/fa";
import {faqs} from './../../FAQs'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWordpress } from "react-icons/fa";


function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";

    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <Nav setShowPopup={setShowPopup} setIsSignUp={setIsSignUp} />
      {showPopup && <SignIn setShowPopup={setShowPopup} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />}
      <div className="bg-[#D0F6FE] h-screen flex justify-evenly mt-15 items-center">
      <img src={D1} alt="" className="h-17 w-17 absolute top-60 -left-2 m-4" />
      <img src={D2} alt="" className="h-45 w-60 absolute top-13 -right-38 m-4" />
        <div>
          <div className="text-5xl text-black font-[Hanuman] mb-4 font-bold tracking-wide">
            Create Your Perfect Resume in <br /> Minutes
          </div>
          <div className="text-[27px] text-black font-[Hanuman] mb-6 tracking-wider">
            Design a professional resume that stands out with <br /> ease — no experience needed
          </div>
          <button className='bg-[#406B98] font-[Inter] text-white px-5 mb-20 tracking-wide py-3 rounded text-[19px] font-semibold hover:cursor-pointer'>Create My Resume</button>
          <div className="flex gap-20">
            <div className="flex gap-5">
              <img src={ATS_Score} alt="ATS Score" className="h-18 w-24" />
              <div className="text-2xl mt-1 tracking-wide font-normal">ATS Score <br /> Checker</div>
            </div>
            <div className="flex gap-3">
              <img src={CatTemp} alt="Cat_Temp" className="-top-2 h-24 w-26" />
              <div className="text-2xl mt-1 tracking-wide font-normal">Categorical <br /> Templates</div>
            </div>
          </div>
        </div>
        <img src={MainP} alt="Resume" className='h-150 w-125'/>
      </div>
      {/*Templates*/}
      <div className="bg-white pt-12 flex justify-evenly items-center">
          <img src={Templates} alt="" className="h-140 w-150  "/>
          <div>
            <div className="text-4xl font-bold font-[Hanuman] mb-4">Pick Your Perfect Resume Template!</div>
            <div className="text-2xl font-[Hanuman] tracking-wide mb-10">Stand out with a resume that speaks for you! Choose <br /> from our sleek, modern, and professional templates <br /> to land your dream job.</div>
            <button className='bg-[#406B98] font-[Inter] text-white px-5 mb-10 tracking-wide py-3 rounded text-[19px] font-semibold hover:cursor-pointer'>Browse Templates</button>
          </div>
      </div>
      {/*Cover Pages*/}
      <div className="bg-[#446D9A]">
        <h1 className="px-10 mb-3 pt-10 text-5xl font-[Hanuman] tracking-wide font-bold text-[#EBF4F6]">Cover Pages</h1>
        <h1 className="px-10 text-3xl text-[#EBF4F6] font-[Hanuman] tracking-wide">Design a Cover Page That Stands Out!</h1>
        <div>
          <CoverPageCard/>
        </div>
      </div>
      {/*ATS Score*/}
      <div className="p-15 flex justify-between items-center">
        <div>
          <div className="text-4xl tracking-wide mb-5 font-bold font-[Hanuman] ">ATS Score Checker – Get Hired Faster!</div>
          <div className="text-[27px] tracking-wide mb-5 font-[Hanuman] ">Make sure your resume passes the ATS test! Get an instant <br /> score and expert tips to improve your chances.</div>
          <div className="ml-5">
            <p className="text-2xl flex items-center mb-2">
              <span>✅ Job Match Score: Compares your resume against the job <br /> description for relevance.</span>
            </p> 
            <p className="text-2xl flex items-center mb-2">
              <span>✅ Keyword Optimization: Ensures your resume includes <br /> important job-specific keywords.</span>
            </p> 
            <p className="text-2xl flex items-center mb-2">
              <span>✅ Clear Section Headings: Ensures sections like "Work <br /> Experience" and "Skills" are ATS-friendly.</span>
            </p> 
            <p className="text-2xl flex items-center mb-2">
              <span>✅ File Compatibility: Checks if your resume is in ATS-friendly <br /> formats (.docx, .pdf).</span>
            </p> 
            <p className="text-2xl flex items-center mb-7">
              <span>✅ Bullet Point Readability: Makes sure content is structured for <br /> easy ATS scanning.</span>
            </p>
          </div>
          <button className='bg-[#406B98] font-[Inter] text-white px-5 mb-10 tracking-wide py-3 rounded text-[19px] font-semibold hover:cursor-pointer'>Check ATS Score</button>
        </div>
        <img src={ATS} alt="" className="h-140 w-140" />
      </div>
      {/*FAQ*/}
      <div className="bg-[#D0F6FE] p-15">
        <div className="text-5xl font-[Hanuman] tracking-wide font-bold">Frequently asked questions (FAQ'S)</div>
        <div className="px-15 pt-15">
        {faqs.map((faq, index) => (
          <div key={index} className="p-2 bg-white shadow-md mb-4">
            {/* FAQ Header */}
            <div
              className="text-xl flex justify-between items-center font-semibold p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <FaMinus size={20} /> : <FaPlus size={20} />}
            </div>

            {/* FAQ Answer (Toggles on Click) */}
            {openIndex === index && (
              <div className="p-4 text-gray-700 text-lg">{faq.answer}</div>
            )}
          </div>
        ))}
        </div>
      </div>
      <footer className="bg-[#446D9A] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <h2 className="text-xl font-bold">VitaCraft</h2>
        </div>

        {/* Learn More */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Learn More</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About Lift</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
            <li><a href="#" className="hover:underline">Environment</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Tickets & Booking */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Tickets & Booking</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Lift Tickets</a></li>
            <li><a href="#" className="hover:underline">Season Passes</a></li>
            <li><a href="#" className="hover:underline">Vacation Packages</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Hotel Reservation: <span className="font-semibold">123-456-7890</span></p>
          <p>Ticket Office: <span className="font-semibold">123-456-7890</span></p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Social</h3>
          <div className="flex gap-4">
            <FaFacebookF className="text-2xl cursor-pointer hover:text-gray-300" />
            <FaInstagram className="text-2xl cursor-pointer hover:text-gray-300" />
            <FaTwitter className="text-2xl cursor-pointer hover:text-gray-300" />
            <FaYoutube className="text-2xl cursor-pointer hover:text-gray-300" />
            <FaWordpress className="text-2xl cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-sm border-t border-white/50 pt-4">
        © 2019 Lift Media | All Rights Reserved
      </div>
    </footer>
    </div>
  );
}

export default Home;
