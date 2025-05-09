import { createContext, useContext, useState, useEffect } from 'react'

// Initial resume data structure
const initialResumeData = {
  profile: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: '',
    profilePicture: null
  },
  education: [],
  experience: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
  achievements: []  // Added achievements section
}

const ResumeContext = createContext(null)

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    // Load data from localStorage if available
    const savedData = localStorage.getItem('resumeData')
    return savedData ? JSON.parse(savedData) : initialResumeData
  })

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData))
  }, [resumeData])

  const updateProfile = (newProfileData) => {
    setResumeData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...newProfileData
      }
    }))
  }

  const updateEducation = (educationList) => {
    setResumeData(prev => ({
      ...prev,
      education: educationList
    }))
  }

  const updateExperience = (experienceList) => {
    setResumeData(prev => ({
      ...prev,
      experience: experienceList
    }))
  }

  const updateSkills = (skillsList) => {
    setResumeData(prev => ({
      ...prev,
      skills: skillsList
    }))
  }

  const updateAchievements = (achievementsList) => {   // Added update function for achievements
    setResumeData(prev => ({
      ...prev,
      achievements: achievementsList
    }))
  }

  const resetResume = () => {
    setResumeData(initialResumeData)
  }

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateProfile,
      updateEducation,
      updateExperience,
      updateSkills,
      updateAchievements, // Provided in the context
      resetResume
    }}>
      {children}
    </ResumeContext.Provider>
  )
}
