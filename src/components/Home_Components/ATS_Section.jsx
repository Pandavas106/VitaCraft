import React, { useRef } from "react";
import ATS from "../../assets/ATS.png";
import { useInView, motion } from "framer-motion";

const ATSScoreSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <div
      ref={sectionRef}
      className="bg-white px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="space-y-4 max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-[Hanuman]">
          ATS Score Checker – Get Hired Faster!
        </h2>
        <p className="text-lg md:text-2xl font-[Hanuman]">
          Make sure your resume passes the ATS test! Get an instant score and
          expert tips to improve your chances.
        </p>
        <ul className="space-y-3 pl-5 text-left list-disc text-lg">
          <li>
            ✅ Job Match Score: Compares your resume against the job description
            for relevance.
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
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        src={ATS}
        alt="ATS"
        className="w-full max-w-sm object-contain"
      />
    </div>
  );
};
export default ATSScoreSection;
