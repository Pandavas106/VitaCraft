import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import PersonalInfoSection from '../components/profile/PersonalInfoSection'
import EducationSection from '../components/profile/EducationSection'
import ExperienceSection from '../components/profile/ExperienceSection'
import SkillsSection from '../components/profile/SkillsSection'

const ProfilePage = () => {
  const { resumeData } = useResume()
  const navigate = useNavigate()
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasScrolled(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    navigate('/builder')
  }

  return (
    <div className={`transition-opacity duration-500 ${hasScrolled ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-extrabold text-neutral-800 mb-3 tracking-tight">Build Your Professional Profile</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Complete your profile to generate a resume that stands out and reflects your professional journey.
          </p>
        </div>

        <div className="space-y-10">
          <section className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <PersonalInfoSection />
          </section>

          <section className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <EducationSection />
          </section>

          <section className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <ExperienceSection />
          </section>

          <section className="bg-white rounded-2xl shadow-md border border-neutral-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <SkillsSection />
          </section>
        </div>

        <div className="mt-12 flex justify-end">
          <button 
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={handleContinue}
          >
            Continue to Resume Builder →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
