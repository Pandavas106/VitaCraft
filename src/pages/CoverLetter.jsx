import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import CP1 from "./../assets/CP1.png";

function CoverLetter() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  // ✅ FIXED scrollContainer FUNCTION
  const scrollContainer = (direction) => {
    const container = document.getElementById("template-scroll");
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="md:px-16 md:py-12 p-8 bg-[#D0F6FE] rounded-b-3xl shadow-md">
        <h1 className="font-bold text-3xl md:text-5xl tracking-wide font-[Hanuman] text-[#1E293B]">
          Create Your Cover Letter
        </h1>
        <p className="mt-3 text-gray-600 md:text-lg max-w-2xl">
          Stand out from the crowd with a professionally designed cover letter tailored to your industry.
        </p>

        {/* Template Scroller */}
        <div className="md:my-10 my-8 relative">
          <h2 className="font-semibold text-xl text-[#1E293B] mb-4">
            Recent Templates
          </h2>

          {/* Scroll Buttons */}
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

          {/* Horizontal Template Scroll */}
          <div
            id="template-scroll"
            className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb pb-4 scroll-smooth"
          >
            {/* Create New Template Card */}
            <div className="flex-shrink-0 hover:cursor-pointer transform transition-transform hover:scale-105">
              <div className="w-[220px] h-[300px] mb-3 bg-white p-4 flex border-dashed flex-col gap-3 justify-center items-center border-[3px] border-[#406B98] shadow-lg rounded-lg hover:shadow-xl transition-all">
                <div className="bg-[#ecf7fd] p-4 rounded-full">
                  <FaPlus className="text-3xl text-[#406B98]" />
                </div>
                <p className="text-center text-gray-600">Create from scratch</p>
              </div>
              <h2 className="text-[#406B98] ml-1 text-lg font-semibold">
                New Cover Letter
              </h2>
            </div>

            {/* Render Recent Templates */}
            {[...Array(5)].map((_, idx) => (
              <div
                className="flex-shrink-0 transform transition-transform hover:scale-105 hover:cursor-pointer"
                key={idx}
                onClick={() => setSelectedTemplate(idx)}
              >
                <div
                  className={`w-[220px] h-[300px] mb-3 flex flex-col gap-2 justify-center items-center rounded-lg shadow-lg ${
                    selectedTemplate === idx
                      ? "ring-4 ring-[#406B98]"
                      : "hover:shadow-xl"
                  } transition-all`}
                >
                  <img
                    src={CP1}
                    alt={`Cover Letter ${idx + 1}`}
                    className="object-fill w-full h-full rounded-lg"
                  />
                </div>
                <h2 className="text-[#406B98] w-[220px] ml-1 text-lg font-semibold flex items-center gap-2">
                  Template {idx + 1}
                  {selectedTemplate === idx && (
                    <span className="text-xs bg-[#406B98] text-white px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Templates Grid */}
      <div className="min-h-screen md:px-12 md:py-16 px-6 py-10">
        <h1 className="text-3xl md:text-5xl font-bold font-[Hanuman] tracking-wide text-[#1E293B] mb-1">
          Cover Letter Templates
        </h1>
        <h2 className="text-lg md:text-2xl font-medium tracking-wide text-gray-700">
          Choose a template that suits your style.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, idx) => (
            <div className="cursor-pointer" key={idx}>
              <div className="w-full h-[280px] mb-2 flex flex-col gap-2 justify-center items-center rounded-md shadow-md bg-white">
                <img
                  src={CP1}
                  alt={`Cover Letter Template ${idx + 1}`}
                  className="w-full h-full object-fill rounded"
                />
              </div>
              <h2 className="text-[#406B98] text-center text-lg font-semibold">
                Template {idx + 1}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoverLetter;
