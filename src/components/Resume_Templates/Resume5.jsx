import React from "react";

const Resume5 = ({ resumeData }) => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full bg-neutral-100 p-6 rounded-lg shadow-lg h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <button
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md flex items-center"
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

      <div className="resume-preview bg-white max-w-4xl mx-auto shadow-md">
        {/* Header with name and split background */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-purple-900 text-white p-6">
            <h1 className="text-3xl font-light">
              {resumeData.personalInfo.shortName.split(" ")[0]}
              <span className="block font-bold text-4xl">
                {resumeData.personalInfo.shortName.split(" ")[1]}
              </span>
            </h1>
            <p className="mt-2 text-purple-200">
              {resumeData.personalInfo.role}
            </p>
          </div>
          <div className="md:w-3/5 bg-purple-100 p-6">
            <p className="text-sm text-neutral-700 leading-relaxed">
              {resumeData.profile}
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar */}
          <div className="md:w-2/5 bg-neutral-50 p-6">
            {/* Contact Section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase">
                Contact
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-purple-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-700">
                    {resumeData.personalInfo.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-purple-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-700">
                    {resumeData.personalInfo.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-purple-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-sm text-neutral-700">
                    {resumeData.personalInfo.address}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-purple-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <a
                    href={resumeData.personalInfo.linkedInURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-700 hover:text-purple-900"
                  >
                    {resumeData.personalInfo.linkedIn}
                  </a>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase">
                Skills
              </h2>
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-neutral-500 mb-2 uppercase">
                  Technical
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-neutral-500 mb-2 uppercase">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs rounded-full"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates Section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase">
                Certificates
              </h2>
              <div className="space-y-2">
                {resumeData.certificates.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm text-neutral-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase">
                Education
              </h2>
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-l-2 border-purple-300 pl-4 py-1"
                  >
                    <div className="font-semibold text-neutral-800">
                      {edu.degree}
                    </div>
                    <div className="text-sm text-neutral-600 font-medium">
                      {edu.institution}
                    </div>
                    <div className="text-xs text-neutral-500 flex justify-between">
                      <span>{edu.location}</span>
                      <span>
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      {edu.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {resumeData.organizations.length > 0 && (
              <div className="md:w-1/2">
                <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase flex items-center">
                  <div className="w-6 h-0.5 bg-purple-400 mr-2"></div>
                  Organizations
                </h2>
                <div className="space-y-3">
                  {resumeData.organizations.map((org) => (
                    <div
                      key={org.id}
                      className="border-l-2 border-purple-300 pl-3"
                    >
                      <div className="font-semibold text-neutral-800">
                        {org.name}
                      </div>
                      <div className="text-xs text-neutral-600">
                        {org.position}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {org.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Main content */}
          <div className="md:w-3/5 p-6">
            {/* Experience Section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase flex items-center">
                <div className="w-6 h-0.5 bg-purple-400 mr-2"></div>
                Experience
                <div className="w-full h-0.5 bg-purple-400 ml-2"></div>
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-purple-500"></div>
                    <div className="absolute left-1.5 top-3 w-0.5 h-full bg-purple-200"></div>
                    <div className="mb-1 flex justify-between">
                      <h3 className="font-bold text-neutral-800">
                        {exp.position}
                      </h3>
                      <p className="text-xs text-purple-600 font-medium">
                        {exp.startDate} – {exp.endDate}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-600 font-medium mb-2">
                      {exp.company} | {exp.location}
                    </p>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      {exp.points.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-8">
              <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase flex items-center">
                <div className="w-6 h-0.5 bg-purple-400 mr-2"></div>
                Projects
                <div className="w-full h-0.5 bg-purple-400 ml-2"></div>
              </h2>
              <div className="space-y-5">
                {resumeData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-neutral-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="font-bold text-neutral-800">
                      {project.title}
                    </div>
                    <div className="text-xs text-purple-600 mb-2">
                      {project.subtitle}
                    </div>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      {project.points.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 mr-2"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Organizations Sections in one row */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Achievements Section */}
              <div className="md:w-full">
                <h2 className="text-sm font-bold text-neutral-400 mb-4 tracking-widest uppercase flex items-center">
                  <div className="w-6 h-0.5 bg-purple-400 mr-2"></div>
                  Achievements
                </h2>
                <ul className="space-y-2">
                  {resumeData.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-1 mr-2"></div>
                      <span className="text-sm text-neutral-700">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organizations Section */}
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
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
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            font-size: 95% !important;
          }

          /* Optimize space usage */
          .p-6 {
            padding: 8px !important;
          }

          .p-4 {
            padding: 6px !important;
          }

          .pl-6 {
            padding-left: 16px !important;
          }

          .pl-4 {
            padding-left: 12px !important;
          }

          .pl-3 {
            padding-left: 8px !important;
          }

          .mb-8 {
            margin-bottom: 12px !important;
          }

          .mb-4 {
            margin-bottom: 6px !important;
          }

          .mb-3 {
            margin-bottom: 4px !important;
          }

          .mb-2 {
            margin-bottom: 3px !important;
          }

          .mb-1 {
            margin-bottom: 2px !important;
          }

          .mt-2 {
            margin-top: 3px !important;
          }

          .mt-1 {
            margin-top: 2px !important;
          }

          .mr-3 {
            margin-right: 6px !important;
          }

          .mr-2 {
            margin-right: 4px !important;
          }

          .gap-6 {
            gap: 8px !important;
          }

          .gap-2 {
            gap: 3px !important;
          }

          .space-y-6 > * + * {
            margin-top: 8px !important;
          }

          .space-y-5 > * + * {
            margin-top: 6px !important;
          }

          .space-y-4 > * + * {
            margin-top: 5px !important;
          }

          .space-y-3 > * + * {
            margin-top: 4px !important;
          }

          .space-y-2 > * + * {
            margin-top: 3px !important;
          }

          .space-y-1 > * + * {
            margin-top: 2px !important;
          }

          /* Font sizes */
          .text-4xl {
            font-size: 1.5rem !important;
          }

          .text-3xl {
            font-size: 1.25rem !important;
          }

          .text-xl {
            font-size: 1rem !important;
          }

          .text-sm {
            font-size: 0.8rem !important;
          }

          .text-xs {
            font-size: 0.7rem !important;
          }

          /* Layout */
          .flex.flex-col.md\\:flex-row {
            display: flex !important;
            flex-direction: row !important;
          }

          .md\\:w-2\\/5 {
            width: 40% !important;
          }

          .md\\:w-3\\/5 {
            width: 60% !important;
          }

          .md\\:w-1\\/2 {
            width: 50% !important;
          }

          /* Icons and visual elements */
          .w-8.h-8 {
            width: 20px !important;
            height: 20px !important;
          }

          .w-6 {
            width: 16px !important;
          }

          .w-3.h-3 {
            width: 8px !important;
            height: 8px !important;
          }

          .w-2.h-2 {
            width: 6px !important;
            height: 6px !important;
          }

          .w-1.h-1 {
            width: 3px !important;
            height: 3px !important;
          }

          .h-0.5 {
            height: 1px !important;
          }

          .w-0.5 {
            width: 1px !important;
          }

          /* Colors */
          .bg-purple-900 {
            background-color: #581c87 !important;
          }

          .bg-purple-500 {
            background-color: #a855f7 !important;
          }

          .bg-purple-400 {
            background-color: #c084fc !important;
          }

          .bg-purple-300 {
            background-color: #d8b4fe !important;
          }

          .bg-purple-200 {
            background-color: #e9d5ff !important;
          }

          .bg-purple-100 {
            background-color: #f3e8ff !important;
          }

          .bg-neutral-200 {
            background-color: #e5e5e5 !important;
          }

          .bg-neutral-100 {
            background-color: #f5f5f5 !important;
          }

          .bg-neutral-50 {
            background-color: #fafafa !important;
          }

          .bg-white {
            background-color: #ffffff !important;
          }

          .text-purple-900 {
            color: #581c87 !important;
          }

          .text-purple-700 {
            color: #7e22ce !important;
          }

          .text-purple-600 {
            color: #9333ea !important;
          }

          .text-purple-500 {
            color: #a855f7 !important;
          }

          .text-purple-400 {
            color: #c084fc !important;
          }

          .text-purple-200 {
            color: #e9d5ff !important;
          }

          .text-neutral-800 {
            color: #262626 !important;
          }

          .text-neutral-700 {
            color: #404040 !important;
          }

          .text-neutral-600 {
            color: #525252 !important;
          }

          .text-neutral-500 {
            color: #737373 !important;
          }

          .text-neutral-400 {
            color: #a3a3a3 !important;
          }

          .text-white {
            color: #ffffff !important;
          }

          /* Borders */
          .border-l-2.border-purple-300 {
            border-left: 2px solid #d8b4fe !important;
          }

          .rounded-lg {
            border-radius: 0.5rem !important;
          }

          .rounded-full {
            border-radius: 9999px !important;
          }

          /* Hide the print button */
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume5;
