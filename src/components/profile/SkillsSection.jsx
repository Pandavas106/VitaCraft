import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { v4 as uuidv4 } from 'uuid'

const SkillsSection = () => {
  const { resumeData, updateSkills } = useResume()
  const { skills } = resumeData

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const skillCategories = [
    'Technical',
    'Soft Skills',
    'Languages',
    'Tools',
    'Frameworks',
    'Other'
  ]
  
  const emptySkill = {
    id: '',
    name: '',
    category: 'Technical',
    level: 3
  }
  
  const [formData, setFormData] = useState(emptySkill)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value, 10) : value
    }))
  }

  const handleAddNew = () => {
    setFormData(emptySkill)
    setIsAddingNew(true)
    setEditingId(null)
  }

  const handleEdit = (id) => {
    const skillItem = skills.find(item => item.id === id)
    setFormData(skillItem)
    setEditingId(id)
    setIsAddingNew(false)
  }

  const handleDelete = (id) => {
    const updatedSkills = skills.filter(item => item.id !== id)
    updateSkills(updatedSkills)
  }

  const handleCancel = () => {
    setIsAddingNew(false)
    setEditingId(null)
    setFormData(emptySkill)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    let updatedSkills
    
    if (isAddingNew) {
      updatedSkills = [
        ...skills,
        { ...formData, id: uuidv4() }
      ]
    } else {
      updatedSkills = skills.map(item => 
        item.id === editingId ? formData : item
      )
    }
    
    updateSkills(updatedSkills)
    handleCancel()
  }
  
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Skills</h2>
        {!isAddingNew && editingId === null && (
          <button 
            className="btn-primary flex items-center"
            onClick={handleAddNew}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Skill
          </button>
        )}
      </div>

      {/* Form for adding/editing */}
      {(isAddingNew || editingId !== null) && (
        <form onSubmit={handleSubmit} className="mb-8 bg-neutral-50 p-6 rounded-lg border border-neutral-200 animate-slide-up">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">
            {isAddingNew ? 'Add New Skill' : 'Edit Skill'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Skill Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., JavaScript, Teamwork, Spanish"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
              >
                {skillCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Proficiency Level: {formData.level}/5
              </label>
              <input
                type="range"
                id="level"
                name="level"
                min="1"
                max="5"
                value={formData.level}
                onChange={handleChange}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
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
              {isAddingNew ? 'Add Skill' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* List of skill entries */}
      {skills.length > 0 ? (
        <div>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="mb-6">
              <h3 className="text-md font-medium text-neutral-700 mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map(skill => (
                  <div 
                    key={skill.id} 
                    className="bg-white px-4 py-2 rounded-lg border border-neutral-200 flex items-center gap-2 group hover:shadow-sm transition-shadow duration-200"
                  >
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            i < skill.level ? 'bg-primary-600' : 'bg-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="hidden group-hover:flex gap-1 ml-2">
                      <button 
                        className="text-neutral-400 hover:text-neutral-700 transition-colors duration-200"
                        onClick={() => handleEdit(skill.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        className="text-neutral-400 hover:text-error-600 transition-colors duration-200"
                        onClick={() => handleDelete(skill.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-lg">No skills added yet</p>
          <p className="text-sm mb-4">Add your skills to highlight your expertise</p>
          <button 
            className="btn-primary"
            onClick={handleAddNew}
          >
            Add Skills
          </button>
        </div>
      )}
    </div>
  )
}

export default SkillsSection