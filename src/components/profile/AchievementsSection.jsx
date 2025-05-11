import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AchievementsSection = ({ isActive, setActiveSection }) => {
  const [achievements, setAchievements] = useState([
    "Finalist in the Internal Hackathon of SIH at VITB, where I developed a solution to a practical problem, creating a working prototype.",
    "Finalist in the Spark Tank Competition at college, where I designed a solution and presented it to industry experts, receiving valuable feedback.",
    "Top 50 team in the DEMUX 24-Hour Hackathon at BVRIT Narsapur, where my team developed the AGRO-GENSIS app, collaborating to meet deadlines and deliver a functional prototype.",
  ]);
  const [isAddingAchievement, setIsAddingAchievement] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newAchievement, setNewAchievement] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleInputChange = (e) => {
    setNewAchievement(e.target.value);
    setHasChanges(true);
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement("");
      setIsAddingAchievement(false);
      setHasChanges(false);
    }
  };

  const handleEditAchievement = (index) => {
    setNewAchievement(achievements[index]);
    setIsEditing(index);
    setIsAddingAchievement(true);
    setHasChanges(false);
  };

  const handleUpdateAchievement = () => {
    if (newAchievement.trim()) {
      const updatedAchievements = [...achievements];
      updatedAchievements[isEditing] = newAchievement;
      setAchievements(updatedAchievements);
      setNewAchievement("");
      setIsEditing(null);
      setIsAddingAchievement(false);
      setHasChanges(false);
    }
  };

  const handleDeleteAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
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
            Achievements
          </h2>
          {!isAddingAchievement && (
            <button
              onClick={() => setIsAddingAchievement(true)}
              className="text-sm px-4 py-2 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
            >
              Add Achievement
            </button>
          )}
        </div>

        {isAddingAchievement ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-[#406B98] mb-4">
              {isEditing !== null ? "Edit Achievement" : "Add New Achievement"}
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Achievement Description
                </label>
                <textarea
                  value={newAchievement}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98] resize-y"
                  rows="4"
                  placeholder="Describe your achievement, award, recognition or competition result..."
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsAddingAchievement(false);
                    setIsEditing(null);
                    setNewAchievement("");
                    setHasChanges(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    isEditing !== null
                      ? handleUpdateAchievement
                      : handleAddAchievement
                  }
                  disabled={!newAchievement.trim()}
                  className={`px-6 py-2 bg-[#406B98] text-white rounded font-medium transition-colors ${
                    !newAchievement.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#335680]"
                  }`}
                >
                  {isEditing !== null ? "Update" : "Save"}
                </button>
              </div>

              {isEditing !== null && hasChanges && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  Changes detected. Don't forget to update!
                </div>
              )}
            </div>
          </div>
        ) : achievements.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">No achievements added yet.</p>
            <button
              onClick={() => setIsAddingAchievement(true)}
              className="mt-4 text-[#406B98] underline hover:text-[#335680]"
            >
              Add your first achievement
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg relative group"
              >
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => handleEditAchievement(index)}
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
                    onClick={() => handleDeleteAchievement(index)}
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

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">{achievement}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setActiveSection("Certifications")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors"
        >
          Back: Certifications
        </button>
      </div>
    </motion.div>
  );
};

export default AchievementsSection;

