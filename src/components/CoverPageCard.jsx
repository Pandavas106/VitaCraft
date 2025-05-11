import React, { useRef } from "react";
import CP1 from "./../assets/CP1.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function CoverPageCard() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
        {[...Array(5)].map((_, idx) => (
          <a href="#" key={idx} className="flex-shrink-0 w-64 md:w-72">
            <div>
              <img
                src={CP1}
                alt={`Cover Page ${idx + 1}`}
                className="w-50 md:w-full object-cover rounded shadow"
              />
              <div className="mt-2 w-50 md:w-full font-[Hanuman] text-base md:text-lg tracking-wider text-[#EBF4F6]">
                Agile & Execution driven Junior Programmer
              </div>
            </div>
          </a>
        ))}

        <a href="#" className="flex-shrink-0">
          <div className="text-lg md:text-xl text-[#EBF4F6] px-4 py-10 w-64 md:w-72 flex items-center justify-center hover:text-[#dcecf0] transition">
            View More <FaArrowRight size={22} className="ml-2" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default CoverPageCard;
