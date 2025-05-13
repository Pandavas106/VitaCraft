import React, { useRef, useState } from "react";

export default function CoverLetter3({
  coverLetterContent,
  userData,
  jobDetails,
  isEditing,
  setIsEditing,
  editableCoverLetter,
  setEditableCoverLetter,
  isLoading,
}) {
  const letterRef = useRef(null);
  const [previewMode, setPreviewMode] = useState("modern"); // "modern" or "classic"

  // Format the current date in a professional format
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Process userData to handle null or undefined values safely
  const personalInfo = userData?.personalInfo || {};
  const name = personalInfo.name || "Your Name";
  const address = personalInfo.address || "Your Address";
  const city = personalInfo.city || "City";
  const state = personalInfo.state || "State";
  const zip = personalInfo.zip || "ZIP";
  const phone = personalInfo.phone || "Your Phone";
  const email = personalInfo.email || "Your Email";
  const linkedin = personalInfo.linkedin || "";
  const role = personalInfo.role || "Professional";

  // Extract skills with fallbacks
  const technicalSkills = userData?.skills?.technical || [];
  const softSkills = userData?.skills?.soft || [];
  const displayTechnicalSkills =
    technicalSkills.length > 0
      ? technicalSkills.slice(0, 3).join(", ")
      : "technical expertise";
  const displaySoftSkills =
    softSkills.length > 0
      ? softSkills.slice(0, 2).join(" and ")
      : "communication skills";

  // Get recent experience if available
  const recentExperience =
    userData?.experience && userData.experience.length > 0
      ? userData.experience[0]
      : null;

  // Generate a fallback cover letter that uses actual user data instead of placeholders
  const generateFallbackContent = () => {
    return `I am writing to express my interest in the ${
      jobDetails?.position || "Position"
    } position at ${
      jobDetails?.company || "Company Name"
    }. With my background as a ${role} and expertise in ${displayTechnicalSkills}, I am confident in my ability to make valuable contributions to your team.

${
  recentExperience
    ? `During my time as a ${recentExperience.role} at ${
        recentExperience.company
      }, I ${
        recentExperience.description || "gained valuable industry experience"
      }.`
    : "Through my professional experience, I have developed the skills necessary to excel in this role."
} My technical expertise includes ${displayTechnicalSkills}, and I have a proven track record of ${displaySoftSkills}.

I am particularly drawn to ${
      jobDetails?.company || "Company Name"
    } because of its reputation for excellence and innovation. I am excited about the opportunity to contribute my skills in ${
      technicalSkills.slice(0, 2).join(" and ") || "relevant areas"
    } to help achieve your goals.

Thank you for considering my application. I look forward to the possibility of discussing how my background, technical skills, and enthusiasm would make me a strong addition to your team.`;
  };

  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };

  // Handle saving changes
  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  // Render content based on presence of placeholders or loading state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-r-transparent border-b-blue-600 border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">
            Generating your cover letter...
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This may take a few moments
          </p>
        </div>
      );
    } else if (isEditing) {
      return (
        <textarea
          value={editableCoverLetter}
          onChange={(e) => setEditableCoverLetter(e.target.value)}
          className="w-full bg-white p-6 rounded-md border border-gray-200 min-h-64 whitespace-pre-wrap font-serif text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      );
    } else {
      // Check for any placeholder patterns that might have slipped through
      const hasPlaceholders =
        coverLetterContent &&
        (/\[[^\]]+\]/.test(coverLetterContent) ||
          /{[^}]+}/.test(coverLetterContent) ||
          /\([^)]+\)/.test(coverLetterContent) ||
          /your\s+(experience|skill|project|achievement)/i.test(
            coverLetterContent
          ));

      // Use the provided content or fallback if it contains placeholders or is empty
      const contentToDisplay =
        coverLetterContent && !hasPlaceholders
          ? coverLetterContent
          : generateFallbackContent();

      return (
        <div className="space-y-6 whitespace-pre-wrap">
          {contentToDisplay.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-800 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-white max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden print:shadow-none">
      {/* View toggle - not shown in print */}
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center print:hidden">
        <h2 className="font-medium text-gray-700">Cover Letter</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setPreviewMode("modern")}
            className={`px-3 py-1 rounded-md text-sm ${
              previewMode === "modern"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Modern
          </button>
          <button
            onClick={() => setPreviewMode("classic")}
            className={`px-3 py-1 rounded-md text-sm ${
              previewMode === "classic"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Classic
          </button>
        </div>
      </div>

      {/* Modern Layout - only shows when modern is selected */}
      {previewMode === "modern" && (
        <div 
          className="print-area w-full" 
          id="printable-content" 
          ref={letterRef}
        >
          {/* Modern Header with Accent */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-8 px-8 print:py-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{name}</h1>
              <p className="text-blue-100 mt-1">{role}</p>
              
              {/* Contact info row */}
              <div className="flex flex-wrap items-center mt-4 text-sm space-x-4">
                <span className="flex items-center text-blue-50">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {email}
                </span>
                <span className="flex items-center text-blue-50">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  {phone}
                </span>
                {linkedin && (
                  <span className="flex items-center text-blue-50">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 font-serif text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {/* Date */}
            <div className="mb-6 text-right text-gray-600">
              <p>{formattedDate}</p>
            </div>

            {/* Recipient Details */}
            <div className="mb-6">
              <p className="font-medium">Hiring Manager</p>
              <p>{jobDetails?.company || "Company Name"}</p>
              <p>{jobDetails?.companyAddress || "Company Address"}</p>
            </div>

            {/* Greeting */}
            <div className="mb-6">
              <p className="font-medium text-gray-800">
                Subject: Application for {jobDetails?.position || "Position"} Position
              </p>
              {/* <p className="mt-4">Dear Hiring Manager,</p> */}
            </div>

            {/* Cover Letter Content */}
            <div className="mb-8">
              {renderContent()}
            </div>

            {/* Signature */}
            {!isLoading && (
              <div className="mt-8 border-t pt-4 border-gray-200">
                <p>Sincerely,</p>
                <p className="font-bold mt-4">{name}</p>
                <p className="text-gray-600">{role}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Classic Layout - only shows when classic is selected */}
      {previewMode === "classic" && (
        <div 
          className="print-area w-full" 
          id="printable-content" 
          ref={letterRef}
        >
          <div className="p-8 font-serif max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 pb-4 border-b border-gray-300">
              <h1 className="text-2xl font-bold mb-1">{name}</h1>
              <p className="text-gray-600">{role}</p>
              <div className="flex justify-center flex-wrap gap-x-6 mt-2 text-sm text-gray-700">
                <span>{address}, {city}, {state} {zip}</span>
                <span>{phone}</span>
                <span>{email}</span>
              </div>
            </div>

            {/* Date */}
            <div className="mb-6 text-gray-600">
              <p>{formattedDate}</p>
            </div>

            {/* Recipient Details */}
            <div className="mb-6">
              <p className="font-medium">Hiring Manager</p>
              <p>{jobDetails?.company || "Company Name"}</p>
              <p>{jobDetails?.companyAddress || "Company Address"}</p>
            </div>

            {/* Greeting */}
            <div className="mb-6">
              {/* <p>Dear Hiring Manager,</p> */}
            </div>

            {/* Cover Letter Content */}
            <div className="mb-8 text-gray-800 leading-relaxed">
              {renderContent()}
            </div>

            {/* Signature */}
            {!isLoading && (
              <div className="mt-8">
                <p>Sincerely,</p>
                <p className="font-bold mt-4">{name}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="bg-gray-50 p-4 flex flex-wrap justify-end gap-3 print:hidden">
        {!isLoading && isEditing ? (
          <button
            onClick={handleSaveChanges}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center gap-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Save Changes
          </button>
        ) : (
          !isLoading && (
            <button
              onClick={() => setIsEditing(true)}
              className="py-2 px-4 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 font-medium flex items-center gap-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Edit Letter
            </button>
          )
        )}

        {!isLoading && (
          <>
            <button
              onClick={handlePrint}
              className="py-2 px-4 bg-blue-600 no-print text-white rounded-md hover:bg-blue-700 font-medium flex items-center gap-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print
            </button>
            <button
              onClick={() => {
                const blob = new Blob(
                  [
                    editableCoverLetter ||
                      coverLetterContent ||
                      generateFallbackContent(),
                  ],
                  { type: "text/plain" }
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Cover_Letter_${
                  jobDetails?.company || "Company"
                }_${jobDetails?.position || "Position"}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium flex items-center gap-1 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
          </>
        )}
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin:7mm;
          }

          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .print-area {
            box-shadow: none !important;
          }

          .no-print, .no-print * {
            display: none !important;
          }

          body * {
            visibility: hidden;
          }

          #printable-content,
          #printable-content * {
            visibility: visible;
          }

          #printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          /* Ensure backgrounds print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          /* Improve text readability when printed */
          p, span, div {
            color: black !important;
            font-size: 12pt !important;
            line-height: 1.5 !important;
          }
          
          h1 {
            font-size: 18pt !important;
          }
          
          /* Keep blue header color in modern layout */
          .bg-gradient-to-r {
            background: #1e40af !important; /* fallback if gradient doesn't print */
          }
          
          /* Ensure white text remains visible on blue backgrounds */
          .bg-gradient-to-r * {
            color: white !important;
          }
        }
      `}</style>
    </div>
  );
}