import { useState } from 'react'
import { useResume } from '../../context/ResumeContext'

const CertificationsSection = () => {
  const { resumeData, updateResumeData } = useResume()
  const { certifications } = resumeData

  const [formData, setFormData] = useState({
    certificationName: '',
    issuingOrganization: '',
    issueDate: '',
    certificationLink: '',
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
    const newCertification = {
      ...formData,
      issueDate: new Date(formData.issueDate),
    }
    updateResumeData({
      ...resumeData,
      certifications: [...certifications, newCertification],
    })
    setIsEditing(false)
  }

  const handleRemoveCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    updateResumeData({
      ...resumeData,
      certifications: updatedCertifications,
    })
  }

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Certifications
        </h2>
      </div>
      {!isEditing ? (
        <div className="space-y-8">
          {certifications.length === 0 ? (
            <p className="text-center text-gray-500">No certifications added yet.</p>
          ) : (
            certifications.map((certification, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">{certification.certificationName}</h3>
                <p className="text-gray-700 mt-2">{certification.issuingOrganization}</p>
                <p className="text-gray-600 mt-2">
                  Issued on: {new Date(certification.issueDate).toLocaleDateString()}
                </p>
                <div className="mt-2">
                  <a
                    href={certification.certificationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    View Certification
                  </a>
                </div>
                <button
                  onClick={() => handleRemoveCertification(index)}
                  className="text-red-500 text-sm mt-4"
                >
                  Remove Certification
                </button>
              </div>
            ))
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            Add New Certification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Certification Name</label>
            <input
              type="text"
              name="certificationName"
              value={formData.certificationName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter certification name"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Issuing Organization</label>
            <input
              type="text"
              name="issuingOrganization"
              value={formData.issuingOrganization}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter the issuing organization"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-600">Certification Link</label>
            <input
              type="url"
              name="certificationLink"
              value={formData.certificationLink}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border-2 border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Provide a link to the certification"
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
              Save Certification
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CertificationsSection
