import React, { useRef } from "react";

export default function CoverLetter2({
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
  const phone = personalInfo.phone || "Your Phone";
  const email = personalInfo.email || "Your Email";
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
      jobDetails?.position || ""
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
    console.log(userData);
    setIsEditing(false);
  };

  // Render content based on presence of placeholders or loading state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 border-4 border-t-green-600 border-r-transparent border-b-green-600 border-l-transparent rounded-full animate-spin mb-4"></div>
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
          className="w-full bg-gray-50 p-4 rounded-md border border-gray-200 min-h-64 whitespace-pre-wrap font-sans text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
        <div className="space-y-4 whitespace-pre-wrap">
          {contentToDisplay.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-800">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-white print-area max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-6 print:hidden">
        <h2 className="text-xl font-sans font-bold">{name}</h2>
        <p className="text-green-100 font-sans">{role}</p>
      </div>

      <div
        className="p-8 font-sans text-base leading-relaxed print:p-0"
        id="printable-content"
        ref={letterRef}
      >
        {/* Dedicated header for print version only */}
        <div className="hidden print:block print:mb-6">
          <div className="bg-green-800 p-6 text-white w-full">
            <h2 className="font-bold text-xl">{name}</h2>
            <p className="text-green-100">{role}</p>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:grid-cols-2">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-green-800 mb-2 text-sm uppercase tracking-wider">
              Applicant Details
            </h3>
            <p>{address}</p>
            <p>{phone}</p>
            <p className="text-green-600">{email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600">
            <h3 className="font-bold text-green-800 mb-2 text-sm uppercase tracking-wider">
              Position Details
            </h3>
            <p>Hiring Manager</p>
            <p className="font-medium">
              {jobDetails?.position || "Position Title"}
            </p>
            <p>{jobDetails?.company || "Company Name"}</p>
            <p>{jobDetails?.companyAddress || ""}</p>
          </div>
        </div>

        {/* Date */}
        <div className="mb-6 text-right text-gray-600">
          <p>{formattedDate}</p>
        </div>

        {/* Letter Header */}
        <div className="mb-6">
          <p className="font-medium text-green-800">
            Subject: Application for {jobDetails?.position || "Position"}{" "}
            Position
          </p>
          <p className="mt-4">Dear Hiring Manager,</p>
        </div>

        {/* Cover Letter Content */}
        <div className="mb-8">{renderContent()}</div>

        {/* Signature */}
        {!isLoading && (
          <div className="mt-8 border-t pt-4 border-gray-200">
            <p>Sincerely,</p>
            <p className="font-bold mt-4">{name}</p>
          </div>
        )}
      </div>

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
              className="py-2 px-4 bg-green-100 text-green-700 rounded-md hover:bg-green-200 font-medium flex items-center gap-1 transition-colors"
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
              className="py-2 px-4 bg-green-600 no-print text-white rounded-md hover:bg-green-700 font-medium flex items-center gap-1 transition-colors"
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
          .no-print {
            display: none !important;
          }

          @page {
            margin: 5mm 12mm;
          }

          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .print-area {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: start;
            flex-direction: column;
          }

          .print-content {
            width: 100%;
            max-width: 100%;
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
            padding: 0;
          }

          /* Ensure backgrounds print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
