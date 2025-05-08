import React from "react";
import { ArrayField, FormSection, InputField } from "../FormSection";

function SkillsData({ resumeData, setResumeData,openSections ,toggleSection}) {
  const handleSkillsChange = (type, index, value) => {
    const newSkills = { ...resumeData.skills };
    newSkills[type][index] = value;
    setResumeData({
      ...resumeData,
      skills: newSkills,
    });
  };
  return (
    <FormSection
      title="Skills"
      isOpen={openSections.skills}
      toggle={() => toggleSection("skills")}
    >
      <h4 className="text-md font-medium mb-2">Technical Skills</h4>
      <ArrayField
        items={resumeData.skills.technical}
        setItems={(newItems) =>
          setResumeData({
            ...resumeData,
            skills: { ...resumeData.skills, technical: newItems },
          })
        }
        renderItem={(skill, index) => (
          <InputField
            label={`Technical Skill ${index + 1}`}
            name={`technical-${index}`}
            value={skill}
            onChange={(e) =>
              handleSkillsChange("technical", index, e.target.value)
            }
          />
        )}
        addNewItem={() => {
          const newSkills = { ...resumeData.skills };
          newSkills.technical.push("");
          setResumeData({ ...resumeData, skills: newSkills });
        }}
      />

      <h4 className="text-md font-medium mb-2 mt-4">Soft Skills</h4>
      <ArrayField
        items={resumeData.skills.soft}
        setItems={(newItems) =>
          setResumeData({
            ...resumeData,
            skills: { ...resumeData.skills, soft: newItems },
          })
        }
        renderItem={(skill, index) => (
          <InputField
            label={`Soft Skill ${index + 1}`}
            name={`soft-${index}`}
            value={skill}
            onChange={(e) => handleSkillsChange("soft", index, e.target.value)}
          />
        )}
        addNewItem={() => {
          const newSkills = { ...resumeData.skills };
          newSkills.soft.push("");
          setResumeData({ ...resumeData, skills: newSkills });
        }}
      />
    </FormSection>
  );
}

export default SkillsData;
