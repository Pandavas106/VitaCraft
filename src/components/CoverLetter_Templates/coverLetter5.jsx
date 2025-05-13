import React, { useRef, useState } from "react";
import {
  FileText,
  Printer,
  Download,
  Edit2,
  Check,
  Briefcase,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function coverLetter5({
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

  // Format current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Process userData with safe fallbacks
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

  // Generate a fallback cover letter
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
  // Update the main cover letter content with the edited content
  if (setEditableCoverLetter && editableCoverLetter) {
    // If there's a function to update the cover letter content at parent level
    if (typeof setEditableCoverLetter === 'function') {
      // We need to update the parent state as well if possible
      setEditableCoverLetter(editableCoverLetter);
    }
  }
  // Turn off editing mode
  setIsEditing(false);
};

  // Render content based on state
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">
            Generating your cover letter...
          </p>
        </div>
      );
    } else if (isEditing) {
      return (
        <textarea
          value={editableCoverLetter}
          onChange={(e) => setEditableCoverLetter(e.target.value)}
          className="w-full bg-white p-4 rounded border border-gray-300 min-h-64 whitespace-pre-wrap font-serif text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      );
    } else {
      // Check for any placeholder patterns
      const hasPlaceholders =
        coverLetterContent &&
        (/\[[^\]]+\]/.test(coverLetterContent) ||
          /{[^}]+}/.test(coverLetterContent) ||
          /\([^)]+\)/.test(coverLetterContent) ||
          /your\s+(experience|skill|project|achievement)/i.test(
            coverLetterContent
          ));

      // Use the provided content or fallback
      const contentToDisplay =
        coverLetterContent && !hasPlaceholders
          ? coverLetterContent
          : generateFallbackContent();

      return (
        <div className="space-y-4 whitespace-pre-wrap">
          {contentToDisplay.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-800 font-serif">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-white print-area max-w-4xl mx-auto shadow-md rounded">
      {/* Control Buttons - Bottom Bar like CoverLetter3 */}

      {/* Main Document */}
      <div
        className="bg-white p-6 font-serif text-base leading-relaxed print:p-4"
        id="printable-content"
        ref={letterRef}
      >
        {/* Header with applicant info */}
        <div className="flex flex-col items-center border-b border-gray-200 pb-4 mb-6 print:pb-2 print:mb-4">
          <h1 className="text-2xl font-bold text-purple-800">{name}</h1>
          <p className="text-gray-600">{role}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-purple-600" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={14} className="text-purple-600" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14} className="text-purple-600" />
              <span>{email}</span>
            </div>
          </div>
        </div>

        {/* Side-by-side date and position info */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-gray-600">
            <p>{formattedDate}</p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-1 font-medium text-purple-800">
              <Briefcase size={16} className="text-purple-600" />
              <p>{jobDetails?.position || "Position"}</p>
            </div>
            <p className="font-medium">
              {jobDetails?.company || "Company Name"}
            </p>
            <p className="text-sm text-gray-600">
              {jobDetails?.companyAddress || ""}
            </p>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-6">
          <p className="font-medium">Dear Hiring Manager,</p>
        </div>

        {/* Cover Letter Content */}
        <div className="mb-6">{renderContent()}</div>

        {/* Signature */}
        {!isLoading && (
          <div className="mt-8">
            <p>Sincerely,</p>
            <div className="mt-6 font-bold relative">
              <span className="relative z-10">{name}</span>
              <div className="absolute -bottom-2 left-0 w-32 h-1 bg-purple-500 opacity-30"></div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 mt-7 p-4 flex flex-wrap justify-end gap-3 print:hidden">
          {!isLoading && isEditing ? (
            <button
              onClick={handleSaveChanges}
              className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium flex items-center gap-1 transition-colors"
            >
              <Check size={16} />
              Save Changes
            </button>
          ) : (
            !isLoading && (
              <button
                onClick={() => setIsEditing(true)}
                className="py-2 px-4 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 font-medium flex items-center gap-1 transition-colors"
              >
                <Edit2 size={16} />
                Edit Letter
              </button>
            )
          )}

          {!isLoading && (
            <>
              <button
                onClick={handlePrint}
                className="py-2 px-4 bg-purple-600 no-print text-white rounded-md hover:bg-purple-700 font-medium flex items-center gap-1 transition-colors"
              >
                <Printer size={16} />
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
                className="py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-medium flex items-center gap-1 transition-colors"
              >
                <Download size={16} />
                Download
              </button>
            </>
          )}
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 7mm;
          }

          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

          .print-area {
            box-shadow: none !important;
          }

          .no-print,
          .no-print * {
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
          p,
          span,
          div {
            color: black !important;
            font-size: 12pt !important;
            line-height: 1.5 !important;
          }

          h1 {
            font-size: 18pt !important;
          }import CoverLetter2 from './coverLetter2';

        }
      `}</style>
    </div>
  );
}
