import { useState, useEffect } from "react";
import { useResumeData } from "../context/Resume_Data";

export default function CoverLetterGenerator() {
  const [jobDetails, setJobDetails] = useState({
    company: "",
    position: "",
    requirements: "",
    notes: "",
  });
  const [coverLetter, setCoverLetter] = useState("");
  const [editableCoverLetter, setEditableCoverLetter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generationInProgress, setGenerationInProgress] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Gemini API key from environment variables
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const userData = useResumeData();

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fixed function to stream response from Gemini API
  const attemptStreamGenerateCoverLetter = async () => {
    if (!userData || !apiKey) {
      setError("User data or API key missing");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGenerationInProgress(true);
    setShowLivePreview(true);
    setStreamedContent("");

    try {
      // Create the prompt for the Gemini API
      const prompt = `
Generate a professional cover letter for a job application with the following details:

CANDIDATE INFORMATION:
- Name: ${userData.personalInfo.name}
- Role: ${userData.personalInfo.role}
- Personal Info: ${userData.personalInfo}
- Profile: ${userData.personalInfo.profile}
- Education: ${userData.education
        .map(
          (edu) =>
            `${edu.degree} at ${edu.institution} (${edu.startYear}-${edu.endYear})`
        )
        .join(", ")}
- Experience: ${userData.experiences
        .map(
          (exp) =>
            `${exp.role} at ${exp.company} (${exp.startDate}-${exp.endDate})`
        )
        .join(", ")}
- Key projects: ${userData.projects.map((proj) => proj.title).join(", ")}
- Technical Skills: ${userData.skills.technical.join(", ")}
- Soft Skills: ${userData.skills.soft.join(", ")}
- Achievements: ${userData.achievements.join(", ")}

JOB DETAILS:
- Company: ${jobDetails.company}
- Position: ${jobDetails.position}
- Key Requirements: ${jobDetails.requirements || "Not specified"}
- Additional Notes: ${jobDetails.notes || "None"}

Please format the letter professionally with proper date, salutation, body paragraphs that highlight relevant skills and experiences, and a closing. Focus on making connections between the candidate's background and the job requirements. The tone should be confident but not arrogant, enthusiastic but professional.

Format the letter with the current date, formal structure, and proper spacing and max upto 200 words and replcae the [] with values if available.
`;

      try {
        // Try streaming API endpoint
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
              },
            }),
          }
        );

        if (!response.ok || !response.body) {
          throw new Error(
            `Streaming API failed with status: ${response.status}`
          );
        }

        // Process the stream using a better JSON parsing approach
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = ""; // Buffer to hold partial chunks
        let accumulatedContent = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          // Decode the chunk and add to our buffer
          buffer += decoder.decode(value, { stream: true });

          // Process complete JSON objects from the buffer
          try {
            // Split the buffer by newlines and process each line
            const lines = buffer.split("\n");

            // Keep the last potentially incomplete line in the buffer
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.trim()) continue; // Skip empty lines

              try {
                const parsedData = JSON.parse(line);

                // Extract text content if available
                if (
                  parsedData.candidates?.[0]?.content?.parts?.[0]?.text !==
                  undefined
                ) {
                  const textContent =
                    parsedData.candidates[0].content.parts[0].text;
                  accumulatedContent += textContent;
                  setStreamedContent(accumulatedContent);
                }
              } catch (jsonError) {
                console.warn("Skipping invalid JSON line:", line);
                // Continue processing other lines even if one fails
              }
            }
          } catch (err) {
            console.error("Error processing buffer:", err);
          }
        }

        // Process any remaining data in the buffer
        if (buffer.trim()) {
          try {
            const parsedData = JSON.parse(buffer);
            if (
              parsedData.candidates?.[0]?.content?.parts?.[0]?.text !==
              undefined
            ) {
              const textContent =
                parsedData.candidates[0].content.parts[0].text;
              accumulatedContent += textContent;
              setStreamedContent(accumulatedContent);
            }
          } catch (err) {
            console.warn("Error parsing final buffer chunk:", err);
          }
        }

        // Set the final cover letter
        if (accumulatedContent) {
          setCoverLetter(accumulatedContent);
          setEditableCoverLetter(accumulatedContent);
        } else {
          throw new Error("No content received from streaming API");
        }
      } catch (streamErr) {
        console.warn(
          "Streaming API failed, falling back to standard endpoint:",
          streamErr
        );

        // Fallback to non-streaming API endpoint
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
              },
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `API call failed: ${
              errorData.error?.message || response.statusText
            }`
          );
        }

        const data = await response.json();

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
          throw new Error("Invalid response format from API");
        }

        const generatedContent = data.candidates[0].content.parts[0].text;
        setCoverLetter(generatedContent);
        setEditableCoverLetter(generatedContent);
        setStreamedContent(generatedContent);
      }
    } catch (err) {
      console.error("All API attempts failed:", err);
      setError(`Failed to generate cover letter: ${err.message}`);

      // Fallback to template if API fails
      const fallbackLetter = generateFallbackLetter();
      setCoverLetter(fallbackLetter);
      setEditableCoverLetter(fallbackLetter);
    } finally {
      setIsLoading(false);
      setGenerationInProgress(false);
    }
  };

  // Fallback method if the API call fails
  const generateFallbackLetter = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return `${currentDate}

${userData.personalInfo.name}
${userData.personalInfo.email}
${userData.personalInfo.phone}

Hiring Manager
${jobDetails.company}
${jobDetails.company} Headquarters

Subject: Application for ${jobDetails.position} Position

Dear Hiring Manager,

I am writing to express my interest in the ${jobDetails.position} position at ${
      jobDetails.company
    }. As a Computer Science Engineering student with a CGPA of 9.42 and practical experience in frontend development, I am excited about the opportunity to contribute to your innovative team.

With experience in React.js, Tailwind CSS, and Node.js, I have successfully delivered projects that enhance user engagement and optimize performance. At TechCorp Inc., I led a UI redesign that improved user engagement by 30% while maintaining strong collaboration with backend developers to ensure seamless API integration.

My project "Sign Bridge" demonstrates my ability to work with cross-platform technologies and implement machine learning models to solve real-world accessibility problems. The application served over 100 users in testing phase with a 99% reliability rate. Additionally, my work on "Lexica AR" showcases my skills in creating immersive educational experiences that significantly improved student comprehension.

${
  jobDetails.requirements
    ? `I believe my skills in ${jobDetails.requirements} align perfectly with the requirements for this position. My background in Computer Science Engineering has provided me with a strong foundation in these technologies, and I am eager to apply these skills to the challenges at ${jobDetails.company}.`
    : "I believe my technical skills in frontend development and mobile application development, combined with my collaborative approach and problem-solving abilities, would make me a valuable addition to your team."
}

${jobDetails.notes ? `Additional note: ${jobDetails.notes}` : ""}

I am particularly drawn to ${
      jobDetails.company
    } because of its innovative approach to technology solutions. As a finalist in both the Internal Hackathon of SIH and the Spark Tank Competition, I have demonstrated my ability to develop solutions to practical problems and present them effectively to industry experts.

Thank you for considering my application. I look forward to the possibility of discussing how my background, technical skills, and enthusiasm would make me a strong addition to your team.

Sincerely,
${userData.personalInfo.shortName}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl mx-auto p-4">
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Cover Letter Generator
        </h2>

        {!userData ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading user data...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Job Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={jobDetails.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Google"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={jobDetails.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Requirements (optional)
                  </label>
                  <textarea
                    name="requirements"
                    value={jobDetails.requirements}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="e.g., React.js, TypeScript, responsive design"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={jobDetails.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Any specific points you want to highlight"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={attemptStreamGenerateCoverLetter}
              disabled={
                isLoading ||
                !jobDetails.company ||
                !jobDetails.position ||
                !apiKey
              }
              className={`w-full py-2 px-4 rounded-md font-medium ${
                isLoading ||
                !jobDetails.company ||
                !jobDetails.position ||
                !apiKey
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Generating..." : "Generate Cover Letter"}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* API Key Reminder */}
            {!apiKey && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-md">
                <p className="text-sm">
                  <strong>API Key Missing:</strong> Make sure to set your Gemini
                  API key in the environment variable VITE_GEMINI_API_KEY.
                </p>
              </div>
            )}

            {/* Live generation indicator */}
            {showLivePreview && (
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showLivePreview}
                    onChange={() => setShowLivePreview(!showLivePreview)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Show live preview
                  </span>
                </label>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Section */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {generationInProgress ? "Live Preview" : "Cover Letter"}
          </h2>
          {coverLetter && !isEditing && !generationInProgress && (
            <button
              onClick={() => setIsEditing(true)}
              className="py-1 px-3 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 font-medium text-sm flex items-center gap-1"
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
          )}
          {coverLetter && isEditing && !generationInProgress && (
            <button
              onClick={() => {
                setCoverLetter(editableCoverLetter);
                setIsEditing(false);
              }}
              className="py-1 px-3 bg-green-100 text-green-700 rounded-md hover:bg-green-200 font-medium text-sm flex items-center gap-1"
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
          )}
        </div>

        {isEditing ? (
          <textarea
            value={editableCoverLetter}
            onChange={(e) => setEditableCoverLetter(e.target.value)}
            className="w-full bg-gray-50 p-6 rounded-md border border-gray-200 min-h-96 whitespace-pre-wrap font-serif resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        ) : (
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200 min-h-96 whitespace-pre-wrap font-serif">
            {generationInProgress && showLivePreview ? (
              <div className="relative">
                <div>{streamedContent || "Generating..."}</div>
                {/* Cursor animation */}
                <div className="absolute h-5 w-1 bg-blue-500 opacity-75 animate-pulse inline-block ml-1 -mt-3"></div>
              </div>
            ) : coverLetter ? (
              coverLetter
            ) : (
              <div className="text-center text-gray-500 italic mt-20">
                Your cover letter will appear here after generation
              </div>
            )}
          </div>
        )}

        {coverLetter && !generationInProgress && (
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => {
                const printWindow = window.open("", "_blank");
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>Cover Letter - ${jobDetails.position} at ${
                  jobDetails.company
                }</title>
                      <style>
                        body { font-family: Georgia, serif; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
                        @media print { body { padding: 0; } }
                      </style>
                    </head>
                    <body>
                      <pre style="font-family: Georgia, serif; white-space: pre-wrap;">${
                        isEditing ? editableCoverLetter : coverLetter
                      }</pre>
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                  printWindow.print();
                }, 300);
              }}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              Print
            </button>
            <button
              onClick={() => {
                // In a real app, you would use a library like jsPDF to create a PDF
                const blob = new Blob(
                  [isEditing ? editableCoverLetter : coverLetter],
                  { type: "text/plain" }
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Cover_Letter_${jobDetails.company}_${jobDetails.position}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              Download Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
