import React from "react";
import { ArrayField, FormSection, InputField } from "../FormSection";

function WorkExperience({ resumeData, setResumeData,openSections ,toggleSection}) {
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...resumeData.experience];
    if (field.startsWith("point-")) {
      const pointIndex = parseInt(field.split("-")[1]);
      newExperience[index].points[pointIndex] = value;
    } else {
      newExperience[index][field] = value;
    }
    setResumeData({ ...resumeData, experience: newExperience });
  };
  return (
    <FormSection
      title="Work Experience"
      isOpen={openSections.experience}
      toggle={() => toggleSection("experience")}
    >
      <ArrayField
        items={resumeData.experience}
        setItems={(newItems) =>
          setResumeData({ ...resumeData, experience: newItems })
        }
        renderItem={(exp, index) => (
          <div>
            <InputField
              label="Role / Job Title"
              name={`role`}
              value={exp.role}
              onChange={(e) =>
                handleExperienceChange(index, "role", e.target.value)
              }
            />
            <InputField
              label="Company"
              name={`company`}
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(index, "company", e.target.value)
              }
            />
            <InputField
              label="Location"
              name={`location`}
              value={exp.location}
              onChange={(e) =>
                handleExperienceChange(index, "location", e.target.value)
              }
            />
            <InputField
              label="Start Date"
              name={`startDate`}
              value={exp.startDate}
              onChange={(e) =>
                handleExperienceChange(index, "startDate", e.target.value)
              }
            />
            <InputField
              label="End Date"
              name={`endDate`}
              value={exp.endDate}
              onChange={(e) =>
                handleExperienceChange(index, "endDate", e.target.value)
              }
            />

            <h5 className="text-sm font-medium mt-2 mb-1">Work Highlights</h5>
            {exp.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-start mb-2">
                <textarea
                  value={point}
                  onChange={(e) =>
                    handleExperienceChange(
                      index,
                      `point-${pointIndex}`,
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newPoints = [...exp.points];
                    newPoints.splice(pointIndex, 1);
                    handleExperienceChange(index, "points", newPoints);
                  }}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newPoints = [...exp.points, ""];
                handleExperienceChange(index, "points", newPoints);
              }}
              className="text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded"
            >
              Add Point
            </button>
          </div>
        )}
        addNewItem={() => {
          const newExperience = [...resumeData.experience];
          const newId = newExperience.length
            ? Math.max(...newExperience.map((e) => e.id)) + 1
            : 1;
          newExperience.push({
            id: newId,
            role: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            points: [""],
          });
          setResumeData({ ...resumeData, experience: newExperience });
        }}
      />
    </FormSection>
  );
}

export default WorkExperience;
