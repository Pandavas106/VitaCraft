import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";

function Templates() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "auto";
    };
  }, []);
  return (
    <div className="overflow-x-hidden mt-19">
      <Nav setShowPopup={setShowPopup} setIsSignUp={setIsSignUp} />
      {showPopup && (
        <SignIn
          setShowPopup={setShowPopup}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />
      )}
    </div>
  );
}

export default Templates;
