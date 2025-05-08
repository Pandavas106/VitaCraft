import React from "react";

const Resume6 = ({ resumeData }) => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full bg-slate-50 p-6 rounded-lg shadow-lg h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resume Preview</h2>
        <button
          onClick={handlePrint}
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

      <div className="resume-preview bg-white p-6 border border-slate-200 rounded-lg shadow-sm max-w-4xl mx-auto">
        {/* Header with name and title */}
        <div className="border-b-4 border-blue-500 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-lg text-blue-600 font-medium">{resumeData.personalInfo.role}</p>
        </div>

        {/* Two-column layout for the main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - 1/3 width */}
          <div className="md:w-1/3">
            {/* Contact Information */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Contact
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span className="text-slate-700">
                    {resumeData.personalInfo.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span className="text-slate-700">
                    {resumeData.personalInfo.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-slate-700">
                    {resumeData.personalInfo.address}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-blue-500 mr-2"
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
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {resumeData.personalInfo.linkedIn}
                  </a>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Education
              </h2>
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-blue-200 pl-3">
                    <div className="font-bold text-slate-800">{edu.degree}</div>
                    <div className="text-slate-700">{edu.institution}</div>
                    <div className="text-xs text-slate-600">{edu.location}</div>
                    <div className="text-xs text-slate-600">
                      {edu.startYear} – {edu.endYear}
                    </div>
                    <div className="text-xs text-slate-600">{edu.score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Skills
              </h2>
              <div className="mb-3">
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {resumeData.skills.technical.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2 text-sm">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.soft.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Certificates
              </h2>
              <ul className="text-sm text-slate-700 space-y-1">
                {resumeData.certificates.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
            {resumeData.organizations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                  Organizations
                </h2>
                <div className="space-y-2">
                  {resumeData.organizations.map((org) => (
                    <div
                      key={org.id}
                      className="border-l-2 border-blue-200 pl-3"
                    >
                      <div className="font-bold text-slate-800">{org.name}</div>
                      <div className="text-xs text-slate-600">
                        {org.position}
                      </div>
                      <div className="text-xs text-slate-600">
                        {org.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - 2/3 width */}
          <div className="md:w-2/3">
            {/* Profile */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-blue-700 mb-2 uppercase tracking-wider">
                Profile
              </h2>
              <p className="text-sm text-slate-700">{resumeData.profile}</p>
            </div>

            {/* Experience Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Experience
              </h2>
              <div className="space-y-4">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-blue-200 pl-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-800">
                        {exp.position}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {exp.startDate} – {exp.endDate}
                      </p>
                    </div>
                    <p className="text-sm text-slate-700 mb-1">
                      {exp.company} | {exp.location}
                    </p>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                      {exp.points.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Projects
              </h2>
              <div className="space-y-3">
                {resumeData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border-l-2 border-blue-200 pl-3"
                  >
                    <div className="font-bold text-slate-800">
                      {project.title}
                    </div>
                    <div className="text-xs text-slate-600 mb-1">
                      {project.subtitle}
                    </div>
                    <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1">
                      {project.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider">
                Achievements
              </h2>
              <ul className="list-disc pl-4 text-sm text-slate-700 space-y-1">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
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
            padding: 8px !important;
            box-shadow: none !important;
            border: none !important;
            font-size: 95% !important;
          }

          /* Optimize space usage */
          .mb-6 {
            margin-bottom: 10px !important;
          }

          .mb-5 {
            margin-bottom: 8px !important;
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

          .space-y-4 > * + * {
            margin-top: 6px !important;
          }

          .space-y-3 > * + * {
            margin-top: 5px !important;
          }

          .space-y-2 > * + * {
            margin-top: 3px !important;
          }

          .space-y-1 > * + * {
            margin-top: 2px !important;
          }

          .gap-6 {
            gap: 8px !important;
          }

          .gap-1 {
            gap: 2px !important;
          }

          .p-6 {
            padding: 10px !important;
          }

          .pb-4 {
            padding-bottom: 6px !important;
          }

          .pl-4 {
            padding-left: 12px !important;
          }

          .pl-3 {
            padding-left: 6px !important;
          }

          /* Heading sizes */
          h1.text-3xl {
            font-size: 1.4rem !important;
            margin-bottom: 2px !important;
          }

          h2.text-lg {
            font-size: 1rem !important;
            margin-bottom: 4px !important;
          }

          .text-lg {
            font-size: 1rem !important;
          }

          .text-sm {
            font-size: 0.8rem !important;
          }

          .text-xs {
            font-size: 0.7rem !important;
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

          /* Preserve background colors */
          .bg-white {
            background-color: white !important;
          }

          .bg-slate-50 {
            background-color: #f8fafc !important;
          }

          .bg-blue-100 {
            background-color: #dbeafe !important;
          }

          .bg-slate-200 {
            background-color: #e2e8f0 !important;
          }

          /* Preserve text colors */
          .text-blue-700 {
            color: #1d4ed8 !important;
          }

          .text-blue-600 {
            color: #2563eb !important;
          }

          .text-blue-800 {
            color: #1e40af !important;
          }

          .text-blue-500 {
            color: #3b82f6 !important;
          }

          .text-slate-800 {
            color: #1e293b !important;
          }

          .text-slate-700 {
            color: #334155 !important;
          }

          .text-slate-600 {
            color: #475569 !important;
          }

          /* Preserve borders */
          .border-b-4.border-blue-500 {
            border-bottom: 4px solid #3b82f6 !important;
          }

          .border-l-2.border-blue-200 {
            border-left: 2px solid #bfdbfe !important;
          }

          .border-slate-200 {
            border-color: #e2e8f0 !important;
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

          /* Fix lists */
          .list-disc {
            list-style-type: disc !important;
          }

          /* Fix SVG icons */
          svg {
            height: 0.8rem !important;
            width: 0.8rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume6;
