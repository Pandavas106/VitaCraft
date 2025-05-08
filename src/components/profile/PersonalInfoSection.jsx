import React, { useState } from "react";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    title: "Frontend Developer",
    email: "john@example.com",
    phone: "123-456-7890",
    location: "New York",
    website: "https://johndoe.dev",
    summary: "I build responsive and user-friendly interfaces using React & Tailwind CSS.",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div >
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-wide drop-shadow-sm">
  Personal Information
</h2>
      {/* Profile Image + Name + Title */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200 text-gray-500 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        {isEditing && (
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-3 text-sm text-gray-600"
          />
        )}

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          {formData.firstName} {formData.lastName}
        </h1>
        <p className="text-blue-600 font-medium text-lg">{formData.title}</p>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Details Section */}
      <div className="mt-8 space-y-4 text-left text-gray-700">
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {["email", "phone", "location", "website"].map((field, i) => (
              <div key={i}>
                <label className="text-sm font-semibold text-gray-600 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-600">Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows="4"
                className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p>
              <strong>Website:</strong>{" "}
              <a href={formData.website} className="text-blue-500 underline">
                {formData.website}
              </a>
            </p>
            <p><strong>Summary:</strong> {formData.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
