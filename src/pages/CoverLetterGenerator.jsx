import { useState, useEffect } from "react";
import { useResumeData } from "../context/Resume_Data";
import CoverLetter1 from "../components/CoverLetter_Templates/CoverLetter1";
import { useAuth } from "../context/auth_context";
import CoverLetter2 from "../components/CoverLetter_Templates/coverLetter2";

export default function CoverLetterGenerator() {
  const [jobDetails, setJobDetails] = useState({
    company: "",
    position: "",
    requirements: "",
    notes: "",
    companyAddress: "",
  });
  const { isLoggedIn } = useAuth();
  const [coverLetter, setCoverLetter] = useState("");
  const [editableCoverLetter, setEditableCoverLetter] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generationInProgress, setGenerationInProgress] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

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
    console.log();
  };

  // Create a robust placeholder replacement system
  const createDetailedUserProfile = (userData) => {
    if (!userData) return null;

    return {
      name: userData.personalInfo?.name || "",
      role: userData.personalInfo?.role || "",
      profile: userData.profile || "",
      personalInfo: userData?.personalInfo || {},
      education:
        userData.education?.map((edu) => ({
          degree: edu.degree || "",
          institution: edu.institution || "",
          period: `${edu.startYear || ""}-${edu.endYear || ""}`,
          complete: !!(edu.degree && edu.institution),
        })) || [],
      experience:
        userData.experience?.map((exp) => ({
          role: exp.role || "",
          company: exp.company || "",
          period: `${exp.startDate || ""}-${exp.endDate || ""}`,
          description: exp.description || "",
          complete: !!(exp.role && exp.company),
        })) || [],
      projects:
        userData.projects?.map((proj) => ({
          title: proj.title || "",
          description: proj.description || "",
          complete: !!proj.title,
        })) || [],
      skills: {
        technical: userData.skills?.technical || [],
        soft: userData.skills?.soft || [],
      },
      achievements: userData.achievements || [],
    };
  };

  // Function to stream response from Gemini API
  const generateCoverLetter = async () => {
    if (!isLoggedIn) {
      alert("Login to generate CoverLetter");
      return;
    }
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
      // Create a detailed profile to ensure we have all needed data
      const profile = createDetailedUserProfile(userData);
      if (!profile) {
        throw new Error("Could not process user data");
      }

      // Extract key details from userData to create a more focused prompt
      const latestEducation =
        profile.education.length > 0 ? profile.education[0] : null;
      const latestExperience = profile.experience;
      const topProjects = profile.projects;
      const keyTechnicalSkills = profile.skills.technical;
      const keySoftSkills = profile.skills.soft;
      const topAchievements = profile.achievements;

      // Create the prompt for the Gemini API with specific examples to avoid placeholders
      const prompt = `
Generate a professional cover letter for a job application with the following details:

CANDIDATE INFORMATION:
- Name: ${profile.name || "Professional candidate"}
- Current Role: ${profile.role || "Professional"}
- Profile Summary: ${
        profile.profile || "Experienced professional with technical expertise."
      }
- Most Recent Education: ${
        latestEducation
          ? `${latestEducation.degree} at ${latestEducation.institution} (${latestEducation.period})`
          : "Higher education background"
      }
- Most Recent Experience: ${
        latestExperience
          ? `${latestExperience.role} at ${latestExperience.company} (${latestExperience.period})`
          : "Professional experience in the field"
      }
- Notable Experience Description: ${latestExperience?.description || ""}
- Key Projects: ${
        topProjects
          .map(
            (proj) =>
              `"${proj.title}" - ${proj.description || "innovative solution"}`
          )
          .join("; ") ||
        "Professional projects demonstrating technical expertise"
      }
- Key Technical Skills: ${
        keyTechnicalSkills.join(", ") || "Relevant technical skills"
      }
- Key Soft Skills: ${keySoftSkills.join(", ") || "Professional soft skills"}
- Notable Achievements: ${
        topAchievements.join("; ") ||
        "Professional achievements demonstrating expertise"
      }

JOB DETAILS:
- Company: ${jobDetails.company || "Target company"}
- Position: ${jobDetails.position || "Target position"}
- Key Requirements: ${jobDetails.requirements || "Not specified"}
- Additional Notes: ${jobDetails.notes || "None"}

INSTRUCTIONS:
1. Write a professional cover letter in first person that specifically connects the candidate's actual experience, projects, and skills to the job requirements.
2. Make specific references to at least 2-3 of the candidate's skills, experiences, or projects that are most relevant to the position - use ACTUAL examples from the data provided, not placeholders.
3. If specific requirements are provided, directly address how the candidate meets these requirements with concrete examples.
4. Maintain a confident but professional tone.
5. Structure with 3-4 concise paragraphs:
   - Introduction stating interest in the position and brief overview of qualifications
   - 1-2 paragraphs highlighting specific relevant experience, projects, or skills
   - Closing paragraph expressing interest in the company and desire for an interview
6. Maximum 250 words, concise and impactful.
7. DO NOT include date, header information, or signature as these will be handled by the template.
8. DO NOT use placeholders or template phrases like "I would bring my experience in [skill]" - ALWAYS use the actual information provided.
9. Include specific metrics or achievements when available.
10. If any information is missing, craft natural language around what IS available rather than using placeholders.
11. Focus on the top 2-3 most relevant skills/experiences for this specific job position.
12. If requirements are provided, explicitly connect skills and experiences to those requirements.
13. Mention some important skills,achievements,..etc necessary in cover letter to the job role and necessary achievetsb= and remaing which are necessary
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

        // Process the stream
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
          // Check for any remaining placeholders and replace them
          let finalContent = accumulatedContent;
          finalContent = sanitizeContent(finalContent, profile);

          setCoverLetter(finalContent);
          setEditableCoverLetter(finalContent);
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

        // Check for any remaining placeholders and replace them
        const finalContent = sanitizeContent(generatedContent, profile);

        setCoverLetter(finalContent);
        setEditableCoverLetter(finalContent);
        setStreamedContent(finalContent);
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

  // Advanced function to sanitize content and remove any placeholder patterns
  const sanitizeContent = (text, profile) => {
    if (!text) return "";

    // Detect placeholder patterns with regex
    const placeholderPatterns = [
      /\[([^\]]+)\]/g, // [placeholder]
      /{([^}]+)}/g, // {placeholder}
      /\(([^)]+)\)/g, // (placeholder)
      /mention\s+([a-zA-Z\s]+)/gi, // mention xyz
      /insert\s+([a-zA-Z\s]+)/gi, // insert xyz
      /your\s+(experience|skill|project|achievement)/gi, // your xyz
    ];

    let result = text;

    // Define replacement mapping for common placeholders
    const replacementMap = {
      // Skills
      "technical skill": profile.skills.technical[0] || "technical expertise",
      "soft skill": profile.skills.soft[0] || "communication",
      "key skill": profile.skills.technical[0] || "core professional skill",
      skill: profile.skills.technical[0] || "professional skill",

      // Experience
      experience:
        profile.experience.length > 0
          ? `${profile.experience[0].role} work at ${profile.experience[0].company}`
          : "professional experience",

      // Projects
      project:
        profile.projects.length > 0
          ? profile.projects[0].title
          : "relevant project work",

      // Achievements
      achievement:
        profile.achievements.length > 0
          ? profile.achievements[0]
          : "professional accomplishment",
    };

    // Apply each placeholder pattern
    for (const pattern of placeholderPatterns) {
      result = result.replace(pattern, (match, placeholder) => {
        // Try to find a match in our replacementMap
        for (const [key, value] of Object.entries(replacementMap)) {
          if (placeholder.toLowerCase().includes(key.toLowerCase())) {
            return value;
          }
        }

        // If no specific match is found, use a general fallback based on context
        if (placeholder.toLowerCase().includes("project")) {
          return profile.projects.length > 0
            ? profile.projects[0].title
            : "project experience";
        } else if (
          placeholder.toLowerCase().includes("skill") ||
          placeholder.toLowerCase().includes("expertise")
        ) {
          return profile.skills.technical.length > 0
            ? profile.skills.technical[0]
            : "technical expertise";
        } else if (
          placeholder.toLowerCase().includes("achievement") ||
          placeholder.toLowerCase().includes("accomplishment")
        ) {
          return profile.achievements.length > 0
            ? profile.achievements[0]
            : "professional achievement";
        } else {
          // General fallback - remove brackets and return content
          return placeholder;
        }
      });
    }

    return result;
  };

  // Fallback method if the API call fails
  const generateFallbackLetter = () => {
    // Create a profile to ensure we have all needed data
    const profile = createDetailedUserProfile(userData);

    // Extract key information
    const latestEducation =
      profile.education.length > 0 ? profile.education[0] : null;
    const latestExperience =
      profile.experience.length > 0 ? profile.experience[0] : null;
    const topProjects = profile.projects.slice(0, 2);
    const keyTechnicalSkills = profile.skills.technical.slice(0, 5);
    const keySoftSkills = profile.skills.soft.slice(0, 3);

    // Create a template using actual user data
    return `I am writing to express my interest in the ${
      jobDetails.position || "position"
    } position at ${jobDetails.company || "your company"}. As ${
      profile.role ? `a ${profile.role}` : "a professional"
    } with expertise in ${
      keyTechnicalSkills.slice(0, 3).join(", ") || "relevant technical areas"
    }, I am excited about the opportunity to contribute my skills to your team.

${
  latestExperience
    ? `At ${latestExperience.company}, as a ${latestExperience.role}, I ${
        latestExperience.description ||
        `developed my expertise in ${keyTechnicalSkills[0] || "my field"}`
      }. `
    : ""
}${
      latestEducation
        ? `My educational background in ${latestEducation.degree} from ${
            latestEducation.institution
          } has provided me with a strong foundation in ${
            keyTechnicalSkills.slice(0, 2).join(" and ") || "this field"
          }.`
        : ""
    }

${
  topProjects.length > 0
    ? `My project "${topProjects[0].title}" demonstrates my ability to ${
        topProjects[0].description ||
        `apply ${keyTechnicalSkills[0] || "technical skills"} effectively`
      }. ${
        topProjects.length > 1
          ? `Additionally, through "${topProjects[1].title}", I ${
              topProjects[1].description ||
              `showcased my expertise in ${
                keyTechnicalSkills[1] ||
                keyTechnicalSkills[0] ||
                "relevant areas"
              }`
            }.`
          : ""
      }`
    : ""
}

${
  jobDetails.requirements
    ? `The ${jobDetails.position || "role"} requires expertise in ${
        jobDetails.requirements
      }, which aligns with my experience in ${
        keyTechnicalSkills
          .filter((skill) =>
            jobDetails.requirements.toLowerCase().includes(skill.toLowerCase())
          )
          .join(", ") ||
        keyTechnicalSkills.slice(0, 2).join(", ") ||
        "relevant areas"
      }. `
    : ""
}I am particularly drawn to ${
      jobDetails.company || "your company"
    } because of its reputation for innovation${
      jobDetails.notes ? ` and ${jobDetails.notes}` : ""
    }. My ${
      keySoftSkills.join(", ") || "interpersonal skills"
    } would enable me to collaborate effectively within your team.

Thank you for considering my application. I look forward to the opportunity to discuss how my background and enthusiasm would make me a valuable addition to ${
      jobDetails.company || "your company"
    }.`;
  };

  // Function to render the selected template
  const renderSelectedTemplate = () => {
    
    return (
      <CoverLetter2
        coverLetterContent={
          generationInProgress ? streamedContent : coverLetter
        }
        userData={userData}
        jobDetails={jobDetails}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editableCoverLetter={editableCoverLetter}
        setEditableCoverLetter={setEditableCoverLetter}
        isLoading={isLoading}
      />
    );
  };

  return (
    <div className="flex bg-[#D0F6FE] flex-col md:flex-row gap-6 w-full mx-auto p-4">
      {/* Form Section */}
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
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
                    Company Address (optional)
                  </label>
                  <input
                    type="text"
                    name="companyAddress"
                    value={jobDetails.companyAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 1600 Amphitheatre Parkway"
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

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Template
              </h3>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="template1"
                  name="template"
                  value="template1"
                  checked={selectedTemplate === "template1"}
                  onChange={() => setSelectedTemplate("template1")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="template1" className="text-gray-700">
                  Professional Template
                </label>
              </div>
            </div>

            <button
              onClick={generateCoverLetter}
              disabled={
                isLoading ||
                !jobDetails.company ||
                !jobDetails.position ||
                !apiKey
              }
              className={`w-full py-2 px-4 rounded-md font-medium flex justify-center items-center ${
                isLoading ||
                !jobDetails.company ||
                !jobDetails.position ||
                !apiKey
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                "Generate Cover Letter"
              )}
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
      <div className="w-full md:w-2/3">{renderSelectedTemplate()}</div>
    </div>
  );
}
