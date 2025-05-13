import React from "react";

const Resume2 = ({ resumeData }) => {
  const handlePrint = () => window.print();
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md min-h-screen">
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

      <div className="resume-preview p-6 border border-gray-300 rounded-lg text-gray-800">
        {/* Modern Header with Background */}
        <div className="bg-blue-700 text-white p-6 rounded-t-lg mb-6">
          <h1 className="text-3xl font-bold text-center">
            {resumeData.personalInfo.name}
          </h1>
          <div className="flex flex-wrap justify-center mt-3 text-sm">
            <span className="mx-2 flex items-center">
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
              {resumeData.personalInfo.email}
            </span>
            <span className="mx-2 flex items-center">
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
              {resumeData.personalInfo.phone}
            </span>
            <span className="mx-2 flex items-center">
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
              {resumeData.personalInfo.address}
            </span>
            <div className="flex justify-center print:justify-center">
              <a
                href={resumeData.personalInfo.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 hover:no-underline text-white hover:underline print:flex-row print:items-center print:space-x-1"
              >
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>

                <span>{resumeData.personalInfo.linkedIn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">
            Professional Summary
          </h2>
          <p className="text-sm">{resumeData.profile}</p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column (2/3 width) */}
          <div className="w-full md:w-2/3">
            {/* Experience - newly added section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase border-b-2 border-gray-200 pb-1">
                Professional Experience
              </h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-5">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-gray-900">
                      {exp.position}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {exp.startDate} – {exp.endDate}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="text-sm font-semibold text-blue-600">
                      {exp.company}
                    </div>
                    <div className="text-sm">{exp.location}</div>
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {exp.points.map((point, index) => (
                      <li key={index} className="mb-1 text-gray-700">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase border-b-2 border-gray-200 pb-1">
                Key Projects
              </h2>
              {resumeData.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <div className="font-bold text-gray-900">{project.title}</div>
                  <div className="font-semibold text-sm italic mb-2 text-blue-600">
                    {project.subtitle}
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {project.points.map((point, index) => (
                      <li key={index} className="mb-1 text-gray-700">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mb-6 bg-gray-50 p-3 rounded-lg">
              <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">
                Achievements
              </h2>
              <ul className="text-sm">
                {resumeData.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="mb-1 pl-3 border-l-2 border-blue-500"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
            {resumeData.organizations.length > 0 && (
              <div className="mb-6 bg-gray-50 p-3 rounded-lg">
                <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">
                  Organizations
                </h2>
                {resumeData.organizations.map((org) => (
                  <div key={org.id} className="mb-2">
                    <div className="font-bold text-sm">{org.name}</div>
                    <div className="text-sm">{org.position}</div>
                    <div className="text-sm text-gray-600">{org.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column (1/3 width) */}
          <div className="w-full md:w-1/3">
            {/* Education */}
            <div className="mb-6 bg-gray-50 p-3 rounded-lg">
              <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">
                Education
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="font-bold text-gray-900">{edu.degree}</div>
                  <div className="text-sm font-medium">{edu.institution}</div>
                  <div className="text-sm text-gray-600">
                    {edu.startYear} – {edu.endYear}
                  </div>
                  <div className="text-sm">{edu.location}</div>
                  <div className="text-sm font-medium">{edu.score}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-6 bg-gray-50 p-3 rounded-lg">
              <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">
                Skills
              </h2>
              <div className="mb-3">
                <h3 className="font-semibold mb-1 text-sm text-gray-900">
                  Technical Skills
                </h3>
                <ul className="text-sm">
                  {resumeData.skills.technical.map((skill, index) => (
                    <li
                      key={index}
                      className="mb-1 pl-3 border-l-2 border-blue-500"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1 text-sm text-gray-900">
                  Soft Skills
                </h3>
                <ul className="text-sm">
                  {resumeData.skills.soft.map((skill, index) => (
                    <li
                      key={index}
                      className="mb-1 pl-3 border-l-2 border-blue-500"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Certificates */}
            <div className="mb-6 bg-gray-50 p-3 rounded-lg">
              <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase">
                Certifications
              </h2>
              <ul className="text-sm">
                {resumeData.certificates.map((cert, index) => (
                  <li
                    key={index}
                    className="mb-1 pl-3 border-l-2 border-blue-500"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
          </div>
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
          .bg-blue-700.text-white.p-6 {
            padding: 12px !important;
          }

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
          .flex.flex-col.md\\:flex-row.gap-6 {
            display: flex !important;
            flex-direction: row !important;
          }

          /* Maintain column widths */
          .w-full.md\\:w-2\\/3 {
            width: 66.666667% !important;
            padding-right: 8px !important;
          }

          .w-full.md\\:w-1\\/3 {
            width: 33.333333% !important;
            padding-left: 0 !important;
          }

          @media print {
            .print\:inline {
              display: inline !important;
            }
            .print\:flex-col {
              flex-direction: column !important;
            }
            .print\:items-start {
              align-items: flex-start !important;
            }
          }

          /* Optimize list spacing */
          ul.list-disc {
            margin-top: 2px !important;
            margin-bottom: 4px !important;
            padding-left: 1.25rem !important;
          }

          /* Preserve background colors */
          .bg-blue-700 {
            background-color: #1d4ed8 !important;
            color: white !important;
          }

          .bg-gray-50 {
            background-color: #f9fafb !important;
          }

          /* Preserve text colors */
          .text-blue-700 {
            color: #1d4ed8 !important;
          }

          .text-blue-600 {
            color: #2563eb !important;
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
          .border-l-2.border-blue-500 {
            border-left: 2px solid #3b82f6 !important;
          }

          .border-b-2.border-gray-200 {
            border-bottom: 1px solid #e5e7eb !important; /* Slightly thinner border */
          }

          /* Preserve rounded corners with slight optimization */
          .rounded-lg {
            border-radius: 0.25rem !important; /* Slightly reduced */
          }

          .rounded-t-lg {
            border-top-left-radius: 0.25rem !important; /* Slightly reduced */
            border-top-right-radius: 0.25rem !important; /* Slightly reduced */
          }

          /* Hide the button */
          button {
            display: none !important;
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

export default Resume2;
