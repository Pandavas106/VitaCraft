import React from "react";
import { ArrayField, FormSection, TextareaField } from "../FormSection";

function AchievementsData({
  resumeData,
  setResumeData,
  openSections,
  toggleSection,
}) {
  const handleAchievementChange = (index, value) => {
    const newAchievements = [...resumeData.achievements];
    newAchievements[index] = value;
    setResumeData({
      ...resumeData,
      achievements: newAchievements,
    });
  };
  return (
    <FormSection
      title="Achievements"
      isOpen={openSections.achievements}
      toggle={() => toggleSection("achievements")}
    >
      <ArrayField
        items={resumeData.achievements}
        setItems={(newItems) =>
          setResumeData({ ...resumeData, achievements: newItems })
        }
        renderItem={(achievement, index) => (
          <TextareaField
            label={`Achievement ${index + 1}`}
            name={`achievement-${index}`}
            value={achievement}
            onChange={(e) => handleAchievementChange(index, e.target.value)}
          />
        )}
        addNewItem={() => {
          const newAchievements = [...resumeData.achievements];
          newAchievements.push("");
          setResumeData({
            ...resumeData,
            achievements: newAchievements,
          });
        }}
      />
    </FormSection>
  );
}

export default AchievementsData;
