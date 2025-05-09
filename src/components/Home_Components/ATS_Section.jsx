import React, { useRef } from "react";
import ATS from "../../assets/ATS.png";
import { useInView, motion } from "framer-motion";

const ATSScoreSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <div
      ref={sectionRef}
      className="bg-white px-8 lg:px-24 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-16"
    >
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="space-y-6 max-w-2xl"
      >
        <h2 className="text-4xl lg:text-5xl font-bold font-[Hanuman] leading-tight">
          ATS Score Checker - Get Hired Faster!
        </h2>
        <p className="text-xl lg:text-2xl font-[Hanuman] text-gray-700">
          Make sure your resume passes the ATS test! Get an instant score and
          expert tips to improve your chances.
        </p>
        <ul className="space-y-4 pl-6 text-left list-disc text-lg text-gray-800">
          <li>
            ✅ <strong>Job Match Score:</strong> Compares your resume against
            the job description for relevance.
          </li>
          <li>
            ✅ <strong>Keyword Optimization:</strong> Ensures your resume
            includes important job-specific keywords.
          </li>
          <li>
            ✅ <strong>Clear Section Headings:</strong> Ensures sections like
            "Work Experience" and "Skills" are ATS-friendly.
          </li>
          <li>
            ✅ <strong>File Compatibility:</strong> Checks if your resume is in
            ATS-friendly formats (.docx, .pdf).
          </li>
          <li>
            ✅ <strong>Bullet Point Readability:</strong> Makes sure content is
            structured for easy ATS scanning.
          </li>
        </ul>
        <button className="bg-[#406B98] hover:bg-[#305377] transition-colors text-white px-8 py-4 rounded-lg text-lg font-semibold mt-6 shadow-md">
          Check ATS Score
        </button>
      </motion.div>
      <motion.img
        initial={{ opacity: 0, x: 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        src={ATS}
        alt="ATS Preview"
        className="w-full max-w-md object-contain"
      />
    </div>
  );
};
export default ATSScoreSection;
