import React from "react";
import CP1 from './../assets/CP1.png';
import { FaArrowRight } from "react-icons/fa";

function CoverPageCard() {
  return (
    <div className="flex gap-1 md:gap-10 items-center px-4 py-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      {[...Array(5)].map((_, idx) => (
        <a href="#" key={idx} className="flex-shrink-0 w-64 md:w-72">
          <div>
            <img
              src={CP1}
              alt=""
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
  );
}

export default CoverPageCard;
