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

  const containerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  }

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1f2937',
  }

  const addButtonStyle = {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const formStyle = {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #e2e8f0',
    animation: 'slideDown 0.3s ease-out',
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1.5rem',
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#4b5563',
  }

  const textareaStyle = {
    ...inputStyle,
    gridColumn: 'span 2',
    minHeight: '120px',
    resize: 'vertical',
  }

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  }

  const primaryButtonStyle = {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  const secondaryButtonStyle = {
    ...primaryButtonStyle,
    backgroundColor: 'white',
    border: '2px solid #4f46e5',
    color: '#4f46e5',
  }

  const experienceCardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  }

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
    <div >
      <div style={headerStyle}>
        <h2 style={titleStyle}>Work Experience</h2>
        {!isAddingNew && editingId === null && (
          <button 
            style={addButtonStyle}
            onClick={handleAddNew}
          >
            Add Experience
          </button>
        )}
      </div>

      {(isAddingNew || editingId !== null) && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#1f2937' }}>
            {isAddingNew ? 'Add New Experience' : 'Edit Experience'}
          </h3>
          
          <div style={gridStyle}>
            <div>
              <label style={labelStyle}>Company/Organization*</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Company name"
                required
              />
            </div>
            
            <div>
              <label style={labelStyle}>Position/Title*</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Your job title"
                required
              />
            </div>
            
            <div>
              <label style={labelStyle}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                style={inputStyle}
                placeholder="City, Country or Remote"
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={formData.current}
                onChange={handleChange}
                style={{ width: '1rem', height: '1rem' }}
              />
              <label htmlFor="current" style={{ color: '#4b5563', fontSize: '0.9rem' }}>
                I currently work here
              </label>
            </div>
            
            <div>
              <label style={labelStyle}>Start Date*</label>
              <input
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            
            <div>
              <label style={labelStyle}>End Date{!formData.current && '*'}</label>
              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={inputStyle}
                disabled={formData.current}
                required={!formData.current}
              />
            </div>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={textareaStyle}
                placeholder="Describe your responsibilities, achievements, and skills used"
                required
                rows="5"
              ></textarea>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                Use bullet points by starting each line with "• " to format your description professionally.
              </p>
            </div>
          </div>
          
          <div style={buttonGroupStyle}>
            <button 
              type="button" 
              style={secondaryButtonStyle}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={primaryButtonStyle}
            >
              {isAddingNew ? 'Add Experience' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {experience.length > 0 ? (
        <div>
          {experience.map(item => (
            <div key={item.id} style={experienceCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {item.position}
                  </h3>
                  <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>{item.company}</p>
                  <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - 
                    {item.current ? ' Present' : ` ${new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}`}
                    {item.location && ` • ${item.location}`}
                  </p>
                  <div style={{ marginTop: '1rem', whiteSpace: 'pre-line', fontSize: '0.9rem' }}>
                    {item.description}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleEdit(item.id)}
                    style={{ padding: '0.5rem', color: '#4b5563' }}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: '0.5rem', color: '#ef4444' }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#6b7280' }}>
          <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No work experience added yet</p>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Add your professional experience to showcase your skills
          </p>
          <button 
            style={primaryButtonStyle}
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