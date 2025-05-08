import React from "react";

const Resume4 = ({ resumeData }) => {
  const handlePrint = () => window.print();
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="resume-preview p-6 border border-gray-300 rounded-lg">
        {/* Header - Clean professional style */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800">
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-lg font-medium">{resumeData.personalInfo.role}</p>
          <div className="h-1 w-32 bg-blue-800 my-2"></div>
          <div className="flex flex-wrap gap-x-4 text-sm text-gray-700">
            <span className="flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              {resumeData.personalInfo.email}
            </span>
            <span className="flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              {resumeData.personalInfo.phone}
            </span>
            <span className="flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {resumeData.personalInfo.address}
            </span>
            <span className="flex items-center">
              <svg
                className="h-4 w-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href={resumeData.personalInfo.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit no-underline"
              >
                {resumeData.personalInfo.linkedIn}
              </a>
            </span>
          </div>
        </div>

        {/* Profile */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm">{resumeData.profile}</p>
        </div>

        {/* Experience - Added Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            PROFESSIONAL EXPERIENCE
          </h2>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <div className="font-bold text-blue-800">{exp.position}</div>
                  <div className="font-semibold">{exp.company}</div>
                </div>
                <div className="text-right text-sm">
                  <div>{exp.location}</div>
                  <div>
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 text-sm mt-2">
                {exp.points.map((highlight, index) => (
                  <li key={index} className="mb-1">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            EDUCATION
          </h2>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{edu.degree}</div>
                  <div>{edu.institution}</div>
                  <div className="text-sm">{edu.score}</div>
                </div>
                <div className="text-right text-sm">
                  <div>{edu.location}</div>
                  <div>
                    {edu.startYear} – {edu.endYear}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            SKILLS
          </h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pr-4">
              <h3 className="font-semibold mb-1 text-blue-800">
                Technical Skills
              </h3>
              <ul className="list-disc pl-5 text-sm">
                {resumeData.skills.technical.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold mb-1 text-blue-800">Soft Skills</h3>
              <ul className="list-disc pl-5 text-sm">
                {resumeData.skills.soft.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            PROJECTS
          </h2>
          {resumeData.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="font-bold text-blue-800">{project.title}</div>
              <div className="font-semibold text-sm italic mb-1">
                {project.subtitle}
              </div>
              <ul className="list-disc pl-5 text-sm">
                {project.points.map((point, index) => (
                  <li key={index} className="mb-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            CERTIFICATES
          </h2>
          <ul className="list-disc pl-5 text-sm">
            {resumeData.certificates.map((cert, index) => (
              <li key={index} className="mb-1">
                {cert}
              </li>
            ))}
          </ul>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
            ACHIEVEMENTS
          </h2>
          <ul className="list-disc pl-5 text-sm">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </div>

        {/* Organizations */}
        <div>
          {resumeData.organizations.length !== 0 && (
            <>
              <h2 className="text-lg font-bold bg-gray-100 p-2 border-l-4 border-blue-800 mb-2">
                ORGANIZATIONS
              </h2>
              {resumeData.organizations.map((org) => (
                <div key={org.id} className="flex justify-between mb-2">
                  <div>
                    <div className="font-bold">{org.name}</div>
                    <div className="text-sm">{org.position}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div>{org.location}</div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Optimized print styles for single-page output while preserving format */}
      <style jsx global>{`
        @media print {
          /* Basic print setup */
          @page {
            size: letter portrait;
            margin: 0.5cm;
          }

          /* Hide everything initially */
          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Only show the resume preview */
          .resume-preview,
          .resume-preview * {
            visibility: visible !important;
          }

          /* Position the resume preview at the top of the page */
          .resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0 !important;
            padding: 10px !important;
            box-shadow: none !important;
            border: none !important;
            font-size: 95% !important;
          }

          /* Optimize space usage */
          .mb-6 {
            margin-bottom: 12px !important;
          }

          .p-6 {
            padding: 12px !important;
          }

          .p-4 {
            padding: 10px !important;
          }

          .p-3 {
            padding: 8px !important;
          }

          .p-2 {
            padding: 6px !important;
          }

          .gap-6 {
            gap: 8px !important;
          }

          h1.text-3xl {
            font-size: 1.5rem !important;
            margin-bottom: 4px !important;
          }

          h2.text-lg {
            font-size: 1rem !important;
            margin-bottom: 4px !important;
          }

          .mb-3 {
            margin-bottom: 6px !important;
          }

          .mb-2 {
            margin-bottom: 4px !important;
          }

          .mb-5 {
            margin-bottom: 10px !important;
          }

          .mb-4 {
            margin-bottom: 8px !important;
          }

          .mb-1 {
            margin-bottom: 2px !important;
          }

          /* Keep the two-column layout */
          .flex.flex-wrap {
            display: flex !important;
          }

          /* Maintain column widths */
          .w-full.md\\:w-1\\/2 {
            width: 50% !important;
          }

          .pr-4 {
            padding-right: 16px !important;
          }

          /* Optimize list spacing */
          ul.list-disc {
            margin-top: 2px !important;
            margin-bottom: 4px !important;
            padding-left: 1.25rem !important;
          }

          /* Preserve background colors */
          .bg-gray-100 {
            background-color: #f3f4f6 !important;
          }

          .bg-blue-800 {
            background-color: #1e40af !important;
          }

          .h-1.w-32.bg-blue-800 {
            background-color: #1e40af !important;
            height: 4px !important;
            width: 8rem !important;
          }

          /* Preserve text colors */
          .text-blue-800 {
            color: #1e40af !important;
          }

          .text-gray-700 {
            color: #374151 !important;
          }

          /* Preserve borders */
          .border-l-4.border-blue-800 {
            border-left: 4px solid #1e40af !important;
          }

          /* Preserve rounded corners with slight optimization */
          .rounded-lg {
            border-radius: 0.25rem !important; /* Slightly reduced */
          }

          /* Hide the button */
          button {
            display: none !important;
          }

          /* Preserve flex between items in experience and education sections */
          .flex.justify-between {
            display: flex !important;
            justify-content: space-between !important;
          }

          .flex.justify-between.items-baseline {
            display: flex !important;
            justify-content: space-between !important;
            align-items: baseline !important;
          }

          .text-right {
            text-align: right !important;
          }

          /* Preserve font weights */
          .font-bold {
            font-weight: 700 !important;
          }

          .font-semibold {
            font-weight: 600 !important;
          }

          /* Preserve italic text */
          .italic {
            font-style: italic !important;
          }

          /* Correct spacing for the contact information section */
          .flex.flex-wrap.gap-x-4 {
            display: flex !important;
            flex-wrap: wrap !important;
            column-gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3">
      {title}
    </h2>
    {children}
  </div>
);
export default Resume4;
