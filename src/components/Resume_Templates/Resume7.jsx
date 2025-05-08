import React from "react";

const Resume7 = ({ resumeData }) => {
  return (
    <div className="w-full bg-slate-50 p-6 rounded-lg shadow-md h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Modern Resume Preview</h2>
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center"
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

      <div className="resume-preview bg-white p-5 border border-gray-200 rounded-lg shadow-sm">
        {/* Two-column layout with sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - darker background with contact info and skills */}
          <div className="w-full md:w-1/3 bg-slate-800 text-white p-4 rounded-l-lg">
            {/* Profile Photo Placeholder (optional) */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden">
                <svg className="w-20 h-20 text-slate-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-emerald-500 pb-2 mb-3">CONTACT</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>{resumeData.personalInfo.email}</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{resumeData.personalInfo.address}</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-4 w-4 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                  </svg>
                  <a href={resumeData.personalInfo.linkedInURL} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-emerald-200">
                    {resumeData.personalInfo.linkedIn}
                  </a>
                </div>
              </div>
            </div>
            
            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-emerald-500 pb-2 mb-3">SKILLS</h2>
              
              <div className="mb-4">
                <h3 className="font-semibold text-emerald-400 mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <span key={index} className="bg-slate-700 px-2 py-1 rounded-md text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-emerald-400 mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.soft.map((skill, index) => (
                    <span key={index} className="bg-slate-700 px-2 py-1 rounded-md text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Certificates (moved to sidebar) */}
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-emerald-500 pb-2 mb-3">CERTIFICATES</h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {resumeData.certificates.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-White border-b border-slate-200 pb-1 mb-2">
                ACHIEVEMENTS
              </h2>
              <ul className="list-disc pl-5 text-xs text-white">
                {resumeData.achievements.map((achievement, index) => (
                  <li key={index} className="mb-1">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Organizations */}
            {resumeData.organizations.length > 0 && (
              <div>
                <h2 className="text-lg font-bold border-b border-emerald-500 pb-2 mb-3">ORGANIZATIONS</h2>
                {resumeData.organizations.map((org) => (
                  <div key={org.id} className="mb-2 text-sm">
                    <div className="font-bold text-emerald-400">{org.name}</div>
                    <div>{org.position}</div>
                    <div className="text-slate-300">{org.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right main content area */}
          <div className="w-full md:w-2/3 p-4">
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-slate-800">
                {resumeData.personalInfo.name}
              </h1>
              <div className="flex items-center">
                <span className="text-emerald-600 font-medium text-lg">{resumeData.personalInfo.role}</span>
                <div className="ml-3 h-px bg-emerald-600 flex-grow"></div>
              </div>
            </div>

            {/* Profile */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-emerald-700 border-b border-slate-200 pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h2>
              <p className="text-sm text-slate-700">{resumeData.profile}</p>
            </div>

            {/* Experience - Streamlined design */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-emerald-700 border-b border-slate-200 pb-1 mb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-800">{exp.position}</div>
                    <div className="text-xs text-slate-500">
                      {exp.startDate} – {exp.endDate}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="font-medium text-slate-600 text-sm">{exp.company}, {exp.location}</div>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-slate-700">
                    {exp.points.map((highlight, index) => (
                      <li key={index} className="mb-1">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education - Compact design */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-emerald-700 border-b border-slate-200 pb-1 mb-2">
                EDUCATION
              </h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <div className="font-bold text-slate-800">{edu.degree}</div>
                    <div className="text-xs text-slate-500">
                      {edu.startYear} – {edu.endYear}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div className="text-sm text-slate-600">{edu.institution}, {edu.location}</div>
                  </div>
                  <div className="text-xs text-slate-500">{edu.score}</div>
                </div>
              ))}
            </div>

            {/* Projects - Space-efficient formatting */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-emerald-700 border-b border-slate-200 pb-1 mb-2">
                PROJECTS
              </h2>
              {resumeData.projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <div className="font-bold text-slate-800">{project.title}</div>
                  <div className="font-medium text-slate-600 text-xs italic mb-1">
                    {project.subtitle}
                  </div>
                  <ul className="list-disc pl-5 text-xs text-slate-700">
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
            
          </div>
        </div>
      </div>

      {/* Print styles - optimized for single-page output while preserving format */}
      <style jsx global>{`
        @media print {
          @page {
            size: letter portrait;
            margin: 0.25cm;
          }

          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .resume-preview,
          .resume-preview * {
            visibility: visible !important;
          }

          .resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0 !important;
            padding: 8px !important;
            box-shadow: none !important;
            border: none !important;
          }

          /* Maintain column layout */
          .flex.flex-col.md\\:flex-row {
            display: flex !important;
            flex-direction: row !important;
          }

          /* Ensure sidebar stays proper width */
          .w-full.md\\:w-1\\/3 {
            width: 30% !important;
          }

          .w-full.md\\:w-2\\/3 {
            width: 70% !important;
          }

          /* Space optimization */
          .gap-6 {
            gap: 0.75rem !important;
          }

          .p-5 {
            padding: 0.75rem !important;
          }
          
          .p-4 {
            padding: 0.5rem !important;
          }

          .mb-6 {
            margin-bottom: 0.75rem !important;
          }

          .mb-5 {
            margin-bottom: 0.5rem !important;
          }

          .mb-4 {
            margin-bottom: 0.4rem !important;
          }

          .mb-3 {
            margin-bottom: 0.3rem !important;
          }

          .mb-2 {
            margin-bottom: 0.2rem !important;
          }

          .space-y-2 > * + * {
            margin-top: 0.2rem !important;
          }

          .gap-2 {
            gap: 0.2rem !important;
          }

          /* Font size optimizations */
          .text-2xl {
            font-size: 1.25rem !important;
          }

          .text-lg {
            font-size: 1rem !important;
          }

          .text-sm {
            font-size: 0.75rem !important;
          }

          .text-xs {
            font-size: 0.7rem !important;
          }

          /* Preserve colors */
          .bg-slate-800 {
            background-color: #1e293b !important;
          }

          .bg-slate-700 {
            background-color: #334155 !important;
          }

          .text-white {
            color: #ffffff !important;
          }

          .text-emerald-300, .text-emerald-400 {
            color: #6ee7b7 !important;
          }

          .text-emerald-600, .text-emerald-700 {
            color: #059669 !important;
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

          .text-slate-500 {
            color: #64748b !important;
          }

          .text-slate-300 {
            color: #cbd5e1 !important;
          }

          .border-emerald-500 {
            border-color: #10b981 !important;
          }

          .border-slate-200 {
            border-color: #e2e8f0 !important;
          }

          /* Preserve borders */
          .rounded-lg {
            border-radius: 0.25rem !important;
          }

          .border {
            border-width: 1px !important;
          }

          .border-b {
            border-bottom-width: 1px !important;
          }

          /* Hide button */
          button {
            display: none !important;
          }

          /* Skill tags */
          .bg-slate-700.px-2.py-1.rounded-md {
            background-color: #334155 !important;
            padding: 0.1rem 0.3rem !important;
            border-radius: 0.2rem !important;
            display: inline-block !important;
          }

          /* Preserve flex layouts */
          .flex {
            display: flex !important;
          }

          .flex-wrap {
            flex-wrap: wrap !important;
          }

          .justify-between {
            justify-content: space-between !important;
          }

          .items-baseline {
            align-items: baseline !important;
          }

          .items-center {
            align-items: center !important;
          }

          /* List styles */
          .list-disc {
            list-style-type: disc !important;
            padding-left: 1rem !important;
          }

          .space-y-1 > * + * {
            margin-top: 0.1rem !important;
          }

          /* Photo Placeholder */
          .w-32.h-32 {
            width: 5rem !important;
            height: 5rem !important;
          }

          .w-20.h-20 {
            width: 3rem !important;
            height: 3rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume7;