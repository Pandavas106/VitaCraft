import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

const AchievementsSection = () => {
  const { resumeData, updateResumeData } = useResume()
  const achievements = resumeData?.achievements || [] // Default to an empty array if achievements is undefined

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    link: '',
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newAchievement = {
      ...formData,
      date: new Date(formData.date),
    }
    updateResumeData({
      ...resumeData,
      achievements: [...achievements, newAchievement],
    })
    setIsEditing(false)
  }

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index)
    updateResumeData({
      ...resumeData,
      achievements: updatedAchievements,
    })
  }

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Achievements
        </h2>
      </div>
      {!isEditing ? (
        <div className="space-y-8">
          {achievements.length === 0 ? (
            <p className="text-center text-gray-500">No achievements added yet.</p>
          ) : (
            achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-700 mt-2">{achievement.description}</p>
                <p className="text-gray-600 mt-2">
                  Achieved on: {new Date(achievement.date).toLocaleDateString()}
                </p>
                {achievement.link && (
                  <div className="mt-2">
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      View Achievement Details
                    </a>
                  </div>
                )}
                <button
                  onClick={() => handleRemoveAchievement(index)}
                  className="text-red-500 text-sm mt-4"
                >
                  Remove Achievement
                </button>
              </div>
            ))
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Add New Achievement
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Achievement Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter achievement title"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter a brief description of your achievement"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Achievement Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Achievement Link (Optional)</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide a link to the achievement (if applicable)"
            />
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
              Save Achievement
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default AchievementsSection
