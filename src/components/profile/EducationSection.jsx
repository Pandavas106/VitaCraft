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
    <div >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center  mb-8 tracking-wide drop-shadow-sm">
          Education
        </h2>
        {!isAddingNew && editingId === null && (
          <button 
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-base transition duration-300 hover:bg-indigo-700"
            onClick={handleAddNew}
          >
            Add Education
          </button>
        )}
      </div>

      {/* Form for adding/editing */}
      {(isAddingNew || editingId !== null) && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
          <h3 className="text-2xl font-medium text-gray-800 mb-4">
            {isAddingNew ? 'Add New Education' : 'Edit Education'}
          </h3>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <label htmlFor="school" className="block text-gray-600 font-medium mb-2">School/Institution*</label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="University or school name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="degree" className="block text-gray-600 font-medium mb-2">Degree*</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Degree obtained"
                required
              />
            </div>

            <div>
              <label htmlFor="fieldOfStudy" className="block text-gray-600 font-medium mb-2">Field of Study*</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your field of study"
                required
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-gray-600 font-medium mb-2">Start Date*</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-gray-600 font-medium mb-2">End Date (or Expected)*</label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={formData.current}
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-600 font-medium mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-600 font-medium mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional details"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              type="button" 
              className="px-6 py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-all"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-base transition duration-300 hover:bg-indigo-700"
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
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.school}</h3>
                  <p className="text-gray-600">{item.degree} in {item.fieldOfStudy}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.startDate).toLocaleDateString()} - 
                    {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString()}`}
                    {item.location && ` • ${item.location}`}
                  </p>
                  {item.description && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
                </div>
                <div className="flex gap-2">
                  <button 
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          <p>No education history added yet</p>
          <button 
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-base transition duration-300 hover:bg-indigo-700"
            onClick={handleAddNew}
          >
            Add Education
          </button>
        </div>
      )}
    </div>
  )
}

export default EducationSection
