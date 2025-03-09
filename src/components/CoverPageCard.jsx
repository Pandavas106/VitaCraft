import React from "react";
import CP1 from './../assets/CP1.png';
import { FaArrowRight } from "react-icons/fa";

function CoverPageCard() {
    return(
        <div className="flex gap-10 items-center p-10 overflow-x-auto">
            <a href="#">
                <div className="flex-shrink-0">
                    <img src={CP1} alt="" className="h-100 w-75" />
                    <div className="w-75 mt-2 font-[Hanuman] text-xl font-small tracking-wider text-[#EBF4F6]">Agile & Execution driven Junior Programmer</div>
                </div>
            </a>
            <a href="#">
                <div className="flex-shrink-0">
                    <img src={CP1} alt="" className="h-100 w-75" />
                    <div className="w-75 mt-2 font-[Hanuman] text-xl font-small tracking-wider text-[#EBF4F6]">Agile & Execution driven Junior Programmer</div>
                </div>
            </a>
            <a href="#">
                <div className="flex-shrink-0">
                    <img src={CP1} alt="" className="h-100 w-75" />
                    <div className="w-75 mt-2 font-[Hanuman] text-xl font-small tracking-wider text-[#EBF4F6]">Agile & Execution driven Junior Programmer</div>
                </div>
            </a>
            <a href="#">
                <div className="flex-shrink-0">
                    <img src={CP1} alt="" className="h-100 w-75" />
                    <div className="w-75 mt-2 font-[Hanuman] text-xl font-small tracking-wider text-[#EBF4F6]">Agile & Execution driven Junior Programmer</div>
                </div>
            </a>
            <a href="#">
                <div className="flex-shrink-0">
                    <img src={CP1} alt="" className="h-100 w-75" />
                    <div className="w-75 mt-2 font-[Hanuman] text-xl font-small tracking-wider text-[#EBF4F6]">Agile & Execution driven Junior Programmer</div>
                </div>
            </a>
            <a href="#">
                <div className="text-xl text-[#EBF4F6] p-10 w-full text-center flex items-center justify-center">
                    View More <FaArrowRight size={25} className="ml-3" />
                </div>
            </a>
        </div>
    );
}

export default CoverPageCard;
