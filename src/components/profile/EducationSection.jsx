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
    <div style={{ animation: 'fadeIn 300ms' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1A202C' }}>Education</h2>
        {!isAddingNew && editingId === null && (
          <button 
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: 500,
              background: 'linear-gradient(to right, #3182ce, #D53F8C)',
              color: 'white',
              transition: 'all 300ms',
              transform: 'scale(1)',
              ':hover': { transform: 'scale(1.05)' },
              ':focus': { outline: 'none', ring: '2px solid #3182ce' }
            }}
            onClick={handleAddNew}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.25rem' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Education
          </button>
        )}
      </div>

      {/* Form for adding/editing */}
      {(isAddingNew || editingId !== null) && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', backgroundColor: '#F7FAFC', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #E2E8F0', animation: 'slideUp 300ms' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#1A202C', marginBottom: '1rem' }}>
            {isAddingNew ? 'Add New Education' : 'Edit Education'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label htmlFor="school" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#4A5568', marginBottom: '0.25rem' }}>
                School/Institution*
              </label>
              <input
                type="text"
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: '2px solid #E2E8F0',
                  backgroundColor: 'white',
                  focusOutline: 'none',
                  focusRing: '2px solid #3182ce',
                  transition: 'all 300ms',
                  ':hover': { borderColor: '#3182ce' }
                }}
                placeholder="University or school name"
                required
              />
            </div>
            
            {/* More form fields similar to the one above for location, degree, etc. */}

          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              type="button" 
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 500,
                backgroundColor: 'white',
                color: '#4A5568',
                border: '2px solid #E2E8F0',
                transition: 'all 300ms',
                ':hover': { backgroundColor: '#EDF2F7', borderColor: '#CBD5E0' }
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: 500,
                background: 'linear-gradient(to right, #3182ce, #D53F8C)',
                color: 'white',
                transition: 'all 300ms',
                transform: 'scale(1)',
                ':hover': { transform: 'scale(1.05)' },
                ':focus': { outline: 'none', ring: '2px solid #3182ce' }
              }}
            >
              {isAddingNew ? 'Add Education' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* List of education entries */}
      {education.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {education.map(item => (
            <div 
              key={item.id} 
              style={{
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #E2E8F0',
                transition: 'box-shadow 200ms',
                ':hover': { boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontWeight: 500 }}>{item.school}</h3>
                  <p style={{ color: '#718096' }}>{item.degree} in {item.fieldOfStudy}</p>
                  <p style={{ fontSize: '0.875rem', color: '#A0AEC0' }}>
                    {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                    {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                    {item.location && ` • ${item.location}`}
                  </p>
                  {item.description && (
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{item.description}</p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    style={{ color: '#4A5568', ':hover': { color: '#2D3748' } }}
                    onClick={() => handleEdit(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    style={{ color: '#4A5568', ':hover': { color: '#E53E3E' } }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem', color: '#A0AEC0' }}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '3rem', width: '3rem', margin: 'auto', color: '#E2E8F0', marginBottom: '1rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p style={{ fontSize: '1.125rem' }}>No education history added yet</p>
          <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Add your educational background to enhance your resume</p>
          <button 
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              fontWeight: 500,
              background: 'linear-gradient(to right, #3182ce, #D53F8C)',
              color: 'white',
              transition: 'all 300ms',
              transform: 'scale(1)',
              ':hover': { transform: 'scale(1.05)' },
              ':focus': { outline: 'none', ring: '2px solid #3182ce' }
            }}
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
