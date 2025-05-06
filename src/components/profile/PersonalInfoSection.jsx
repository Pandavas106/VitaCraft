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
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">Personal Information</h2>
      
      {!isEditing ? (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300 mb-4">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <button 
              className="text-primary-600 hover:text-primary-700 font-medium"
              onClick={() => setIsEditing(true)}
            >
              Change Photo
            </button>
          </div>
          
          <div className="md:w-2/3">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                {profile.firstName || profile.lastName 
                  ? `${profile.firstName} ${profile.lastName}`
                  : 'Your Name'}
              </h3>
              <p className="text-neutral-600">
                {profile.title || 'Professional Title'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm text-neutral-500 mb-1">Email</h4>
                <p>{profile.email || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-500 mb-1">Phone</h4>
                <p>{profile.phone || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-500 mb-1">Location</h4>
                <p>{profile.location || 'Not specified'}</p>
              </div>
              <div>
                <h4 className="text-sm text-neutral-500 mb-1">Website</h4>
                <p>{profile.website || 'Not specified'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-neutral-500 mb-1">Professional Summary</h4>
              <p className="text-neutral-700 whitespace-pre-line">
                {profile.summary || 'No summary provided yet. Add a brief overview of your professional background, key skills, and career goals.'}
              </p>
            </div>
            
            <button 
              className="mt-6 btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Personal Information
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden bg-neutral-200 border border-neutral-300 mb-4">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button 
                  type="button" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Photo
                </button>
                {profileImage && (
                  <button 
                    type="button"
                    className="text-error-600 hover:text-error-700 font-medium"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                    Professional Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your phone number"
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
                    placeholder="City, Country"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-1">
                    Website/Portfolio
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your website URL"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="summary" className="block text-sm font-medium text-neutral-700 mb-1">
                    Professional Summary
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows="5"
                    className="input-field"
                    placeholder="Write a brief summary of your professional background and key skills"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                >
                  Save Information
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default PersonalInfoSection