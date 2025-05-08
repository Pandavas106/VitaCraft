import { useState } from "react";
import { Phone, Mail, Globe, Github, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function Resume() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "FIRST LAST",
    address: "123 Street Rd, Town, State 12345",
    phone: "123-456-7890",
    email: "email@gmail.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
  });
  const [education, setEducation] = useState({
    university: "Test University",
    degree: "Bachelor of Science in Computer Science",
    location: "City, State",
    period: "Sept. 2017 - May 2021",
    courses: [
      "Data Structures",
      "Algorithms Analysis",
      "Artificial Intelligence",
      "Systems Programming",
      "Software Methodology",
      "Computer Technology",
      "Computer Architecture",
    ],
  });

  const [experiences, setExperiences] = useState([
    {
      company: "Electronics Company",
      position: "Software Engineer Intern",
      location: "City, State",
      period: "May 2020 - August 2020",
      responsibilities: [
        "Developed a Python script to automatically perform a set of unit tests daily on a product in development in order to decrease the duration of quality assurance typically run by QA.",
        "Incorporated scripts using Python and PowerShell to aggregate XML test results into an organized format and to load the latest build on each of the iterations so that daily testing can be performed.",
        "Organized reporting scripts to collect all test results for the day, report a summary of testing run, and handle the automatic build rate and test files, running the tests, and generating a report of the results once per day.",
        "Explored ways to display the results of a daily report of the top issues numbers using HTML, Javascript, and CSS.",
      ],
    },
    {
      company: "Startup, Inc",
      position: "Front End Developer Intern",
      location: "City, State",
      period: "May 2019 - August 2019",
      responsibilities: [
        "Participated in the design of the front-end of a mobile application for iOS/Android using Xcode and Android Studio.",
        "Worked with Google Firebase to manage user inputted data across multiple platforms including web and mobile apps.",
        "Developed new functionality to the mobile application to allow users to create accounts to register and/or login.",
        "Utilized Android Studio as a development environment in order to visualize the application in both iOS and Android.",
      ],
    },
  ]);


  const [projects, setProjects] = useState([
    {
      name: "Gym Reservation Bot",
      technologies: "Python, Selenium, Google Cloud Console",
      period: "January 2021",
      details: [
        "Developed an automated bot using Python and Google Cloud in order to register myself for a timeslot at my school gym.",
        "Created a bot to automatically go to the school gym website, log in, and check for timeslots at preferred times.",
        "Created a Linux virtual machine to run on Google Cloud so that the program is able to run everyday from the cloud.",
        "Used Cron to schedule the program to execute automatically at a 4:45 every morning as a reservation is made for 48 hours before the timeslot.",
      ],
    },
    {
      name: "Ticket Price Calculator App",
      technologies: "Java, Android Studio",
      period: "November 2020",
      details: [
        "Created an Android application using Java and Android Studio to calculate ticket prices for trips to various places in NYC.",
        "Processed user inputted information in the back-end of the app to return a subtotal price based on the tickets selected.",
        "Utilized the layout and image features of XML file application in order to allow different screen to interact with each other.",
      ],
    },
    {
      name: "Transaction Management GUI",
      technologies: "Java, Eclipse, JavaFX",
      period: "October 2020",
      details: [
        "Designed a simple banking transaction system using Java to simulate the common functions of using a bank account.",
        "Created a system with a GUI which allows users to do actions such as creating an account, deposits, withdraw, but all in a visual manner.",
        "Implemented object-oriented programming practices such as inheritance to create different account types and databases.",
      ],
    },
  ]);

  
  const [skills, setSkills] = useState({
    languages: "Python, Java, C, HTML/CSS, JavaScript, SQL",
    devtools:
      "VS Code, Eclipse, Google Cloud Platform, Selenium, Android Studio",
    technologies: "Linux, Jenkins, GitHub, Jira, WordPress",
  });

  
  const [leadership, setLeadership] = useState({
    organization: "Fraternity",
    period: "Spring 2020 - Present",
    university: "University Name",
    details: [
      "Maintained a 4.0 star fraternity ranking for the Office of Fraternity and Sorority Affairs (highest possible ranking).",
      "Managed executive board of 5 members and ran weekly meetings to oversee progress in essential parts of the chapter.",
      "Led chapter members to work towards making the chapter more community service, academics, and unity.",
    ],
  });

  // Helper function to update personal info
  const updatePersonalInfo = (field, value) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  // Helper function to update education
  const updateEducation = (field, value) => {
    setEducation({ ...education, [field]: value });
  };

  // Helper function to update courses
  const updateCourses = (value) => {
    const coursesArray = value.split(",").map((item) => item.trim());
    updateEducation("courses", coursesArray);
  };

  // Helper function to update experiences
  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value,
    };
    setExperiences(updatedExperiences);
  };

  // Helper function to update experience responsibilities
  const updateResponsibilities = (index, value) => {
    const responsibilitiesArray = value
      .split("\n")
      .filter((item) => item.trim() !== "");
    updateExperience(index, "responsibilities", responsibilitiesArray);
  };

  // Helper function to update projects
  const updateProject = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  // Helper function to update project details
  const updateProjectDetails = (index, value) => {
    const detailsArray = value.split("\n").filter((item) => item.trim() !== "");
    updateProject(index, "details", detailsArray);
  };

  // Helper function to update skills
  const updateSkills = (field, value) => {
    setSkills({ ...skills, [field]: value });
  };

  // Helper function to update leadership
  const updateLeadership = (field, value) => {
    setLeadership({ ...leadership, [field]: value });
  };

  // Helper function to update leadership details
  const updateLeadershipDetails = (value) => {
    const detailsArray = value.split("\n").filter((item) => item.trim() !== "");
    updateLeadership("details", detailsArray);
  };

  // Functions to add and remove sections
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "New Company",
        position: "Position Title",
        location: "City, State",
        period: "Month Year - Month Year",
        responsibilities: ["Responsibility 1", "Responsibility 2"],
      },
    ]);
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: "New Project",
        technologies: "Technologies Used",
        period: "Month Year",
        details: ["Project detail 1", "Project detail 2"],
      },
    ]);
  };

  const removeProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const addCourse = () => {
    const updatedCourses = [...education.courses, "New Course"];
    updateEducation("courses", updatedCourses);
  };

  const removeCourse = (index) => {
    const updatedCourses = [...education.courses];
    updatedCourses.splice(index, 1);
    updateEducation("courses", updatedCourses);
  };

  const addLeadershipDetail = () => {
    const updatedDetails = [...leadership.details, "New leadership detail"];
    updateLeadership("details", updatedDetails);
  };

  const removeLeadershipDetail = (index) => {
    const updatedDetails = [...leadership.details];
    updatedDetails.splice(index, 1);
    updateLeadership("details", updatedDetails);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-gray-100 p-4">
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white p-4 rounded shadow overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4 text-center">Resume Editor</h2>

        {/* Personal Information Form */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={personalInfo.name}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={personalInfo.address}
                onChange={(e) => updatePersonalInfo("address", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={personalInfo.github}
                onChange={(e) => updatePersonalInfo("github", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Education Form */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold mb-2">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={education.university}
                onChange={(e) => updateEducation("university", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={education.degree}
                onChange={(e) => updateEducation("degree", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={education.location}
                onChange={(e) => updateEducation("location", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Period
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={education.period}
                onChange={(e) => updateEducation("period", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Relevant Coursework
              </label>
              <button
                type="button"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={addCourse}
              >
                <Plus size={16} className="mr-1" /> Add Course
              </button>
            </div>

            {education.courses.map((course, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={course}
                  onChange={(e) => {
                    const updatedCourses = [...education.courses];
                    updatedCourses[index] = e.target.value;
                    updateEducation("courses", updatedCourses);
                  }}
                />
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeCourse(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Form */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Experience</h3>
            <button
              type="button"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              onClick={addExperience}
            >
              <Plus size={16} className="mr-1" /> Add Experience
            </button>
          </div>

          {experiences.map((exp, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Job {index + 1}</h4>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 flex items-center"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 size={16} className="mr-1" /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(index, "location", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Period
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={exp.period}
                    onChange={(e) =>
                      updateExperience(index, "period", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Responsibilities (one per line)
                </label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  rows="4"
                  value={exp.responsibilities.join("\n")}
                  onChange={(e) =>
                    updateResponsibilities(index, e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No experience entries yet. Click "Add Experience" to create one.
            </div>
          )}
        </div>

        {/* Projects Form */}
        <div className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Projects</h3>
            <button
              type="button"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              onClick={addProject}
            >
              <Plus size={16} className="mr-1" /> Add Project
            </button>
          </div>

          {projects.map((project, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">Project {index + 1}</h4>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 flex items-center"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 size={16} className="mr-1" /> Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(index, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Technologies
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.technologies}
                    onChange={(e) =>
                      updateProject(index, "technologies", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Period
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    value={project.period}
                    onChange={(e) =>
                      updateProject(index, "period", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Details (one per line)
                </label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  rows="4"
                  value={project.details.join("\n")}
                  onChange={(e) => updateProjectDetails(index, e.target.value)}
                />
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No project entries yet. Click "Add Project" to create one.
            </div>
          )}
        </div>

        {/* Technical Skills Form */}
        <div className="mb-6 border-b pb-4">
          <h3 className="font-bold mb-2">Technical Skills</h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Languages
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={skills.languages}
                onChange={(e) => updateSkills("languages", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Developer Tools
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={skills.devtools}
                onChange={(e) => updateSkills("devtools", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Technologies/Frameworks
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={skills.technologies}
                onChange={(e) => updateSkills("technologies", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Leadership Form */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Leadership / Extracurricular</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={leadership.organization}
                onChange={(e) =>
                  updateLeadership("organization", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Period
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={leadership.period}
                onChange={(e) => updateLeadership("period", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                University
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={leadership.university}
                onChange={(e) => updateLeadership("university", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Leadership Details
              </label>
              <button
                type="button"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={addLeadershipDetail}
              >
                <Plus size={16} className="mr-1" /> Add Detail
              </button>
            </div>

            {leadership.details.map((detail, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  value={detail}
                  onChange={(e) => {
                    const updatedDetails = [...leadership.details];
                    updatedDetails[index] = e.target.value;
                    updateLeadership("details", updatedDetails);
                  }}
                />
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeLeadershipDetail(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded shadow overflow-y-auto max-h-screen">
        <div className="font-serif">
          {/* Header */}
          <header className="border-b-2 border-gray-800 pb-2 mb-4">
            <h1 className="text-center text-2xl font-bold tracking-wide">
              {personalInfo.name}
            </h1>
            <div className="flex justify-center flex-wrap gap-x-4 text-sm mt-1">
              <div className="flex items-center">
                <span>{personalInfo.address}</span>
              </div>
              <div className="flex items-center">
                <Phone size={14} className="mr-1" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={14} className="mr-1" />
                <span>{personalInfo.email}</span>
              </div>
              <div className="flex items-center">
                <Globe size={14} className="mr-1" />
                <span>{personalInfo.linkedin}</span>
              </div>
              <div className="flex items-center">
                <Github size={14} className="mr-1" />
                <span>{personalInfo.github}</span>
              </div>
            </div>
          </header>

          {/* Education Section */}
          <section className="mb-4">
            <h2 className="text-lg font-bold">Education</h2>
            <div className="flex justify-between">
              <div className="font-bold">{education.university}</div>
              <div className="text-right">{education.period}</div>
            </div>
            <div className="flex justify-between text-sm italic">
              <div>{education.degree}</div>
              <div>{education.location}</div>
            </div>
            <div className="mt-1">
              <div className="font-bold text-sm">Relevant Coursework:</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 text-sm">
                {education.courses.map((course, index) => (
                  <div key={index}>• {course}</div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mb-4">
            <h2 className="text-lg font-bold">Experience</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div className="font-bold">{exp.company}</div>
                  <div className="text-right">{exp.period}</div>
                </div>
                <div className="flex justify-between text-sm italic">
                  <div>{exp.position}</div>
                  <div>{exp.location}</div>
                </div>
                <ul className="list-disc ml-5 text-sm">
                  {exp.responsibilities.map((resp, rIndex) => (
                    <li key={rIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          <section className="mb-4">
            <h2 className="text-lg font-bold">Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div className="font-bold">
                    {project.name} |{" "}
                    <span className="font-normal italic">
                      {project.technologies}
                    </span>
                  </div>
                  <div className="text-right">{project.period}</div>
                </div>
                <ul className="list-disc ml-5 text-sm">
                  {project.details.map((detail, dIndex) => (
                    <li key={dIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Technical Skills Section */}
          <section className="mb-4">
            <h2 className="text-lg font-bold">Technical Skills</h2>
            <div className="text-sm">
              <div>
                <span className="font-bold">Languages:</span> {skills.languages}
              </div>
              <div>
                <span className="font-bold">Developer Tools:</span>{" "}
                {skills.devtools}
              </div>
              <div>
                <span className="font-bold">Technologies/Frameworks:</span>{" "}
                {skills.technologies}
              </div>
            </div>
          </section>

          {/* Leadership Section */}
          <section>
            <h2 className="text-lg font-bold">Leadership / Extracurricular</h2>
            <div className="mb-2">
              <div className="flex justify-between">
                <div className="font-bold">{leadership.organization}</div>
                <div className="text-right">{leadership.period}</div>
              </div>
              <div className="flex justify-between text-sm italic">
                <div></div>
                <div>{leadership.university}</div>
              </div>
              <ul className="list-disc ml-5 text-sm">
                {leadership.details.map((detail, dIndex) => (
                  <li key={dIndex}>{detail}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
