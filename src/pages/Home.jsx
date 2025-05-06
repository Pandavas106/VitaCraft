import React, { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import SignIn from "./SignIn";
import HeroSection from "../components/Home_Components/Hero_section";
import TemplateSection from "../components/Home_Components/Template_Section";
import CoverPageSection from "../components/Home_Components/Coverpage_Section";
import ATSScoreSection from "../components/Home_Components/ATS_Section";
import FAQSection from "../components/Home_Components/FAQ_Section";
import Footer from "../components/Footer";

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
    <div className="overflow-x-hidden mt-16">
      <Nav setShowPopup={setShowPopup} setIsSignUp={setIsSignUp} />
      {showPopup && (
        <SignIn
          setShowPopup={setShowPopup}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      )}
      <HeroSection />
      <TemplateSection />
      <CoverPageSection/>
      <ATSScoreSection/>
      <FAQSection/>
      <Footer/>
    </div>
  );
}

export default Home;
