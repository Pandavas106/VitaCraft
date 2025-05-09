import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

const ProjectsSection = () => {
  const { resumeData, updateResumeData } = useResume()
  const { projects } = resumeData

  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectLink: '',
    projectTechStack: '',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProject = {
      ...formData,
      projectTechStack: formData.projectTechStack.split(',').map((tech) => tech.trim()),
    }
    updateResumeData({
      ...resumeData,
      projects: [...projects, newProject],
    })
    setIsEditing(false)
  }

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    updateResumeData({
      ...resumeData,
      projects: updatedProjects,
    })
  }

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Projects
        </h2>
      </div>
      {!isEditing ? (
        <div className="space-y-8">
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">No projects added yet.</p>
          ) : (
            projects.map((project, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">{project.projectName}</h3>
                <p className="text-gray-700 mt-2">{project.projectDescription}</p>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Tech Stack: </span>
                  <span className="text-sm text-indigo-600">{project.projectTechStack.join(', ')}</span>
                </div>
                <div className="mt-2">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    View Project
                  </a>
                </div>
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="text-red-500 text-sm mt-4"
                >
                  Remove Project
                </button>
              </div>
            ))
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Add New Project
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project name"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Project Description</label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe the project"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Project Link</label>
            <input
              type="url"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide a link to the project"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Tech Stack</label>
            <input
              type="text"
              name="projectTechStack"
              value={formData.projectTechStack}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Comma separated list of technologies"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-white border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-lg text-base mr-4 transition duration-300 hover:bg-indigo-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-base transition duration-300 hover:bg-indigo-700"
            >
              Save Project
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ProjectsSection
