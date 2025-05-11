import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";
import ExperienceSection from "../components/profile/ExperienceSection";
import EducationSection from "../components/profile/EducationSection";
import SkillsSection from "../components/profile/SkillsSection";
import ProjectsSection from "../components/profile/ProjectsSection";
import AchievementsSection from "../components/profile/AchievementsSection";
import { defaultResumeData } from "../context/Resume_Data";
import { useAuth } from "../context/auth_context";

const ProfilePage = () => {
  // Active section state
  const [activeSection, setActiveSection] = useState("Personal Info");
  const { authUser } = useAuth();

  // Personal info states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultResumeData.personalInfo);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    "Personal Info",
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "Achievements",
  ];

  // Function to navigate between sections
  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="bg-[#D0F6FE] min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8" ref={sectionRef}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold font-[Hanuman] text-center mb-8 text-[#406B98]"
        >
          Resume Builder
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/4 bg-[#446D9A] p-6 rounded-lg shadow-lg text-white"
          >
            <h2 className="text-2xl font-bold font-[Hanuman] mb-6">
              Profile Navigation
            </h2>

            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item);
                  }}
                  className={`block py-2 px-4 ${
                    activeSection === item
                      ? "bg-white/20 font-medium"
                      : "hover:bg-white/10"
                  } rounded transition-colors`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="mt-8 bg-white/10 p-4 rounded">
              <h3 className="font-semibold mb-2">Resume Tips:</h3>
              <ul className="space-y-2 text-sm">
                <li>Keep your summary concise and impactful</li>
                <li>Highlight your most relevant skills</li>
                <li>Quantify your achievements where possible</li>
                <li>Ensure contact details are up to date</li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <button className="w-full bg-white text-[#406B98] px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                Preview Resume
              </button>
            </div>
          </motion.div>

          {/* Main Content Section */}
          <div className="md:w-3/4">
            {activeSection === "Personal Info" && (
              <PersonalInfoSection
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                formData={formData}
                handleInputChange={handleInputChange}
                profileImage={profileImage}
                fileInputRef={fileInputRef}
                isActive={activeSection == "Personal Info"}
                setActiveSession={setActiveSection}
                authUser ={authUser}
              />
            )}

            {activeSection === "Experience" && (
              <ExperienceSection
                isActive={activeSection == "Experience"}
                setActiveSection={setActiveSection}
                authUser ={authUser}
              />
            )}

            {activeSection === "Education" && (
              <EducationSection
                isActive={activeSection == "Education"}
                setActiveSection={setActiveSection}
                authUser ={authUser}
              />
            )}
            {activeSection === "Skills" && (
              <SkillsSection
                isActive={activeSection == "Skills"}
                setActiveSection={setActiveSection}
                authUser ={authUser}
              />
            )}
            {activeSection === "Projects" && (
              <ProjectsSection
                isActive={activeSection == "Projects"}
                setActiveSection={setActiveSection}
                authUser ={authUser}
              />
            )}
            {activeSection === "Achievements" && (
              <AchievementsSection
                isActive={activeSection == "Achievements"}
                setActiveSection={setActiveSection}
                authUser ={authUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
