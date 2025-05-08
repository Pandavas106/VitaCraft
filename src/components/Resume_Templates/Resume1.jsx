import React from "react";

const Resume1 = ({ resumeData }) => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4 no-print">
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

      <div className="resume-preview p-6 border border-gray-300 rounded-lg print:border-0 print:p-4 print:shadow-none">
        <div className="text-center mb-6 print:mb-4">
          <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
          <div className="flex flex-wrap justify-center gap-x-4 mt-1 text-sm text-gray-700">
            <span>{resumeData.personalInfo.email}</span>
            <span>{resumeData.personalInfo.phone}</span>
            <span>{resumeData.personalInfo.address}</span>
          </div>
          <div className="flex justify-center gap-x-4 mt-1 text-sm text-gray-700">
            <span>{resumeData.personalInfo.shortName}</span>
            <a
              href={resumeData.personalInfo.linkedInURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-inherit no-underline"
            >
              <span>{resumeData.personalInfo.linkedIn}</span>
            </a>
          </div>
        </div>

        {/* Education */}
        <Section title="EDUCATION">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{edu.degree}</div>
                  <div>{edu.institution}</div>
                  <div>{edu.score}</div>
                </div>
                <div className="text-right">
                  <div>{edu.location}</div>
                  <div>
                    {edu.startYear} – {edu.endYear}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Section>

        {/* Work Experience */}
        <Section title="WORK EXPERIENCE">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-3 print:mb-2">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold">{exp.role}</div>
                  <div className="text-sm">{exp.company}</div>
                </div>
                <div className="text-right text-sm">
                  <div>{exp.location}</div>
                  <div>
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
              </div>
              <ul className="list-disc pl-5 text-sm mt-1">
                {exp.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Profile */}
        <Section title="PROFILE">
          <p className="text-sm">{resumeData.profile}</p>
        </Section>

        {/* Skills */}
        <Section title="SKILLS">
          <div className="flex justify-around">
            <div className="w-full md:w-1/2">
              <h3 className="font-semibold mb-1">Technical Skills</h3>
              <ul className="list-disc pl-5 text-sm">
                {resumeData.skills.technical.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="font-semibold mb-1">Soft Skills</h3>
              <ul className="list-disc pl-5 text-sm">
                {resumeData.skills.soft.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Certificates */}
        <Section title="CERTIFICATES">
          <ul className="list-disc pl-5 text-sm">
            {resumeData.certificates.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </Section>

        {/* Projects */}
        <Section title="PROJECTS">
          {resumeData.projects.map((project) => (
            <div key={project.id} className="mb-3 print:mb-2">
              <div className="font-bold">{project.title}</div>
              <div className="font-semibold text-sm italic mb-1">
                {project.subtitle}
              </div>
              <ul className="list-disc pl-5 text-sm">
                {project.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Achievements */}
        <Section title="ACHIEVEMENTS">
          <ul className="list-disc pl-5 text-sm">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </Section>

        {/* Organizations */}
        {resumeData.organizations.length !== 0 && (
          <Section title="ORGANIZATIONS">
            {resumeData.organizations.map((org) => (
              <div key={org.id} className="flex justify-between mb-2">
                <div>
                  <div className="font-bold">{org.name}</div>
                  <div className="text-sm">{org.position}</div>
                </div>
                <div className="text-right">
                  <div>{org.location}</div>
                </div>
              </div>
            ))}
          </Section>
        )}
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          /* Hide everything except the resume content */
          body * {
            visibility: hidden;
          }
          
          /* Make container take full page */
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: visible;
          }
          
          /* Show only the resume preview */
          .resume-preview,
          .resume-preview * {
            visibility: visible;
          }
          
          /* Position resume for printing */
          .resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            page-break-inside: avoid;
            box-shadow: none;
          }
          
          /* Hide UI elements */
          .no-print {
            display: none !important;
          }
          
          /* Optimize for single page */
          .resume-preview {
            font-size: 11pt;
          }
          
          /* Spacing optimizations */
          .resume-preview h2 {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
          }
          
          .resume-preview .mb-6 {
            margin-bottom: 0.75rem;
          }
          
          .resume-preview .mb-4 {
            margin-bottom: 0.5rem;
          }
          
          .resume-preview .mb-3 {
            margin-bottom: 0.3rem;
          }
          
          .resume-preview .mb-2 {
            margin-bottom: 0.2rem;
          }
          
          /* No page breaks inside sections */
          .section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="section mb-6 print:mb-3">
    <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-3 print:mb-2 print:text-lg">
      {title}
    </h2>
    {children}
  </div>
);

export default Resume1;
