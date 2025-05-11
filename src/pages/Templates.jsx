import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import R1 from "./../assets/Resumes/R1.jpg";
import R2 from "./../assets/Resumes/R2.jpg";
import R3 from "./../assets/Resumes/R3.jpg";
import R4 from "./../assets/Resumes/R4.jpg";
import R5 from "./../assets/Resumes/R5.jpg";
import R6 from "./../assets/Resumes/R6.jpg";
import R7 from "./../assets/Resumes/R7.jpg";
import { useNavigate } from "react-router-dom";
import { useInView, motion } from "framer-motion";

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  const navigator = useNavigate();

  const scrollContainer = (direction) => {
    const container = document.getElementById("resume-scroll");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const Template = [R1, R2, R3, R4, R5, R6, R7];
  const Templates = [R1, R2, R3];

  const navigateToLivePreview = (idx) => {
    setSelectedTemplate(idx);
    navigator("/livepreview", { state: { idx: idx } });
  };

  const sectionRef1 = useRef();
  const isInview1 = useInView(sectionRef1, { once: true, margin: "-100px" });

  const sectionRef2 = useRef();
  const isInview2 = useInView(sectionRef2, { once: true, margin: "-100px" });

  return (
    <div className="overflow-x-hidden" ref={sectionRef1}>
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={isInview1 ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="md:px-16 md:py-12 p-8 bg-[#D0F6FE] rounded-b-3xl shadow-md"
      >
        <h1 className="font-bold text-3xl md:text-5xl tracking-wide font-[Hanuman] text-[#1E293B]">
          Create Your Resume
        </h1>
        <p className="mt-3 text-gray-600 md:text-lg max-w-2xl">
          Craft a job-winning resume with our modern, ATS-friendly built for
          every profession.
        </p>

        <div className="md:my-10 my-5 relative">
          <h2 className="font-semibold text-xl text-[#1E293B] mb-4">
            Recent Templates
          </h2>

          <div className="hidden md:flex absolute right-0 top-0 gap-2">
            <button
              onClick={() => scrollContainer("left")}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll left"
            >
              <FaArrowLeft className="text-[#406B98]" />
            </button>
            <button
              onClick={() => scrollContainer("right")}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all"
              aria-label="Scroll right"
            >
              <FaArrowRight className="text-[#406B98]" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInview1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            id="resume-scroll"
            className="flex gap-6 px-10 py-5 overflow-x-auto scrollbar-thin scrollbar-thumb pb-4 scroll-smooth"
          >
            <div className="flex-shrink-0 hover:cursor-pointer transform transition-transform hover:scale-105">
              <div className="w-[220px] h-[300px] mb-3 bg-white p-4 flex border-dashed flex-col gap-3 justify-center items-center border-[3px] border-[#406B98] shadow-lg rounded-lg hover:shadow-xl transition-all">
                <div className="bg-[#ecf7fd] p-4 rounded-full">
                  <FaPlus className="text-3xl text-[#406B98]" />
                </div>
                <p className="text-center text-gray-600">Start from scratch</p>
              </div>
              <h2 className="text-[#406B98] ml-1 text-lg font-semibold">
                New Resume
              </h2>
            </div>

            {Templates.map((_, idx) => (
              <div
                className="flex-shrink-0 transform transition-transform hover:scale-105 hover:cursor-pointer"
                key={idx}
                onClick={() => navigateToLivePreview(idx)}
              >
                <div
                  className={`w-[220px] h-[300px] mb-3 flex flex-col gap-2 justify-center items-center rounded-lg shadow-lg ${
                    selectedTemplate === idx
                      ? "ring-4 ring-[#406B98]"
                      : "hover:shadow-xl"
                  } transition-all`}
                >
                  <img
                    src={Templates[idx]}
                    alt={`Resume Template ${idx + 1}`}
                    className="object-fill w-full h-full rounded-lg"
                  />
                </div>
                <h2 className="text-[#406B98] w-[220px] ml-1 text-lg font-semibold flex items-center gap-2">
                  Resume {idx + 1}
                  {selectedTemplate === idx && (
                    <span className="text-xs bg-[#406B98] text-white px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </h2>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="min-h-screen md:px-12 md:py-16 py-10">
        <motion.div
          ref={sectionRef2}
          initial={{ opacity: 0, x: 60 }}
          animate={isInview2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="px-8  mb-9 md:p-0"
        >
          <h1 className="text-3xl md:text-5xl font-bold font-[Hanuman] tracking-wide text-[#1E293B] mb-1">
            Resume Templates
          </h1>
          <h2 className="mt-3 text-gray-600 md:text-lg max-w-2xl">
            A great job starts with a great resume.
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInview2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-4 xl:grid-cols-5 gap-12"
        >
          {Template.map((_, idx) => (
            <div
              className="cursor-pointer transform transition-transform hover:scale-105"
              key={idx}
              onClick={() => navigateToLivePreview(idx)}
            >
              <div className="w-full h-full mb-2 flex flex-col gap-2 justify-center items-center rounded-md shadow-md bg-white">
                <img
                  src={Template[idx]}
                  alt={`Resume Template ${idx + 1}`}
                  className="w-full h-full object-fill rounded"
                />
              </div>
              <h2 className="text-[#406B98] text-center text-lg font-semibold">
                Resume {idx + 1}
              </h2>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Templates;
