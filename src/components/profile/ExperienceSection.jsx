import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { v4 as uuidv4 } from 'uuid'

const ExperienceSection = () => {
  const { resumeData, updateExperience } = useResume()
  const { experience } = resumeData

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const emptyExperience = {
    id: '',
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  }

  const [formData, setFormData] = useState(emptyExperience)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // If current job, clear end date
    if (name === 'current' && checked) {
      setFormData(prev => ({
        ...prev,
        endDate: ''
      }))
    }
  }

  const handleAddNew = () => {
    setFormData(emptyExperience)
    setIsAddingNew(true)
    setEditingId(null)
  }

  const handleEdit = (id) => {
    const experienceItem = experience.find(item => item.id === id)
    setFormData(experienceItem)
    setEditingId(id)
    setIsAddingNew(false)
  }

  const handleDelete = (id) => {
    const updatedExperience = experience.filter(item => item.id !== id)
    updateExperience(updatedExperience)
  }

  const handleCancel = () => {
    setIsAddingNew(false)
    setEditingId(null)
    setFormData(emptyExperience)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let updatedExperience

    if (isAddingNew) {
      updatedExperience = [
        ...experience,
        { ...formData, id: uuidv4() }
      ]
    } else {
      updatedExperience = experience.map(item =>
        item.id === editingId ? formData : item
      )
    }

    updateExperience(updatedExperience)
    handleCancel()
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Work Experience</h2>
        {!isAddingNew && editingId === null && (
          <button
            className="btn-primary flex items-center"
            onClick={handleAddNew}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Experience
          </button>
        )}
      </div>

      {/* Form for adding/editing */}
      {(isAddingNew || editingId !== null) && (
        <form onSubmit={handleSubmit} className="mb-8 bg-neutral-50 p-6 rounded-lg border border-neutral-200 animate-slide-up">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            {isAddingNew ? 'Add New Experience' : 'Edit Experience'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                Company/Organization*
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input-field"
                placeholder="Company name"
                required
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-neutral-700 mb-1">
                Position/Title*
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="input-field"
                placeholder="Your job title"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-field"
                placeholder="City, Country or Remote"
              />
            </div>

            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-neutral-700">
                I currently work here
              </label>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Start Date*
              </label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-neutral-700 mb-1">
                End Date{!formData.current && '*'}
              </label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-field"
                disabled={formData.current}
                required={!formData.current}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="input-field"
                placeholder="Describe your responsibilities, achievements, and skills used"
                required
              ></textarea>
              <p className="text-sm text-neutral-500 mt-1">
                Use bullet points by starting each line with "• " to format your description professionally.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {isAddingNew ? 'Add Experience' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* List of experience entries */}
      {experience.length > 0 ? (
        <div className="space-y-4">
          {experience.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg border border-neutral-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.position}</h3>
                  <p className="text-neutral-600">{item.company}</p>
                  <p className="text-sm text-neutral-500">
                    {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -
                    {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                    {item.location && ` • ${item.location}`}
                  </p>
                  {item.description && (
                    <div className="text-sm mt-2 whitespace-pre-line">{item.description}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-neutral-500 hover:text-neutral-700"
                    onClick={() => handleEdit(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    className="text-neutral-500 hover:text-error-600"
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-lg">No work experience added yet</p>
          <p className="text-sm mb-4">Add your professional experience to showcase your skills</p>
          <button
            className="btn-primary"
            onClick={handleAddNew}
          >
            Add Experience
          </button>
        </div>
      )}
    </div>
  )
}

export default ExperienceSection
