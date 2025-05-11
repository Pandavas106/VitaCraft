import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MainP from "../../assets/MainP.png";
import ATS_Score from "../../assets/ATS_Score.png";
import CatTemp from "../../assets/CatTemp.png";
import D1 from "../../assets/D1.png";
import D2 from "../../assets/D2.png";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div
      ref={sectionRef}
      className="bg-[#D0F6FE] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 relative"
    >
      <motion.img
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        src={D1}
        alt=""
        className="h-16 w-16 absolute top-20 left-2 z-[10] hidden md:block"
      />
      <motion.img
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        src={D2}
        alt=""
        className="h-32 w-40 absolute top-10 right-2 z-[10] hidden md:block"
      />
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center lg:text-left max-w-xl space-y-6"
      >
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide font-[Hanuman] text-black">
          Create Your Perfect Resume in <br className="hidden md:block" />{" "}
          Minutes
        </h1>
        <p className="text-lg md:text-2xl font-[Hanuman] text-black tracking-wider">
          Design a professional resume that stands out with ease — no experience
          needed
        </p>
        <button className="bg-[#406B98] text-white px-6 py-3 rounded text-base md:text-lg font-semibold">
          Get Started
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
        <div  className="text-xl font-bold">Note: Complete your Profile before Get Started</div>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        src={MainP}
        alt="Resume"
        className="w-full max-w-md md:max-w-lg lg:max-w-xl object-contain mt-10 lg:mt-0"
      />
    </div>
  );
};

export default HeroSection;
