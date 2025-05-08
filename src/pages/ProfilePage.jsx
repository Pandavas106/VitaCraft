import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import PersonalInfoSection from '../components/profile/PersonalInfoSection'
import EducationSection from '../components/profile/EducationSection'
import ExperienceSection from '../components/profile/ExperienceSection'
import SkillsSection from '../components/profile/SkillsSection'

const ProfilePage = () => {
  const { resumeData } = useResume()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('personal')

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      component: PersonalInfoSection,
      icon: '👤',
      description: 'Basic details and contact information',
      color: '#4f46e5'
    },
    {
      id: 'education',
      title: 'Education',
      component: EducationSection,
      icon: '🎓',
      description: 'Academic background and qualifications',
      color: '#0891b2'
    },
    {
      id: 'experience',
      title: 'Experience',
      component: ExperienceSection,
      icon: '💼',
      description: 'Work history and professional experience',
      color: '#7c3aed'
    },
    {
      id: 'skills',
      title: 'Skills',
      component: SkillsSection,
      icon: '⚡',
      description: 'Technical and professional competencies',
      color: '#0d9488'
    }
  ]

  const renderContent = () => {
    const ActiveComponent = sections.find(s => s.id === activeSection)?.component
    return ActiveComponent ? <ActiveComponent /> : null
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8faff 0%, #eef2ff 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Main Content Area */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '2rem'
        }}>
          {/* Sidebar Navigation */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '1.5rem',
            height: 'fit-content',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(79, 70, 229, 0.1)'
          }}>
            {sections.map(section => (
              <div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: activeSection === section.id ? `${section.color}10` : 'transparent',
                  color: activeSection === section.id ? section.color : '#64748b',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
                {section.title}
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(79, 70, 229, 0.1)',
            minHeight: '600px'
          }}>
            <div style={{
              height: '100%',
              overflow: 'auto'
            }}>
              {renderContent()}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <button
            onClick={() => navigate('/builder')}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 8px rgba(79, 70, 229, 0.3)'
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 6px rgba(79, 70, 229, 0.2)'
            }}
          >
            Continue to Resume Builder
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage