import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { defaultResumeData } from "../../context/Resume_Data";

const ProjectsSection = ({ isActive, setActiveSection }) => {
  const [projects, setProjects] = useState(defaultResumeData.projects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    subtitle: "",
    points: [""],
  });
  const [hasChanges, setHasChanges] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...newProject.points];
    updatedPoints[index] = value;
    setNewProject((prev) => ({
      ...prev,
      points: updatedPoints,
    }));
    setHasChanges(true);
  };

  const addPoint = () => {
    setNewProject((prev) => ({
      ...prev,
      points: [...prev.points, ""],
    }));
  };

  const removePoint = (index) => {
    if (newProject.points.length > 1) {
      const updatedPoints = newProject.points.filter((_, i) => i !== index);
      setNewProject((prev) => ({
        ...prev,
        points: updatedPoints,
      }));
      setHasChanges(true);
    }
  };

  const handleAddProject = () => {
    // Filter out empty points
    const filteredPoints = newProject.points.filter(
      (point) => point.trim() !== ""
    );

    const projectWithId = {
      ...newProject,
      points: filteredPoints,
      id: Date.now(),
    };

    setProjects([...projects, projectWithId]);
    setNewProject({
      title: "",
      subtitle: "",
      points: [""],
    });
    setIsAddingProject(false);
    setHasChanges(false);
  };

  const handleEditProject = (id) => {
    const projectToEdit = projects.find((proj) => proj.id === id);
    setNewProject({
      ...projectToEdit,
      points: projectToEdit.points.length ? [...projectToEdit.points] : [""],
    });
    setIsEditing(id);
    setIsAddingProject(true);
    setHasChanges(false);
  };

  const handleUpdateProject = () => {
    // Filter out empty points
    const filteredPoints = newProject.points.filter(
      (point) => point.trim() !== ""
    );

    setProjects(
      projects.map((proj) =>
        proj.id === isEditing
          ? { ...newProject, points: filteredPoints, id: isEditing }
          : proj
      )
    );
    setNewProject({
      title: "",
      subtitle: "",
      points: [""],
    });
    setIsEditing(null);
    setIsAddingProject(false);
    setHasChanges(false);
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((proj) => proj.id !== id));
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
            Projects
          </h2>
          {!isAddingProject && (
            <button
              onClick={() => setIsAddingProject(true)}
              className="text-sm px-4 py-2 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
            >
              Add Project
            </button>
          )}
        </div>

        {isAddingProject ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-[#406B98] mb-4">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Subtitle/Tech Stack
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={newProject.subtitle}
                    onChange={handleInputChange}
                    className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Project Highlights
                  </label>
                  <button
                    onClick={addPoint}
                    className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Point
                  </button>
                </div>

                {newProject.points.map((point, index) => (
                  <div key={index} className="flex items-start mb-3">
                    <textarea
                      value={point}
                      onChange={(e) => handlePointChange(index, e.target.value)}
                      className="w-full border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98] resize-y"
                      rows="2"
                    />
                    <button
                      onClick={() => removePoint(index)}
                      className="ml-2 p-2 bg-red-100 rounded-full hover:bg-red-200 text-red-600 transition-colors flex-shrink-0 mt-1"
                      disabled={newProject.points.length <= 1}
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
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsAddingProject(false);
                    setIsEditing(null);
                    setNewProject({
                      title: "",
                      subtitle: "",
                      points: [""],
                    });
                    setHasChanges(false);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateProject : handleAddProject}
                  disabled={
                    !newProject.title ||
                    !newProject.subtitle ||
                    newProject.points.every((p) => !p.trim())
                  }
                  className={`px-6 py-2 bg-[#406B98] text-white rounded font-medium transition-colors ${
                    !newProject.title ||
                    !newProject.subtitle ||
                    newProject.points.every((p) => !p.trim())
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#335680]"
                  }`}
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>

              {isEditing && hasChanges && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  Changes detected. Don't forget to update!
                </div>
              )}
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">No projects added yet.</p>
            <button
              onClick={() => setIsAddingProject(true)}
              className="mt-4 text-[#406B98] underline hover:text-[#335680]"
            >
              Add your first project
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 p-6 rounded-lg relative group"
              >
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => handleEditProject(project.id)}
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
                    onClick={() => handleDeleteProject(project.id)}
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

                <div>
                  <h3 className="text-lg font-semibold text-[#406B98]">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                <ul className="mt-4 space-y-2 list-disc pl-5">
                  {project.points.map((point, index) => (
                    <li key={index} className="text-gray-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setActiveSession("Experience")}
            className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setActiveSection("Skills")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors"
        >
          Back: Skills
        </button>
        <button
          onClick={() => setActiveSection("Achievements")}
          className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
        >
          Next: Achievements
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
