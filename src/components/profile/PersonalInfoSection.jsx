import { useState, useRef } from 'react'
import { useResume } from '../../context/ResumeContext'

const PersonalInfoSection = () => {
  const { resumeData, updateProfile } = useResume()
  const { profile } = resumeData
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    title: profile.title || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    website: profile.website || '',
    summary: profile.summary || '',
  })
  
  const [profileImage, setProfileImage] = useState(profile.profilePicture || null)
  const [isEditing, setIsEditing] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const handleRemoveImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile({
      ...formData,
      profilePicture: profileImage
    })
    setIsEditing(false)
  }
  
  return (
    <div style={{ animation: 'fade-in 0.3s' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#333', marginBottom: '1.5rem' }}>Personal Information</h2>
      
      {!isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
          <div style={{ width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '10rem', height: '10rem', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e0e0e0', border: '1px solid #ccc', marginBottom: '1rem' }}>
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '5rem', height: '5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ width: '66%' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {profile.firstName || profile.lastName 
                  ? `${profile.firstName} ${profile.lastName}`
                  : 'Your Name'}
              </h3>
              <p style={{ color: '#4b5563' }}>
                {profile.title || 'Professional Title'}
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email</h4>
                <p>{profile.email || 'Not specified'}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone</h4>
                <p>{profile.phone || 'Not specified'}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Location</h4>
                <p>{profile.location || 'Not specified'}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Website</h4>
                <p>{profile.website || 'Not specified'}</p>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Professional Summary</h4>
              <p style={{ color: '#4b5563', whiteSpace: 'pre-line' }}>
                {profile.summary || 'No summary provided yet. Add a brief overview of your professional background, key skills, and career goals.'}
              </p>
            </div>
            
            <button 
              style={{ marginTop: '1.5rem', background: 'linear-gradient(to right, #3b82f6, #9333ea)', color: '#fff', borderRadius: '1.5rem', padding: '0.75rem 1.5rem', fontWeight: '500' }}
              onClick={() => setIsEditing(true)}
            >
              Edit Personal Information
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ animation: 'fade-in 0.3s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', '@media (min-width: 768px)': { flexDirection: 'row' } }}>
            <div style={{ width: '33%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '10rem', height: '10rem', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e0e0e0', border: '1px solid #ccc', marginBottom: '1rem' }}>
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '5rem', height: '5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <button 
                  type="button" 
                  style={{ color: '#1e40af', fontWeight: '500' }}
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Photo
                </button>
                {profileImage && (
                  <button 
                    type="button"
                    style={{ color: '#dc2626', fontWeight: '500' }}
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            
            <div style={{ width: '66%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' } }}>
                <div>
                  <label htmlFor="firstName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div>
                  <label htmlFor="title" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Professional Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="City, Country"
                  />
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                  <label htmlFor="website" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Website/Portfolio
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="Enter your website URL"
                  />
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                  <label htmlFor="summary" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Summary
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '1.25rem', border: '2px solid #e5e7eb', backgroundColor: '#fff', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
                    placeholder="Enter a brief professional summary"
                    rows="5"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                style={{ marginTop: '1.5rem', background: 'linear-gradient(to right, #3b82f6, #9333ea)', color: '#fff', borderRadius: '1.5rem', padding: '0.75rem 1.5rem', fontWeight: '500' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default PersonalInfoSection
