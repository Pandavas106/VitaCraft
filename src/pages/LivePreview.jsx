import { useState, useEffect } from "react";
import ResumePreview from "../components/LivePreview_Components/Resume_Preview";

const defaultResumeData = {
  personalInfo: {
    name: "Nelavalli Venkata Bhaskara Devi Phanindra",
    email: "nelavalliphanindra4@gmail.com",
    phone: "9989494236",
    address: "Intur,Guntur,AP-522341",
    shortName: "Nelavalli Phanindra",
    linkedIn: "Phanindra-Nelavalli",
  },
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology (B.Tech) in Computer Science Engineering",
      institution: "Vishnu Institute of Technology",
      score: "CGPA - 9.42",
      location: "Bhimavarm, India",
      startYear: "2022",
      endYear: "present",
    },
    {
      id: 2,
      degree: "Intermediate",
      institution: "K.V.S.R.T Junior College",
      score: "Percentage - 97.6%",
      location: "Chilumuru, India",
      startYear: "2020",
      endYear: "2022",
    },
    {
      id: 3,
      degree: "SSC",
      institution: "K.Z.P High School",
      score: "Percentage - 99%",
      location: "Intur, India",
      startYear: "2019",
      endYear: "2020",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      points: [
        "Developed and maintained the user interface using React and Tailwind CSS.",
        "Collaborated with backend developers to integrate APIs and optimize performance.",
        "Led a UI redesign that improved user engagement by 30%.",
      ],
    },
  ],

  profile:
    "Enthusiastic Computer Science Engineering student with a solid understanding of software development, web, and mobile application development. Interested in exploring new technologies, especially Machine Learning (ML) and Artificial Intelligence (AI). Looking for opportunities to apply skills in projects that contribute to technological progress and solve real-world problems.",
  skills: {
    technical: [
      "Programming Languages : Python, SQL, JavaScript",
      "Frontend Technologies : HTML, CSS, React.js",
      "Backend Technologies : Node.js,Express.js",
      "Android Development : Flutter, React Native(Basics)",
      "Data Analysis Tools : Pandas, NumPy",
      "Designing Tools : Figma",
    ],
    soft: [
      "Communication",
      "Team Collaboration",
      "Problem Resolution",
      "Time Organization",
      "Building Professional Relationships",
      "Logical Analysis",
    ],
  },
  certificates: [
    "Google Foundations of CyberSercurity in Coursera",
    "Paloalto CyberScurity",
    "AWS Academy Cloud Foundations",
  ],
  projects: [
    {
      id: 1,
      title: "Sign Bridge",
      subtitle: "Indian Sign Language Translator",
      points: [
        "Developed a cross-platform mobile app using Flutter to convert voice input to Indian Sign Language (ISL) visuals, serving 100+ users in the testing phase.",
        "Implemented Flask for backend services and API integration, reducing server response time by 20% and ensuring efficient data handling.",
        "Integrated Firebase for real-time database management and user authentication, achieving 99% reliability and secure user data storage.",
        "Applied Machine Learning models (BERT, Transformers) to achieve 85% accuracy in voice-to-text and text-to-sign language conversion across 500+ interactions.",
        "Enhanced communication accessibility, receiving 90% positive feedback from pilot users and recognition from mentors.",
      ],
    },
    {
      id: 2,
      title: "Lexica AR",
      subtitle: "Immersive Educational Tool",
      points: [
        "Created a mobile app with React Native and ViroReact, engaging 200+ students with AR features to simplify complex concepts.",
        "Integrated Firebase for real-time data management, personalized learning, and secure authentication, improving app efficiency by 30%.",
        "Designed AR models to visualize complex topics, increasing student comprehension by 40% based on feedback.",
        "Achieved a 95% AR content retrieval rate, reducing downtime and ensuring smooth access to resources.",
        "Boosted student participation and confidence by 25% through hands-on AR learning experiences.",
        "Bridged the gap between theoretical and practical learning, earning praise from educators",
      ],
    },
    {
      id: 3,
      title: "E-CELL",
      subtitle: "Entrepreneurship Resource & Event Platform",
      points: [
        "Developed and maintained the E-CELL website, supporting 500+ monthly users with entrepreneurship resources and event access.",
        "Added features like event registration and member login, increasing user engagement by 30% and improving access to resources for 200+ members.",
        "Integrated Three.js to create 3D visualizations of startups, increasing website engagement by 40%.",
        "Built UI components with React.js and backend services with Node.js/Express.js, improving website load times by 25%.",
        "Utilized Firebase for real-time event tracking and user authentication, achieving 99.9% uptime.",
      ],
    },
  ],
  achievements: [
    "Finalist in the Internal Hackathon of SIH at VITB, where I developed a solution to a practical problem, creating a working prototype.",
    "Finalist in the Spark Tank Competition at college, where I designed a solution and presented it to industry experts, receiving valuable feedback.",
    "Top 50 team in the DEMUX 24-Hour Hackathon at BVRIT Narsapur, where my team developed the AGRO-GENSIS app, collaborating to meet deadlines and deliver a functional prototype.",
  ],
  organizations: [
    {
      id: 1,
      name: "E-CELL VITB",
      position: "Techniccal Lead",
      location: "Bhimavaram, India",
    },
  ],
};

// Form component for each section
const FormSection = ({ title, children, isOpen, toggle }) => {
  return (
    <div className="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <div
        className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
        onClick={toggle}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};

// Input component for form fields
const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Textarea component for longer text
const TextareaField = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

// Array Fields component for handling arrays with add/remove functionality
const ArrayField = ({ items, setItems, renderItem, addNewItem }) => {
  return (
    <div className="mb-3">
      {items.map((item, index) => (
        <div key={index} className="mb-3 pb-3 border-b border-gray-200">
          {renderItem(item, index)}
          <button
            type="button"
            onClick={() => {
              const newItems = [...items];
              newItems.splice(index, 1);
              setItems(newItems);
            }}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addNewItem}
        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
      >
        Add Item
      </button>
    </div>
  );
};

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    education: false,
    profile: false,
    skills: false,
    certificates: false,
    projects: false,
    achievements: false,
    organizations: false,
  });

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleEducationChange = (e, index) => {
    const { name, value } = e.target;
    const newEducation = [...resumeData.education];
    newEducation[index] = {
      ...newEducation[index],
      [name]: value,
    };
    setResumeData({
      ...resumeData,
      education: newEducation,
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...resumeData.experience];
    if (field.startsWith("point-")) {
      const pointIndex = parseInt(field.split("-")[1]);
      newExperience[index].points[pointIndex] = value;
    } else {
      newExperience[index][field] = value;
    }
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const handleProfileChange = (e) => {
    setResumeData({
      ...resumeData,
      profile: e.target.value,
    });
  };

  const handleSkillsChange = (type, index, value) => {
    const newSkills = { ...resumeData.skills };
    newSkills[type][index] = value;
    setResumeData({
      ...resumeData,
      skills: newSkills,
    });
  };

  const handleCertificatesChange = (index, value) => {
    const newCertificates = [...resumeData.certificates];
    newCertificates[index] = value;
    setResumeData({
      ...resumeData,
      certificates: newCertificates,
    });
  };

  const handleProjectChange = (projectIndex, field, value) => {
    const newProjects = [...resumeData.projects];

    if (field.startsWith("point-")) {
      const pointIndex = parseInt(field.split("-")[1]);
      newProjects[projectIndex].points[pointIndex] = value;
    } else {
      newProjects[projectIndex] = {
        ...newProjects[projectIndex],
        [field]: value,
      };
    }

    setResumeData({
      ...resumeData,
      projects: newProjects,
    });
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...resumeData.achievements];
    newAchievements[index] = value;
    setResumeData({
      ...resumeData,
      achievements: newAchievements,
    });
  };

  const handleOrganizationChange = (e, index) => {
    const { name, value } = e.target;
    const newOrganizations = [...resumeData.organizations];
    newOrganizations[index] = {
      ...newOrganizations[index],
      [name]: value,
    };
    setResumeData({
      ...resumeData,
      organizations: newOrganizations,
    });
  };

  return (
    <div className="min-h-screen  p-5 bg-[#D0F6FE] py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md h-screen overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Edit Resume</h2>

          {/* Personal Information */}
          <FormSection
            title="Personal Information"
            isOpen={openSections.personalInfo}
            toggle={() => toggleSection("personalInfo")}
          >
            <InputField
              label="Full Name"
              name="name"
              value={resumeData.personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
            <InputField
              label="Short Name"
              name="shortName"
              value={resumeData.personalInfo.shortName}
              onChange={handlePersonalInfoChange}
            />
            <InputField
              label="Email"
              name="email"
              value={resumeData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              type="email"
            />
            <InputField
              label="Phone"
              name="phone"
              value={resumeData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
            <InputField
              label="Address"
              name="address"
              value={resumeData.personalInfo.address}
              onChange={handlePersonalInfoChange}
            />
            <InputField
              label="LinkedIn"
              name="linkedIn"
              value={resumeData.personalInfo.linkedIn}
              onChange={handlePersonalInfoChange}
            />
          </FormSection>

          {/* Education */}
          <FormSection
            title="Education"
            isOpen={openSections.education}
            toggle={() => toggleSection("education")}
          >
            <ArrayField
              items={resumeData.education}
              setItems={(newItems) =>
                setResumeData({ ...resumeData, education: newItems })
              }
              renderItem={(edu, index) => (
                <div>
                  <InputField
                    label="Degree"
                    name="degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                  <InputField
                    label="Institution"
                    name="institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                  <InputField
                    label="Score"
                    name="score"
                    value={edu.score}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                  <InputField
                    label="Location"
                    name="location"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                  <div className="flex gap-4">
                    <InputField
                      label="Start Year"
                      name="startYear"
                      value={edu.startYear}
                      onChange={(e) => handleEducationChange(e, index)}
                    />
                    <InputField
                      label="End Year"
                      name="endYear"
                      value={edu.endYear}
                      onChange={(e) => handleEducationChange(e, index)}
                    />
                  </div>
                </div>
              )}
              addNewItem={() => {
                const newEducation = [...resumeData.education];
                const newId = newEducation.length
                  ? Math.max(...newEducation.map((e) => e.id)) + 1
                  : 1;
                newEducation.push({
                  id: newId,
                  degree: "",
                  institution: "",
                  score: "",
                  location: "",
                  startYear: "",
                  endYear: "",
                });
                setResumeData({ ...resumeData, education: newEducation });
              }}
            />
          </FormSection>

          {/* Profile */}
          <FormSection
            title="Profile"
            isOpen={openSections.profile}
            toggle={() => toggleSection("profile")}
          >
            <TextareaField
              label="Profile Description"
              name="profile"
              value={resumeData.profile}
              onChange={handleProfileChange}
            />
          </FormSection>

          <FormSection
            title="Work Experience"
            isOpen={openSections.experience}
            toggle={() => toggleSection("experience")}
          >
            <ArrayField
              items={resumeData.experience}
              setItems={(newItems) =>
                setResumeData({ ...resumeData, experience: newItems })
              }
              renderItem={(exp, index) => (
                <div>
                  <InputField
                    label="Role / Job Title"
                    name={`role`}
                    value={exp.role}
                    onChange={(e) =>
                      handleExperienceChange(index, "role", e.target.value)
                    }
                  />
                  <InputField
                    label="Company"
                    name={`company`}
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                  />
                  <InputField
                    label="Location"
                    name={`location`}
                    value={exp.location}
                    onChange={(e) =>
                      handleExperienceChange(index, "location", e.target.value)
                    }
                  />
                  <InputField
                    label="Start Date"
                    name={`startDate`}
                    value={exp.startDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "startDate", e.target.value)
                    }
                  />
                  <InputField
                    label="End Date"
                    name={`endDate`}
                    value={exp.endDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "endDate", e.target.value)
                    }
                  />

                  <h5 className="text-sm font-medium mt-2 mb-1">
                    Work Highlights
                  </h5>
                  {exp.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start mb-2">
                      <textarea
                        value={point}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            `point-${pointIndex}`,
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newPoints = [...exp.points];
                          newPoints.splice(pointIndex, 1);
                          handleExperienceChange(index, "points", newPoints);
                        }}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newPoints = [...exp.points, ""];
                      handleExperienceChange(index, "points", newPoints);
                    }}
                    className="text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded"
                  >
                    Add Point
                  </button>
                </div>
              )}
              addNewItem={() => {
                const newExperience = [...resumeData.experience];
                const newId = newExperience.length
                  ? Math.max(...newExperience.map((e) => e.id)) + 1
                  : 1;
                newExperience.push({
                  id: newId,
                  role: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  points: [""],
                });
                setResumeData({ ...resumeData, experience: newExperience });
              }}
            />
          </FormSection>

          {/* Skills */}
          <FormSection
            title="Skills"
            isOpen={openSections.skills}
            toggle={() => toggleSection("skills")}
          >
            <h4 className="text-md font-medium mb-2">Technical Skills</h4>
            <ArrayField
              items={resumeData.skills.technical}
              setItems={(newItems) =>
                setResumeData({
                  ...resumeData,
                  skills: { ...resumeData.skills, technical: newItems },
                })
              }
              renderItem={(skill, index) => (
                <InputField
                  label={`Technical Skill ${index + 1}`}
                  name={`technical-${index}`}
                  value={skill}
                  onChange={(e) =>
                    handleSkillsChange("technical", index, e.target.value)
                  }
                />
              )}
              addNewItem={() => {
                const newSkills = { ...resumeData.skills };
                newSkills.technical.push("");
                setResumeData({ ...resumeData, skills: newSkills });
              }}
            />

            <h4 className="text-md font-medium mb-2 mt-4">Soft Skills</h4>
            <ArrayField
              items={resumeData.skills.soft}
              setItems={(newItems) =>
                setResumeData({
                  ...resumeData,
                  skills: { ...resumeData.skills, soft: newItems },
                })
              }
              renderItem={(skill, index) => (
                <InputField
                  label={`Soft Skill ${index + 1}`}
                  name={`soft-${index}`}
                  value={skill}
                  onChange={(e) =>
                    handleSkillsChange("soft", index, e.target.value)
                  }
                />
              )}
              addNewItem={() => {
                const newSkills = { ...resumeData.skills };
                newSkills.soft.push("");
                setResumeData({ ...resumeData, skills: newSkills });
              }}
            />
          </FormSection>

          {/* Certificates */}
          <FormSection
            title="Certificates"
            isOpen={openSections.certificates}
            toggle={() => toggleSection("certificates")}
          >
            <ArrayField
              items={resumeData.certificates}
              setItems={(newItems) =>
                setResumeData({ ...resumeData, certificates: newItems })
              }
              renderItem={(cert, index) => (
                <InputField
                  label={`Certificate ${index + 1}`}
                  name={`certificate-${index}`}
                  value={cert}
                  onChange={(e) =>
                    handleCertificatesChange(index, e.target.value)
                  }
                />
              )}
              addNewItem={() => {
                const newCertificates = [...resumeData.certificates];
                newCertificates.push("");
                setResumeData({
                  ...resumeData,
                  certificates: newCertificates,
                });
              }}
            />
          </FormSection>

          {/* Projects */}
          <FormSection
            title="Projects"
            isOpen={openSections.projects}
            toggle={() => toggleSection("projects")}
          >
            <ArrayField
              items={resumeData.projects}
              setItems={(newItems) =>
                setResumeData({ ...resumeData, projects: newItems })
              }
              renderItem={(project, index) => (
                <div>
                  <InputField
                    label="Project Title"
                    name={`title`}
                    value={project.title}
                    onChange={(e) =>
                      handleProjectChange(index, "title", e.target.value)
                    }
                  />
                  <InputField
                    label="Project Subtitle"
                    name={`subtitle`}
                    value={project.subtitle}
                    onChange={(e) =>
                      handleProjectChange(index, "subtitle", e.target.value)
                    }
                  />

                  <h5 className="text-sm font-medium mt-2 mb-1">
                    Project Points
                  </h5>
                  {project.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start mb-2">
                      <textarea
                        value={point}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            `point-${pointIndex}`,
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newPoints = [...project.points];
                          newPoints.splice(pointIndex, 1);
                          handleProjectChange(index, "points", newPoints);
                        }}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newPoints = [...project.points, ""];
                      handleProjectChange(index, "points", newPoints);
                    }}
                    className="text-xs bg-gray-200 hover:bg-gray-300 py-1 px-2 rounded"
                  >
                    Add Point
                  </button>
                </div>
              )}
              addNewItem={() => {
                const newProjects = [...resumeData.projects];
                const newId = newProjects.length
                  ? Math.max(...newProjects.map((p) => p.id)) + 1
                  : 1;
                newProjects.push({
                  id: newId,
                  title: "",
                  subtitle: "",
                  points: [""],
                });
                setResumeData({ ...resumeData, projects: newProjects });
              }}
            />
          </FormSection>

          {/* Achievements */}
          <FormSection
            title="Achievements"
            isOpen={openSections.achievements}
            toggle={() => toggleSection("achievements")}
          >
            <ArrayField
              items={resumeData.achievements}
              setItems={(newItems) =>
                setResumeData({ ...resumeData, achievements: newItems })
              }
              renderItem={(achievement, index) => (
                <TextareaField
                  label={`Achievement ${index + 1}`}
                  name={`achievement-${index}`}
                  value={achievement}
                  onChange={(e) =>
                    handleAchievementChange(index, e.target.value)
                  }
                />
              )}
              addNewItem={() => {
                const newAchievements = [...resumeData.achievements];
                newAchievements.push("");
                setResumeData({
                  ...resumeData,
                  achievements: newAchievements,
                });
              }}
            />
          </FormSection>

          {/* Organizations */}
          <FormSection
            title="Organizations"
            isOpen={openSections.organizations}
            toggle={() => toggleSection("organizations")}
          >
            <ArrayField
              items={resumeData.organizations}
              setItems={(newItems) =>
                setResumeData({ ...resumeData, organizations: newItems })
              }
              renderItem={(org, index) => (
                <div>
                  <InputField
                    label="Organization Name"
                    name="name"
                    value={org.name}
                    onChange={(e) => handleOrganizationChange(e, index)}
                  />
                  <InputField
                    label="Position"
                    name="position"
                    value={org.position}
                    onChange={(e) => handleOrganizationChange(e, index)}
                  />
                  <InputField
                    label="Location"
                    name="location"
                    value={org.location}
                    onChange={(e) => handleOrganizationChange(e, index)}
                  />
                </div>
              )}
              addNewItem={() => {
                const newOrganizations = [...resumeData.organizations];
                const newId = newOrganizations.length
                  ? Math.max(...newOrganizations.map((o) => o.id)) + 1
                  : 1;
                newOrganizations.push({
                  id: newId,
                  name: "",
                  position: "",
                  location: "",
                });
                setResumeData({
                  ...resumeData,
                  organizations: newOrganizations,
                });
              }}
            />
          </FormSection>
        </div>
        <ResumePreview resumeData={resumeData} />
      </div>
    </div>
  );
}
