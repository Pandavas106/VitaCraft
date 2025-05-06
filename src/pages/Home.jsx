import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import SignIn from "./SignIn";
import MainP from "./../assets/MainP.png";
import ATS_Score from "./../assets/ATS_Score.png";
import CatTemp from "./../assets/CatTemp.png";
import D1 from "./../assets/D1.png";
import D2 from "./../assets/D2.png";
import Templates from "./../assets/Templates.png";
import Logo from "./../assets/Logo.png";
import CoverPageCard from "../components/CoverPageCard";
import ATS from "./../assets/ATS.png";
import { FaPlus, FaMinus } from "react-icons/fa";
import { faqs } from "./../../FAQs";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWordpress,
} from "react-icons/fa";



function Home() {
  
  const [showPopup, setShowPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
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
    <div className="overflow-x-hidden mt-19">
      <Nav
        setShowPopup={setShowPopup}
        setIsSignUp={setIsSignUp}
      />
      {showPopup && (
        <SignIn
          setShowPopup={setShowPopup}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      )}

      {/* Hero Section */}
      <div className="bg-[#D0F6FE] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 relative">
        <img
          src={D1}
          alt=""
          className="h-16 w-16 absolute top-20 left-2 hidden md:block"
        />
        <img
          src={D2}
          alt=""
          className="h-32 w-40 absolute top-10 right-2 hidden md:block"
        />

        <div className="text-center lg:text-left max-w-xl space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-wide font-[Hanuman] text-black">
            Create Your Perfect Resume in <br className="hidden md:block" />{" "}
            Minutes
          </h1>
          <p className="text-lg md:text-2xl font-[Hanuman] text-black tracking-wider">
            Design a professional resume that stands out with ease — no
            experience needed
          </p>
          <button className="bg-[#406B98] text-white px-6 py-3 rounded text-base md:text-lg font-semibold">
            Create My Resume
          </button>

          <div className="flex flex-col sm:flex-row gap-10 items-center justify-center lg:justify-start mt-6">
            <div className="flex items-center gap-4">
              <img
                src={ATS_Score}
                alt="ATS Score"
                className="h-16 w-20 object-contain"
              />
              <p className="text-xl font-normal">
                ATS Score <br /> Checker
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={CatTemp}
                alt="Cat Temp"
                className="h-20 w-20 object-contain"
              />
              <p className="text-xl font-normal">
                Categorical <br /> Templates
              </p>
            </div>
          </div>
        </div>

        <img
          src={MainP}
          alt="Resume"
          className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain mt-10 lg:mt-0"
        />
      </div>

      {/* Template Section */}
      <div className="bg-white px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-center gap-10">
        <img
          src={Templates}
          alt=""
          className="w-full max-w-lg object-contain"
        />
        <div className="text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-[Hanuman]">
            Pick Your Perfect Resume Template!
          </h2>
          <p className="text-lg md:text-2xl font-[Hanuman] tracking-wide">
            Stand out with a resume that speaks for you! Choose from our sleek,
            modern, and professional templates to land your dream job.
          </p>
          <button className="bg-[#406B98] text-white px-6 py-3 rounded text-base md:text-lg font-semibold">
            Browse Templates
          </button>
        </div>
      </div>

      {/* Cover Page Section */}
      <div className="bg-[#446D9A] px-6 py-12 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold font-[Hanuman] mb-2">
          Cover Pages
        </h2>
        <p className="text-lg md:text-2xl font-[Hanuman] mb-6">
          Design a Cover Page That Stands Out!
        </p>
        <CoverPageCard />
      </div>

      {/* ATS Score Checker Section */}
      <div className="bg-white px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold font-[Hanuman]">
            ATS Score Checker – Get Hired Faster!
          </h2>
          <p className="text-lg md:text-2xl font-[Hanuman]">
            Make sure your resume passes the ATS test! Get an instant score and
            expert tips to improve your chances.
          </p>
          <ul className="space-y-3 pl-5 text-left list-disc text-lg">
            <li>
              ✅ Job Match Score: Compares your resume against the job
              description for relevance.
            </li>
            <li>
              ✅ Keyword Optimization: Ensures your resume includes important
              job-specific keywords.
            </li>
            <li>
              ✅ Clear Section Headings: Ensures sections like "Work Experience"
              and "Skills" are ATS-friendly.
            </li>
            <li>
              ✅ File Compatibility: Checks if your resume is in ATS-friendly
              formats (.docx, .pdf).
            </li>
            <li>
              ✅ Bullet Point Readability: Makes sure content is structured for
              easy ATS scanning.
            </li>
          </ul>
          <button className="bg-[#406B98] text-white px-6 py-3 rounded text-base md:text-lg font-semibold mt-4">
            Check ATS Score
          </button>
        </div>
        <img src={ATS} alt="ATS" className="w-full max-w-sm object-contain" />
      </div>

      {/* FAQ Section */}
      <div className="bg-[#D0F6FE] px-6 py-12">
        <h2 className="text-3xl md:text-5xl font-bold font-[Hanuman] mb-6">
          Frequently Asked Questions (FAQ'S)
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <div
                className="flex justify-between items-center cursor-pointer font-semibold text-lg md:text-xl"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <FaMinus size={18} />
                ) : (
                  <FaPlus size={18} />
                )}
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-700 text-base md:text-lg">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
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
                <a href="#">About Lift</a>
              </li>
              <li>
                <a href="#">Press Releases</a>
              </li>
              <li>
                <a href="#">Environment</a>
              </li>
              <li>
                <a href="#">Jobs</a>
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
            <h3 className="font-semibold mb-2">Tickets & Booking</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#">Lift Tickets</a>
              </li>
              <li>
                <a href="#">Season Passes</a>
              </li>
              <li>
                <a href="#">Vacation Packages</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              Hotel Reservation: <strong>123-456-7890</strong>
            </p>
            <p className="text-sm">
              Ticket Office: <strong>123-456-7890</strong>
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Social</h3>
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
          © 2019 Lift Media | All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default Home;
