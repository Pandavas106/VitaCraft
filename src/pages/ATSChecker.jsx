import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Resume from "../components/Resume";
import mammoth from "mammoth";
// utils/pdfUtils.js
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'; // 👈 this is important

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;



export async function extractTextFromPDF(arrayBuffer) {
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    text += strings.join(" ") + "\n";
  }

  return text;
}





const ATSCheckerPage = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const navigator = useNavigate();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const navigateToTemplates = () => {
    navigator("/templates");
  };

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const handleSubmit = async () => {
    if (!file || !jobDescription) {
      alert("Please upload your resume and add a job description");
      return;
    }
  
    setIsAnalyzing(true);
  
    try {
      let resumeText = "";
  
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        resumeText = await extractTextFromPDF(arrayBuffer);
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        resumeText = result.value;
      } else if (file.type === "application/msword") {
        // Basic fallback for .doc using FileReader (may not be accurate)
        const reader = new FileReader();
        resumeText = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsText(file);
        });
      } else {
        alert("Unsupported file type");
        setIsAnalyzing(false);
        return;
      }
  
      const prompt = `
  You are an ATS resume analyzer. Based on the following resume and job description, evaluate the resume and return a JSON object like this:
  {
    "score": 0-100,
    "keywordMatch": 0-100,
    "sectionHeadings": 0-100,
    "fileCompatibility": 100,
    "readability": 0-100,
    "missingKeywords": ["..."],
    "suggestions": ["..."]
  }
  
  
  Job Description: """${jobDescription}"""
  Resume: """${resumeText}"""
      `;
  
      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
  
      const data = await response.json();
      const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

if (!jsonText) {
  console.log("Raw Gemini response:", data);
  console.log("API key being used:", GEMINI_API_KEY);
  throw new Error("Invalid response from Gemini API");
}

let result;
const cleanedJsonText = jsonText.replace(/```json|```/g, '').trim();
try {
  result = JSON.parse(cleanedJsonText);
} catch (parseError) {
  console.log(cleanedJsonText);
  console.error("Error parsing Gemini response:", parseError);
  alert("Received an unexpected response from Gemini.");
  setIsAnalyzing(false);
  return;
}
setResults(result);

      setResults(result);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Something went wrong while analyzing your resume.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription("");
    setResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="bg-[#D0F6FE] min-h-screen p-6">
        {/* Header Section */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center mb-10 pt-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold font-[Hanuman] mb-4">
            ATS Score Checker
          </h1>
          <p className="text-lg md:text-2xl font-[Hanuman]">
            Make sure your resume passes the Applicant Tracking System test and
            lands you that interview!
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Input Form */}
          {!results && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg flex-1"
            >
              <h2 className="text-2xl font-bold font-[Hanuman] mb-6">
                Upload & Analyze
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg mb-2 font-semibold">
                    Upload your resume
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#406B98]"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                    {file ? (
                      <div className="text-[#406B98] font-medium">
                        {file.name}
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-500">
                          Drag & drop your resume here or click to browse
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Supports PDF, DOC, DOCX
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-lg mb-2 font-semibold">
                    Paste job description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#406B98]"
                    placeholder="Paste the full job description here for the best ATS match analysis..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#406B98] text-white px-6 py-3 rounded text-lg font-semibold hover:bg-[#335680] transition-colors"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Check ATS Score"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Results Section */}
          {results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-6 rounded-lg shadow-lg flex-1"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-[Hanuman]">
                  Your ATS Score Results
                </h2>
                <button
                  onClick={handleReset}
                  className="text-[#406B98] hover:underline font-medium"
                >
                  Check Another Resume
                </button>
              </div>

              {/* Score Overview */}
              <div className="flex flex-col justify-center items-center sm:flex-row gap-6 mb-8">
                <div className="bg-[#D0F6FE] px-4 py-12 rounded-lg text-center flex-1">
                  <div className="text-5xl font-bold text-[#406B98] mb-2">
                    {results.score}%
                  </div>
                  <div className="text-lg font-semibold">Overall ATS Score</div>
                </div>

                <div className="grid grid-cols-2 gap-4 flex-1">
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-[#406B98]">
                      {results.keywordMatch}%
                    </div>
                    <div className="text-sm">Keyword Match</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-[#406B98]">
                      {results.sectionHeadings}%
                    </div>
                    <div className="text-sm">Section Headings</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-[#406B98]">
                      {results.fileCompatibility}%
                    </div>
                    <div className="text-sm">File Compatibility</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <div className="text-2xl font-bold text-[#406B98]">
                      {results.readability}%
                    </div>
                    <div className="text-sm">Readability</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.missingKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    Suggestions to Improve
                  </h3>
                  <ul className="space-y-2">
                    {results.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#406B98] font-bold">✓</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="bg-[#406B98] text-white px-6 py-3 rounded text-lg font-semibold hover:bg-[#335680] transition-colors w-full">
                    Download Detailed Report
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#446D9A] p-6 rounded-lg shadow-lg max-w-md text-white"
          >
            <h2 className="text-2xl font-bold font-[Hanuman] mb-4">
              Why ATS Matters
            </h2>

            <div className="space-y-4 mb-6">
              <p>
                75% of resumes are rejected by ATS before a human ever sees
                them. Our tool helps you beat the system.
              </p>

              <div className="bg-white/10 p-4 rounded">
                <h3 className="font-semibold mb-2">What We Check:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Keyword optimization based on job description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Proper section headings and structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>File format compatibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Content readability for ATS systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✅</span>
                    <span>Overall ATS passage probability</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded mb-6">
              <h3 className="font-semibold mb-2">Pro Tips:</h3>
              <ul className="space-y-2 text-sm">
                <li>Use keywords directly from the job description</li>
                <li>Ensure your resume has clear section headings</li>
                <li>Avoid tables, headers/footers, and images</li>
                <li>
                  Use standard fonts like Arial, Calibri, or Times New Roman
                </li>
                <li>Save your file as a .docx or .pdf format</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="font-medium mb-4">
                Need more help with your resume?
              </p>
              <button
                onClick={navigateToTemplates}
                className="bg-white text-[#406B98] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
              >
                View Resume Templates
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ATSCheckerPage;
