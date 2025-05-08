import { useState } from "react";
import { defaultResumeData } from "../context/Resume_Data";
import Resume1 from "../components/Resume_Templates/Resume1";
import PersonalData from "../components/LivePreview_Components/Personal_Data";
import EducationData from "../components/LivePreview_Components/Education_Data";
import ProfileData from "../components/LivePreview_Components/Profile_Data";
import WorkExperience from "../components/LivePreview_Components/Work_Experience";
import SkillsData from "../components/LivePreview_Components/Skills_Data";
import CertificateData from "../components/LivePreview_Components/Certificate_Data";
import AchievementsData from "../components/LivePreview_Components/Achievements_Data";
import OrganizationData from "../components/LivePreview_Components/Organization_Data";
import ProjectsData from "../components/LivePreview_Components/Projects_Data";
import Resume2 from "../components/Resume_Templates/Resume2";
import Resume3 from "../components/Resume_Templates/Resume3";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    education: false,
    profile: false,
    skills: false,
    certificates: false,
    projects: false,
    achievements: false,
    organizations: false,
  });

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  return (
    <div className="min-h-screen  p-5 bg-[#D0F6FE] py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Edit Resume</h2>
          <PersonalData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <EducationData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <ProfileData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <WorkExperience
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <SkillsData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <CertificateData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <ProjectsData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <AchievementsData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
          <OrganizationData
            resumeData={resumeData}
            setResumeData={setResumeData}
            openSections={openSections}
            toggleSection={toggleSection}
          />
        </div>
        <div className="w-full md:w-2/3 h-screen overflow-y-auto">
          <Resume1 resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}
