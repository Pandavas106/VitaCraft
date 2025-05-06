import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CoverPageCard from "../CoverPageCard";

const CoverPageSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div
      ref={sectionRef}
      className="bg-[#446D9A] px-6 py-12 text-white overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold font-[Hanuman] mb-2"
      >
        Cover Pages
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg md:text-2xl font-[Hanuman] mb-6"
      >
        Design a Cover Page That Stands Out!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <CoverPageCard />
      </motion.div>
    </div>
  );
};

export default CoverPageSection;
