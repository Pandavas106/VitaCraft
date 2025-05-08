import React from "react";
import { ArrayField, FormSection, InputField } from "../FormSection";

function EducationData({ resumeData, setResumeData,openSections ,toggleSection}) {
  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index] = {
      ...newEducation[index],
      [name]: value,
    };
    setResumeData({
      ...resumeData,
      education: newEducation,
    });
  };
  return (
    <FormSection
      title="Education"
      isOpen={openSections.education}
      toggle={() => toggleSection("education")}
    >
      <ArrayField
        items={resumeData.education}
        setItems={(newItems) =>
          setResumeData({ ...resumeData, education: newItems })
        }
        renderItem={(edu, index) => (
          <div>
            <InputField
              label="Degree"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <InputField
              label="Institution"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <InputField
              label="Score"
              name="score"
              value={edu.score}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <InputField
              label="Location"
              name="location"
              value={edu.location}
              onChange={(e) => handleEducationChange(e, index)}
            />
            <div className="flex gap-4">
              <InputField
                label="Start Year"
                name="startYear"
                value={edu.startYear}
                onChange={(e) => handleEducationChange(e, index)}
              />
              <InputField
                label="End Year"
                name="endYear"
                value={edu.endYear}
                onChange={(e) => handleEducationChange(e, index)}
              />
            </div>
          </div>
        )}
        addNewItem={() => {
          const newEducation = [...resumeData.education];
          const newId = newEducation.length
            ? Math.max(...newEducation.map((e) => e.id)) + 1
            : 1;
          newEducation.push({
            id: newId,
            degree: "",
            institution: "",
            score: "",
            location: "",
            startYear: "",
            endYear: "",
          });
          setResumeData({ ...resumeData, education: newEducation });
        }}
      />
    </FormSection>
  );
}

export default EducationData;
