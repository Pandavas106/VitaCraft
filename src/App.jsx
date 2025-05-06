import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./context/auth_context";
import Template from "./pages/Templates";
import ProfilePage from "./pages/ProfilePage";
import { ResumeProvider } from './context/ResumeContext.jsx';


function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Template />} />

          <Route path="/profile" element={<ProfilePage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
