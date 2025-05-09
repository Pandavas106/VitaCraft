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
    LinkedIn: profile.LinkedIn || '',
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
    <div >
      <div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Personal Information
        </h2>
      </div>
      {!isEditing ? (
  <div className="text-center space-y-10 px-4 sm:px-6 lg:px-8">
    <div className="w-40 h-40 mx-auto relative rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl transition-transform hover:scale-105 duration-300">
      {profileImage ? (
        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-6xl text-gray-400">👤</div>
      )}
    </div>

    <h1 className="text-3xl font-bold text-gray-900">{profile.firstName ? `${profile.firstName} ${profile.lastName}` : 'Your Name'}</h1>
    <p className="text-indigo-600 text-lg font-medium tracking-wide">{profile.title || 'Professional Title'}</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div>
        <label className="block text-sm text-gray-500 uppercase tracking-wider mb-1">Email</label>
        <p className="text-base text-gray-800 font-semibold">{profile.email || 'Not specified'}</p>
      </div>
      <div>
        <label className="block text-sm text-gray-500 uppercase tracking-wider mb-1">Phone</label>
        <p className="text-base text-gray-800 font-semibold">{profile.phone || 'Not specified'}</p>
      </div>
      <div>
        <label className="block text-sm text-gray-500 uppercase tracking-wider mb-1">Location</label>
        <p className="text-base text-gray-800 font-semibold">{profile.location || 'Not specified'}</p>
      </div>
      <div>
        <label className="block text-sm text-gray-500 uppercase tracking-wider mb-1">LinkedIn</label>
        <p className="text-base text-gray-800 font-semibold break-words">{profile.LinkedIn || 'Not specified'}</p>
      </div>
    </div>

    <div className="max-w-4xl mx-auto mt-8 text-left bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <label className="block text-sm text-gray-500 uppercase tracking-wider mb-2">Professional Summary</label>
      <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{profile.summary || 'No summary provided yet.'}</p>
    </div>

    <button
      onClick={() => setIsEditing(true)}
      className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
    >
      Edit Profile
    </button>
  </div>
) : (
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <div className="w-36 h-36 mx-auto relative">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-indigo-600" />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-4xl border-4 border-indigo-600">
                  👤
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="mt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-indigo-600 text-sm cursor-pointer"
                >
                  Upload Photo
                </button>
                {profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-red-500 text-sm cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your first name"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your last name"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Professional Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-600">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="City, Country"
              />
            </div>

            <div className="mb-6 col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-600">LinkedIn</label>
              <input
                type="text"
                name="LinkedIn"
                value={formData.LinkedIn}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="LinkedIn profile link"
              />
            </div>

            <div className="mb-6 col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-600">Professional Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border-2 border-gray-200 text-base min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Brief summary about yourself"
              />
            </div>
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
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default PersonalInfoSection
