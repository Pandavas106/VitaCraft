import React from "react";

const Resume3 = ({ resumeData }) => {
  const handlePrint = () => window.print();
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow-lg h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
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

      <div className="resume-preview bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
        {/* Two-column header */}
        <div className="flex flex-col md:flex-row mb-6">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-800">
              {resumeData.personalInfo.name}
            </h1>
            <p className="text-lg text-gray-600 mt-1">Software Engineer</p>
            <p className="text-sm mt-4 text-gray-700">{resumeData.profile}</p>
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0 md:text-right">
            <div className="flex items-center justify-start md:justify-end mb-1">
              <svg
                className="h-4 w-4 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>{resumeData.personalInfo.email}</span>
            </div>
            <div className="flex items-center justify-start md:justify-end mb-1">
              <svg
                className="h-4 w-4 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span>{resumeData.personalInfo.phone}</span>
            </div>
            <div className="flex items-center justify-start md:justify-end mb-1">
              <svg
                className="h-4 w-4 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>{resumeData.personalInfo.address}</span>
            </div>
            <div className="flex items-center justify-start md:justify-end">
              <svg
                className="h-4 w-4 text-green-600 mr-2"
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
                href={`${resumeData.personalInfo.linkedInURL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-inherit no-underline"
              >
                {resumeData.personalInfo.linkedIn}
              </a>
            </div>
          </div>
        </div>

        {/* Main two-column layout for content */}
        <div className="flex flex-col md:flex-row">
          {/* Left column - 2/3 width */}
          <div className="md:w-2/3 md:pr-6">
            {/* Experience Section - Added */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
                EXPERIENCE
              </h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex flex-col md:flex-row md:justify-between mb-1">
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-sm text-gray-600">
                      {exp.startDate} – {exp.endDate}
                    </p>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">
                    {exp.company} | {exp.location}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {exp.points.map((highlight, index) => (
                      <li key={index} className="mb-1">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
                PROJECTS
              </h2>
              {resumeData.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="font-bold text-gray-800">{project.title}</div>
                  <div className="font-medium text-gray-600 text-sm mb-1">
                    {project.subtitle}
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {project.points.map((point, index) => (
                      <li key={index} className="mb-1">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-200">
                ACHIEVEMENTS
              </h2>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index} className="mb-2">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column - 1/3 width */}
          <div className="md:w-1/3">
            {/* Education */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-green-700 mb-3">
                EDUCATION
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="font-bold text-gray-800">{edu.degree}</div>
                  <div className="text-gray-700">{edu.institution}</div>
                  <div className="text-sm text-gray-600">{edu.location}</div>
                  <div className="text-sm text-gray-600">
                    {edu.startYear} – {edu.endYear}
                  </div>
                  <div className="text-sm text-gray-600">{edu.score}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-green-700 mb-3">SKILLS</h2>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resumeData.skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-green-700 mb-3">
                CERTIFICATES
              </h2>
              <ul className="text-sm text-gray-600 space-y-2">
                {resumeData.certificates.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-4 w-4 text-green-600 mr-2 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
            {resumeData.organizations.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-green-700 mb-3">
                  ORGANIZATIONS
                </h2>
                {resumeData.organizations.map((org) => (
                  <div key={org.id} className="mb-2">
                    <div className="font-bold text-gray-800">{org.name}</div>
                    <div className="text-sm text-gray-600">{org.position}</div>
                    <div className="text-sm text-gray-600">{org.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced print-specific styles */}
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

          .p-8 {
            padding: 12px !important;
          }

          .p-6 {
            padding: 12px !important;
          }

          .p-4 {
            padding: 10px !important;
          }

          .mb-4 {
            margin-bottom: 8px !important;
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

          .mb-1 {
            margin-bottom: 2px !important;
          }
          
          .gap-2 {
            gap: 4px !important;
          }
          
          .space-y-2 > * + * {
            margin-top: 4px !important;
          }

          /* Heading sizes */
          h1.text-4xl {
            font-size: 1.5rem !important;
            margin-bottom: 4px !important;
          }

          h2.text-xl {
            font-size: 1rem !important;
            margin-bottom: 4px !important;
          }

          .pb-2 {
            padding-bottom: 2px !important;
          }

          /* Keep the two-column layout */
          .flex.flex-col.md\\:flex-row {
            display: flex !important;
            flex-direction: row !important;
          }

          /* Maintain column widths */
          .md\\:w-2\\/3 {
            width: 66.666667% !important;
          }

          .md\\:w-1\\/3 {
            width: 33.333333% !important;
          }
          
          .md\\:pr-6 {
            padding-right: 0.75rem !important;
          }

          /* Make sure flex layouts work properly on print */
          .flex.flex-col.md\\:flex-row.md\\:justify-between {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
          }

          .md\\:text-right {
            text-align: right !important;
          }
          
          .md\\:justify-end {
            justify-content: flex-end !important;
          }

          /* Optimize list spacing */
          ul.list-disc {
            margin-top: 2px !important;
            margin-bottom: 4px !important;
            padding-left: 1.25rem !important;
          }

          /* Preserve background colors */
          .bg-white {
            background-color: white !important;
          }

          .bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          .bg-green-100 {
            background-color: #d1fae5 !important;
          }
          
          .bg-gray-200 {
            background-color: #e5e7eb !important;
          }

          /* Preserve text colors */
          .text-green-700 {
            color: #047857 !important;
          }
          
          .text-green-800 {
            color: #065f46 !important;
          }

          .text-green-600 {
            color: #059669 !important;
          }

          .text-gray-900 {
            color: #111827 !important;
          }

          .text-gray-800 {
            color: #1f2937 !important;
          }

          .text-gray-700 {
            color: #374151 !important;
          }

          .text-gray-600 {
            color: #4b5563 !important;
          }

          /* Preserve borders */
          .border-b-2.border-green-200 {
            border-bottom: 2px solid #a7f3d0 !important;
          }
          
          .border-gray-200 {
            border-color: #e5e7eb !important;
          }

          /* Preserve rounded corners */
          .rounded-lg {
            border-radius: 0.5rem !important;
          }
          
          .rounded {
            border-radius: 0.25rem !important;
          }

          /* Hide the button */
          button {
            display: none !important;
          }
          
          /* Fix skills tags spacing */
          .flex.flex-wrap.gap-2 {
            display: flex !important;
            flex-wrap: wrap !important;
          }
          
          /* Fix certificate list items */
          .flex.items-start {
            display: flex !important;
            align-items: flex-start !important;
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
export default Resume3;