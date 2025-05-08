import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth_context";
import Template from "./pages/Templates";
import ProfilePage from "./pages/ProfilePage";
import { ResumeProvider } from "./context/ResumeContext.jsx";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import SignIn from "./pages/SignIn";
import { useState } from "react";
import CoverLetter from "./pages/CoverLetter.jsx";
import ATSCheckerPage from "./pages/ATSChecker.jsx";
import React from "react";
import LivePreview from "./pages/LivePreview.jsx";
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <Nav setShowPopup={setShowPopup} setIsSignUp={setIsSignUp} />

            {showPopup && (
              <SignIn
                setShowPopup={setShowPopup}
                isSignUp={isSignUp}
                setIsSignUp={setIsSignUp}
              />
            )}

            <div className="mt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/templates" element={<Template />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/coverpage" element={<CoverLetter />} />
                <Route path="/ats" element={<ATSCheckerPage />} />
                <Route path="/livepreview" element={<LivePreview />} />
              </Routes>
            </div>
          </Router>
        </ResumeProvider>
      </AuthProvider>

      <Footer />
    </>
  );
}

export default App;
