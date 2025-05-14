import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useResumeData } from "../../context/Resume_Data";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EducationSection = ({ isActive, setActiveSection, authUser }) => {
  const defaultResumeData =useResumeData();
  const [educations, setEducations] = useState(defaultResumeData.education);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    score: "",
    location: "",
    startYear: "",
    endYear: "",
  });
  
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEducation = () => {
    const educationWithId = {
      ...newEducation,
      id: Date.now(),
    };

    setEducations([...educations, educationWithId]);
    setNewEducation({
      degree: "",
      institution: "",
      score: "",
      location: "",
      startYear: "",
      endYear: "",
    });
    setIsAddingEducation(false);
  };

  const handleEditEducation = (id) => {
    const educationToEdit = educations.find((edu) => edu.id === id);
    setNewEducation(educationToEdit);
    setIsEditing(id);
    setIsAddingEducation(true);
  };

  const handleUpdateEducation = () => {
    setEducations(
      educations.map((edu) =>
        edu.id === isEditing ? { ...newEducation, id: isEditing } : edu
      )
    );
    setNewEducation({
      degree: "",
      institution: "",
      score: "",
      location: "",
      startYear: "",
      endYear: "",
    });
    setIsEditing(null);
    setIsAddingEducation(false);
  };

  const handleDeleteEducation = (id) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  if (!isActive) return null;
  const handleUpdate = async () => {
    try {
      const userId = authUser.uid;
      if (!userId) throw new Error("User not authenticated");

      await updateDoc(doc(db, "users", userId), {
        education: educations,
      });

      alert("Education data updated successfully!");
    } catch (error) {
      console.error("Error updating education:", error);
      alert("Failed to update education.");
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-[Hanuman] text-[#406B98]">
            Education
          </h2>
          {!isAddingEducation && (
            <button
              onClick={() => setIsAddingEducation(true)}
              className="text-sm px-4 py-2 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
            >
              Add Education
            </button>
          )}
        </div>

        {isAddingEducation ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-[#406B98] mb-4">
              {isEditing ? "Edit Education" : "Add New Education"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Degree/Certificate
                </label>
                <input
                  type="text"
                  name="degree"
                  value={newEducation.degree}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={newEducation.institution}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Score/Grade
                </label>
                <input
                  type="text"
                  name="score"
                  value={newEducation.score}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  placeholder="CGPA - 9.42 / Percentage - 95%"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newEducation.location}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Start Year
                </label>
                <input
                  type="text"
                  name="startYear"
                  value={newEducation.startYear}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  placeholder="2022"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  End Year
                </label>
                <input
                  type="text"
                  name="endYear"
                  value={newEducation.endYear}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  placeholder="2026 or present"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsAddingEducation(false);
                    setIsEditing(null);
                    setNewEducation({
                      degree: "",
                      institution: "",
                      score: "",
                      location: "",
                      startYear: "",
                      endYear: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    isEditing ? handleUpdateEducation : handleAddEducation
                  }
                  className="px-6 py-2 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : educations.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">No education details added yet.</p>
            <button
              onClick={() => setIsAddingEducation(true)}
              className="mt-4 text-[#406B98] underline hover:text-[#335680]"
            >
              Add your first education details
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="bg-gray-50 p-6 rounded-lg relative group"
              >
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => handleEditEducation(edu.id)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#406B98]">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <div>
                      {edu.startYear} - {edu.endYear}
                    </div>
                    <div>{edu.location}</div>
                  </div>
                </div>

                <p className="text-gray-700 mt-3">{edu.score}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              handleUpdate(); 
              setActiveSession("Experience");
            }}
            className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-6 flex md:justify-between gap-7">
        <button
          onClick={() => setActiveSection("Experience")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors"
        >
          Back: Experience
        </button>
        <button
          onClick={() => setActiveSection("Skills")}
          className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
        >
          Next: Skills
        </button>
      </div>
    </motion.div>
  );
};

export default EducationSection;
