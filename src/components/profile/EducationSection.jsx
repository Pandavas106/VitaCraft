import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { v4 as uuidv4 } from 'uuid'

const EducationSection = () => {
  const { resumeData, updateEducation } = useResume()
  const { education } = resumeData

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const emptyEducation = {
    id: '',
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    current: false
  }
  
  const [formData, setFormData] = useState(emptyEducation)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // If current education, clear end date
    if (name === 'current' && checked) {
      setFormData(prev => ({
        ...prev,
        endDate: ''
      }))
    }
  }

  const handleAddNew = () => {
    setFormData(emptyEducation)
    setIsAddingNew(true)
    setEditingId(null)
  }

  const handleEdit = (id) => {
    const educationItem = education.find(item => item.id === id)
    setFormData(educationItem)
    setEditingId(id)
    setIsAddingNew(false)
  }

  const handleDelete = (id) => {
    const updatedEducation = education.filter(item => item.id !== id)
    updateEducation(updatedEducation)
  }

  const handleCancel = () => {
    setIsAddingNew(false)
    setEditingId(null)
    setFormData(emptyEducation)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let updatedEducation
    
    if (isAddingNew) {
      updatedEducation = [
        ...education,
        { ...formData, id: uuidv4() }
      ]
    } else {
      updatedEducation = education.map(item => 
        item.id === editingId ? formData : item
      )
    }
    
    updateEducation(updatedEducation)
    handleCancel()
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Education</h2>
        {!isAddingNew && editingId === null && (
          <button 
            className="btn-primary flex items-center transform transition-all duration-300 hover:scale-105"
            onClick={handleAddNew}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Education
          </button>
        )}
      </div>

      {/* Form for adding/editing */}
      {(isAddingNew || editingId !== null) && (
        <form onSubmit={handleSubmit} className="mb-8 bg-neutral-50 p-6 rounded-lg border border-neutral-200 animate-slide-up shadow-lg">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            {isAddingNew ? 'Add New Education' : 'Edit Education'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="school" className="block text-sm font-medium text-neutral-700 mb-1">
                School/Institution*
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
                placeholder="University or school name"
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
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
                placeholder="City, Country"
              />
            </div>
            
            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-neutral-700 mb-1">
                Degree*
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
                placeholder="e.g., Bachelor's, Master's"
                required
              />
            </div>
            
            <div>
              <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-neutral-700 mb-1">
                Field of Study*
              </label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
                placeholder="e.g., Computer Science"
                required
              />
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
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
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
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
                disabled={formData.current}
                required={!formData.current}
              />
            </div>
            
            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded transition-all duration-300"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-neutral-700">
                I'm currently studying here
              </label>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="input-field focus:ring-2 focus:ring-primary-500 hover:bg-primary-50 transition-all duration-300"
                placeholder="Describe achievements, activities, or relevant details"
              ></textarea>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              type="button" 
              className="btn-secondary hover:bg-neutral-100 transition-all duration-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary hover:bg-primary-700 transition-all duration-300"
            >
              {isAddingNew ? 'Add Education' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* List of education entries */}
      {education.length > 0 ? (
        <div className="space-y-4">
          {education.map(item => (
            <div 
              key={item.id} 
              className="bg-white p-4 rounded-lg border border-neutral-200 hover:shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{item.school}</h3>
                  <p className="text-neutral-600">{item.degree} in {item.fieldOfStudy}</p>
                  <p className="text-sm text-neutral-500">
                    {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                    {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                  </p>
                </div>
                
                <div className="flex gap-2 items-center">
                  <button onClick={() => handleEdit(item.id)} className="btn-primary">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-600">No education entries yet.</p>
      )}
    </div>
  )
}

export default EducationSection
