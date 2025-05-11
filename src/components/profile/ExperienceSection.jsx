import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { defaultResumeData } from "../../context/Resume_Data";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const ExperienceSection = ({ isActive, setActiveSection, authUser }) => {
  const [experiences, setExperiences] = useState(defaultResumeData.experience);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newExperience, setNewExperience] = useState({
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handlePointChange = (index, value) => {
    const updatedPoints = [...newExperience.points];
    updatedPoints[index] = value;
    setNewExperience((prev) => ({
      ...prev,
      points: updatedPoints,
    }));
  };

  const addNewPoint = () => {
    setNewExperience((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const removePoint = (index) => {
    const updatedPoints = newExperience.points.filter((_, i) => i !== index);
    setNewExperience((prev) => ({
      ...prev,
      points: updatedPoints,
    }));
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddExperience = () => {
    const experienceWithId = {
      ...newExperience,
      id: Date.now(),
    };

    setExperiences([...experiences, experienceWithId]);
    setNewExperience({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setIsAddingExperience(false);
  };

  const handleEditExperience = (id) => {
    const experienceToEdit = experiences.find((exp) => exp.id === id);
    setNewExperience(experienceToEdit);
    setIsEditing(id);
    setIsAddingExperience(true);
  };

  async function handleUpdate() {
    try {
      await updateDoc(doc(db, "users", authUser.uid), {
        experiences: experiences,
      });
      alert("Successfully Updated");
    } catch (error) {
      console.log(error);
      alert("Error in Updating");
    }
  }

  const handleUpdateExperience = () => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === isEditing ? { ...newExperience, id: isEditing } : exp
      )
    );
    setNewExperience({
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setIsEditing(null);
    setIsAddingExperience(false);
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (!isActive) return null;

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
            Work Experience
          </h2>
          {!isAddingExperience && (
            <button
              onClick={() => setIsAddingExperience(true)}
              className="text-sm px-4 py-2 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
            >
              Add Experience
            </button>
          )}
        </div>

        {isAddingExperience ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-[#406B98] mb-4">
              {isEditing ? "Edit Experience" : "Add New Experience"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={newExperience.company}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  role
                </label>
                <input
                  type="text"
                  name="role"
                  value={newExperience.role}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newExperience.location}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Start Date
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={newExperience.startDate}
                    onChange={handleInputChange}
                    className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate"
                    value={newExperience.endDate}
                    onChange={handleInputChange}
                    disabled={newExperience.current}
                    className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98] disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={newExperience.current}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-[#406B98] rounded focus:ring-[#406B98]"
                />
                <label htmlFor="current" className="text-sm text-gray-600">
                  I currently work here
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-600 mb-1">
                  Description Points
                </label>
                {newExperience.points.map((point, index) => (
                  <div key={index} className="flex gap-2 items-center mb-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                      placeholder={`Point ${index + 1}`}
                    />
                    {newExperience.points.length > 1 && (
                      <button
                        onClick={() => removePoint(index)}
                        type="button"
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNewPoint}
                  className="mt-2 text-[#406B98] text-sm underline hover:text-[#335680]"
                >
                  + Add another point
                </button>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsAddingExperience(false);
                    setIsEditing(null);
                    setNewExperience({
                      company: "",
                      role: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      current: false,
                      description: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    isEditing ? handleUpdateExperience : handleAddExperience
                  }
                  className="px-6 py-2 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">No work experience added yet.</p>
            <button
              onClick={() => setIsAddingExperience(true)}
              className="mt-4 text-[#406B98] underline hover:text-[#335680]"
            >
              Add your first experience
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-gray-50 p-6 rounded-lg relative group"
              >
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => handleEditExperience(exp.id)}
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
                    onClick={() => handleDeleteExperience(exp.id)}
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
                      {exp.role}
                    </h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <div>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.endDate == "Present"
                        ? "Present"
                        : formatDate(exp.endDate)}
                    </div>
                    <div>{exp.location}</div>
                  </div>
                </div>

                {exp.points && exp.points.length > 0 && (
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => handleUpdate()}
            className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setActiveSection("Personal Info")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors"
        >
          Back: Personal Info
        </button>
        <button
          onClick={() => setActiveSection("Education")}
          className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
        >
          Next: Education
        </button>
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
