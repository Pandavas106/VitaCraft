import React, { useRef } from "react";
import Templates from "../../assets/Templates.png";
import { useInView, motion } from "framer-motion";

function TemplateSection() {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  return (
    <div className="bg-white px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-center gap-10">
      <motion.img
        ref={sectionRef}
        initial={{ y: -60, opacity: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        src={Templates}
        alt=""
        className="w-full max-w-lg object-contain"
      />
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center md:text-left space-y-6"
      >
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
      </motion.div>
    </div>
  );
}

export default TemplateSection;
