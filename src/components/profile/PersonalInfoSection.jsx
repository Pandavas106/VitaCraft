import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { defaultResumeData } from "../../context/Resume_Data";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const PersonalInfoSection = ({
  isEditing,
  setIsEditing,
  formData,
  handleInputChange,
  profileImage,
  fileInputRef,
  isActive,
  setActiveSession,
  authUser,
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const summary = defaultResumeData.profile;
  const [isUpdating ,setIsUpdating] =useState(false);

  if (!isActive) return null;

  async function handleUpdate() {
    try {
      await updateDoc(doc(db, "users", authUser.uid), {
        personalInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          shortName: formData.shortName,
          linkedIn: formData.linkedIn,
          role: formData.role,
          linkedInURL: formData.linkedInURL,
          location: formData.location,
        },
        profile: summary,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold font-[Hanuman] mb-6 text-[#406B98]">
          Personal Information
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#406B98] shadow-lg cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 text-gray-400 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {isEditing && (
              <p className="mt-2 text-xs text-gray-500">
                Click avatar to change
              </p>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-[#406B98]">
              {formData.shortName}
            </h1>
            <p className="text-lg font-medium text-gray-600 mb-3">
              {formData.role}
            </p>

            {!isEditing && (
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {formData.email}
                </span>
                <span className="inline-flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {formData.phone}
                </span>
                <span className="inline-flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {formData.location}
                </span>
              </div>
            )}

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 text-sm px-4 py-2 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4 text-left text-gray-700">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Display Name
                </label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  name="linkedInURL"
                  value={formData.linkedInURL}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-600">
                  Professional Summary
                </label>
                <textarea
                  name="summary"
                  value={summary}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                  placeholder="Tell employers about your professional background and strengths..."
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await handleUpdate();
                    setIsEditing(false);
                  }}
                  className="px-6 py-2 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-[#406B98] mb-3">
                  Professional Summary
                </h3>
                <p className="text-gray-700">{summary}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#406B98] mb-3">
                  Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Full Name
                    </h4>
                    <p>{formData.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Email
                    </h4>
                    <p className="text-[#406B98]">{formData.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Phone
                    </h4>
                    <p>{formData.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      Location
                    </h4>
                    <p>{formData.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      LinkedIn
                    </h4>
                    <p>{formData.linkedIn}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                      LinkedIn URL
                    </h4>
                    <a
                      href={formData.linkedInURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#406B98] hover:underline"
                    >
                      {formData.linkedInURL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setActiveSession("Experience")}
            className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
          >
            Next: Experience
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PersonalInfoSection;
