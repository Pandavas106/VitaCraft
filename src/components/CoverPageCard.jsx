import React, { useRef } from "react";
import CP1 from "./../assets/CP1.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CL1 from "./../assets/Cover_Letters/CL1.jpg";
import CL2 from "./../assets/Cover_Letters/CL2.jpg";
import CL3 from "./../assets/Cover_Letters/CL3.jpg";
import CL4 from "./../assets/Cover_Letters/CL4.jpg";
import CL5 from "./../assets/Cover_Letters/CL5.jpg";
import CoverLetter from "./../pages/CoverLetter";
import { useNavigate } from "react-router-dom";

function CoverPageCard() {
  const scrollRef = useRef(null);
  const navigator = useNavigate();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const navigateToCoverLetterGen = (idx) => {
    navigator(`/coverLetterGenerator/${idx}`);
  };
  const coverLetters = [CL1, CL2, CL3, CL4, CL5];
  return (
    <div className="relative">
      <div className="hidden md:flex absolute top-[-45px] right-4 z-10 gap-2">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-white/30 hover:bg-white/40 text-white rounded-full shadow"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-white/30 hover:bg-white/40 text-white rounded-full shadow"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-1 md:gap-10 items-center px-4 py-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-smooth"
      >
        {coverLetters.map((_, idx) => (
          <div
            onClick={() => {
              navigateToCoverLetterGen(idx);
            }}
            key={idx}
            className="flex-shrink-0 hover:cursor-pointer w-64 md:w-72"
          >
            <div>
              <img
                src={coverLetters[idx]}
                alt={`Cover Page ${idx + 1}`}
                className="w-50 md:w-full object-cover rounded shadow"
              />
              <div className="mt-2 w-50 md:w-full font-[Hanuman] text-base md:text-lg tracking-wider text-[#EBF4F6]">
                CoverLetter {idx + 1}
              </div>
            </div>
          </div>
        ))}

        <a href="#" className="flex-shrink-0">
          <div onClick={()=>navigator('/coverpage')} className="text-lg md:text-xl text-[#EBF4F6] px-4 py-10 w-64 md:w-72 flex items-center justify-center hover:text-[#dcecf0] transition">
            View More <FaArrowRight size={22} className="ml-2" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default CoverPageCard;
