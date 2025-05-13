import React, { useEffect } from "react";
import HeroSection from "../components/Home_Components/Hero_section";
import TemplateSection from "../components/Home_Components/Template_Section";
import CoverPageSection from "../components/Home_Components/Coverpage_Section";
import ATSScoreSection from "../components/Home_Components/ATS_Section";
import FAQSection from "../components/Home_Components/FAQ_Section";

function Home({setShowPopup,setIsSignUp}) {
  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <HeroSection setIsSignUp={setIsSignUp} setShowPopup={setShowPopup} />
      <TemplateSection />
      <CoverPageSection />
      <ATSScoreSection />
      <FAQSection />
    </div>
  );
}

export default Home;
