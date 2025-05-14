import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useResumeData } from "../../context/Resume_Data";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const SkillsSection = ({ isActive, setActiveSection, authUser }) => {
  const defaultResumeData = useResumeData();
  // Skills State
  const [skills, setSkills] = useState(defaultResumeData.skills);
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [editingTechnicalIndex, setEditingTechnicalIndex] = useState(null);
  const [editingSoftIndex, setEditingSoftIndex] = useState(null);

  // Certificates State
  const [certificates, setCertificates] = useState(
    defaultResumeData.certificates
  );
  const [newCertificate, setNewCertificate] = useState("");
  const [editingCertificateIndex, setEditingCertificateIndex] = useState(null);

  // Organizations State
  const [organizations, setOrganizations] = useState(
    defaultResumeData.organizations
  );
  const [isAddingOrg, setIsAddingOrg] = useState(false);
  const [editingOrgId, setEditingOrgId] = useState(null);
  const [newOrg, setNewOrg] = useState({
    name: "",
    position: "",
    location: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Skills Handlers
  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim() === "") return;

    if (editingTechnicalIndex !== null) {
      const updatedTechnical = [...skills.technical];
      updatedTechnical[editingTechnicalIndex] = newTechnicalSkill;
      setSkills({ ...skills, technical: updatedTechnical });
      setEditingTechnicalIndex(null);
    } else {
      setSkills({
        ...skills,
        technical: [...skills.technical, newTechnicalSkill],
      });
    }
    setNewTechnicalSkill("");
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() === "") return;

    if (editingSoftIndex !== null) {
      const updatedSoft = [...skills.soft];
      updatedSoft[editingSoftIndex] = newSoftSkill;
      setSkills({ ...skills, soft: updatedSoft });
      setEditingSoftIndex(null);
    } else {
      setSkills({
        ...skills,
        soft: [...skills.soft, newSoftSkill],
      });
    }
    setNewSoftSkill("");
  };

  const handleEditTechnicalSkill = (index) => {
    setNewTechnicalSkill(skills.technical[index]);
    setEditingTechnicalIndex(index);
  };

  const handleEditSoftSkill = (index) => {
    setNewSoftSkill(skills.soft[index]);
    setEditingSoftIndex(index);
  };

  const handleDeleteTechnicalSkill = (index) => {
    const updatedTechnical = skills.technical.filter((_, i) => i !== index);
    setSkills({ ...skills, technical: updatedTechnical });
  };

  const handleDeleteSoftSkill = (index) => {
    const updatedSoft = skills.soft.filter((_, i) => i !== index);
    setSkills({ ...skills, soft: updatedSoft });
  };

  // Certificate Handlers
  const handleAddCertificate = () => {
    if (newCertificate.trim() === "") return;

    if (editingCertificateIndex !== null) {
      const updatedCertificates = [...certificates];
      updatedCertificates[editingCertificateIndex] = newCertificate;
      setCertificates(updatedCertificates);
      setEditingCertificateIndex(null);
    } else {
      setCertificates([...certificates, newCertificate]);
    }
    setNewCertificate("");
  };

  const handleEditCertificate = (index) => {
    setNewCertificate(certificates[index]);
    setEditingCertificateIndex(index);
  };

  const handleDeleteCertificate = (index) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(updatedCertificates);
  };

  // Organization Handlers
  const handleOrgInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrg((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrg = () => {
    if (newOrg.name.trim() === "" || newOrg.position.trim() === "") return;

    const orgWithId = {
      ...newOrg,
      id: Date.now(),
    };

    setOrganizations([...organizations, orgWithId]);
    setNewOrg({
      name: "",
      position: "",
      location: "",
    });
    setIsAddingOrg(false);
  };

  const handleEditOrg = (id) => {
    const orgToEdit = organizations.find((org) => org.id === id);
    setNewOrg(orgToEdit);
    setEditingOrgId(id);
    setIsAddingOrg(true);
  };

  const handleUpdateOrg = () => {
    setOrganizations(
      organizations.map((org) =>
        org.id === editingOrgId ? { ...newOrg, id: editingOrgId } : org
      )
    );
    setNewOrg({
      name: "",
      position: "",
      location: "",
    });
    setEditingOrgId(null);
    setIsAddingOrg(false);
  };

  const handleDeleteOrg = (id) => {
    setOrganizations(organizations.filter((org) => org.id !== id));
  };

  if (!isActive) return null;
  const handleUpdate = async () => {
    if (!authUser) {
      console.error("No authenticated user found");
      return;
    }

    try {
      await updateDoc(doc(db, "users", authUser.uid), {
        skills: skills,
        certificates: certificates,
        organizations: organizations,
      });
      console.log(
        "Skills, certificates, and organizations updated successfully!"
      );

      setActiveSection("Projects");
      alert("Successfully Updated"); // Navigate to the next section after successful update
    } catch (error) {
      console.error("Error updating profile:", error);

      // You might want to show an error message to the user
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full"
    >
      {/* Skills Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-bold font-[Hanuman] text-[#406B98] mb-6">
          Skills
        </h2>

        {/* Technical Skills */}
        <div className="mb-8">
          <div className="md:flex justify-between items-center mb-4">
            <h3 className="text-lg mb-3 md:mb-0 font-semibold text-[#406B98]">
              Technical Skills
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTechnicalSkill}
                onChange={(e) => setNewTechnicalSkill(e.target.value)}
                placeholder="Add technical skill"
                className="border px-3 py-1 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
              />
              <button
                onClick={handleAddTechnicalSkill}
                className="px-3 py-1 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
              >
                {editingTechnicalIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            {skills.technical.length === 0 ? (
              <p className="text-gray-500 text-center">
                No technical skills added yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {skills.technical.map((skill, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center group bg-white p-3 rounded-md shadow-sm"
                  >
                    <span>{skill}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                      <button
                        onClick={() => handleEditTechnicalSkill(index)}
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTechnicalSkill(index)}
                        className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* <div className="mt-6 flex justify-end">
            <button
              onClick={() => setActiveSession("Experience")}
              className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
            >
              Update
            </button>
          </div> */}
        </div>

        {/* Soft Skills */}
        <div>
          <div className="md:flex justify-between items-center mb-4">
            <h3 className="text-lg mb-3 md:mb-0 font-semibold text-[#406B98]">
              Soft Skills
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                placeholder="Add soft skill"
                className="border px-3 py-1 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
              />
              <button
                onClick={handleAddSoftSkill}
                className="px-3 py-1 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
              >
                {editingSoftIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            {skills.soft.length === 0 ? (
              <p className="text-gray-500 text-center">
                No soft skills added yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white px-3 py-2 rounded-md shadow-sm flex items-center group"
                  >
                    <span>{skill}</span>
                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => handleEditSoftSkill(index)}
                        className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteSoftSkill(index)}
                        className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="md:flex justify-between items-center mb-6">
          <h2 className="text-2xl mb-3 md:mb-0   font-bold font-[Hanuman] text-[#406B98]">
            Certificates
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCertificate}
              onChange={(e) => setNewCertificate(e.target.value)}
              placeholder="Add certificate"
              className="border px-3 py-1 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
            />
            <button
              onClick={handleAddCertificate}
              className="px-3 py-1 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
            >
              {editingCertificateIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          {certificates.length === 0 ? (
            <p className="text-gray-500 text-center">
              No certificates added yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {certificates.map((certificate, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center group bg-white p-3 rounded-md shadow-sm"
                >
                  <span>{certificate}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button
                      onClick={() => handleEditCertificate(index)}
                      className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCertificate(index)}
                      className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Organizations Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex md:justify-between gap-4 items-center mb-6">
          <h2 className="text-2xl font-bold font-[Hanuman] text-[#406B98]">
            Organizations
          </h2>
          {!isAddingOrg && (
            <button
              onClick={() => setIsAddingOrg(true)}
              className="text-sm px-4 py-2 bg-[#406B98] text-white rounded hover:bg-[#335680] transition-colors"
            >
              Add Organization
            </button>
          )}
        </div>

        {isAddingOrg ? (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-[#406B98] mb-4">
              {editingOrgId ? "Edit Organization" : "Add New Organization"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newOrg.name}
                  onChange={handleOrgInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={newOrg.position}
                  onChange={handleOrgInputChange}
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
                  value={newOrg.location}
                  onChange={handleOrgInputChange}
                  className="w-full mt-1 border px-3 py-2 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  onClick={() => {
                    setIsAddingOrg(false);
                    setEditingOrgId(null);
                    setNewOrg({
                      name: "",
                      position: "",
                      location: "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingOrgId ? handleUpdateOrg : handleAddOrg}
                  className="px-6 py-2 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
                >
                  {editingOrgId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : organizations.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-500">No organizations added yet.</p>
            <button
              onClick={() => setIsAddingOrg(true)}
              className="mt-4 text-[#406B98] underline hover:text-[#335680]"
            >
              Add your first organization
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="bg-gray-50 p-4 rounded-lg relative group"
              >
                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => handleEditOrg(org.id)}
                    className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteOrg(org.id)}
                    className="p-1 bg-red-100 rounded-full hover:bg-red-200 text-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#406B98]">
                      {org.name}
                    </h3>
                    <p className="text-gray-700 font-medium">{org.position}</p>
                  </div>
                  <div className="text-gray-500 text-sm mt-2 md:mt-0 md:text-right">
                    <div>{org.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              handleUpdate();
            }}
            className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-6 flex  md:justify-between gap-7">
        <button
          onClick={() => setActiveSection("Education")}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors"
        >
          Back: Education
        </button>
        <button
          onClick={() => setActiveSection("Projects")}
          className="px-6 py-3 bg-[#406B98] text-white rounded font-medium hover:bg-[#335680] transition-colors"
        >
          Next: Projects
        </button>
      </div>
    </motion.div>
  );
};

export default SkillsSection;
