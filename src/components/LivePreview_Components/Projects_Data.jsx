import React from "react";
import { ArrayField, FormSection, InputField } from "../FormSection";

function ProjectsData({
  resumeData,
  setResumeData,
  openSections,
  toggleSection,
}) {
  const handleProjectChange = (projectIndex, field, value) => {
    const newProjects = [...resumeData.projects];

    if (field.startsWith("point-")) {
      const pointIndex = parseInt(field.split("-")[1]);
      newProjects[projectIndex].points[pointIndex] = value;
    } else {
      newProjects[projectIndex] = {
        ...newProjects[projectIndex],
        [field]: value,
      };
    }

    setResumeData({
      ...resumeData,
      projects: newProjects,
    });
  };
  return (
    <FormSection
      title="Projects"
      isOpen={openSections.projects}
      toggle={() => toggleSection("projects")}
    >
      <ArrayField
        items={resumeData.projects}
        setItems={(newItems) =>
          setResumeData({ ...resumeData, projects: newItems })
        }
        renderItem={(project, index) => (
          <div>
            <InputField
              label="Project Title"
              name={`title`}
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
            />
            <InputField
              label="Project Subtitle"
              name={`subtitle`}
              value={project.subtitle}
              onChange={(e) =>
                handleProjectChange(index, "subtitle", e.target.value)
              }
            />

            <h5 className="text-sm font-medium mt-2 mb-1">Project Points</h5>
            {project.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-start mb-2">
                <textarea
                  value={point}
                  onChange={(e) =>
                    handleProjectChange(
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
                    const newPoints = [...project.points];
                    newPoints.splice(pointIndex, 1);
                    handleProjectChange(index, "points", newPoints);
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
                const newPoints = [...project.points, ""];
                handleProjectChange(index, "points", newPoints);
              }}
              className="text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded"
            >
              Add Point
            </button>
          </div>
        )}
        addNewItem={() => {
          const newProjects = [...resumeData.projects];
          const newId = newProjects.length
            ? Math.max(...newProjects.map((p) => p.id)) + 1
            : 1;
          newProjects.push({
            id: newId,
            title: "",
            subtitle: "",
            points: [""],
          });
          setResumeData({ ...resumeData, projects: newProjects });
        }}
      />
    </FormSection>
  );
}

export default ProjectsData;
