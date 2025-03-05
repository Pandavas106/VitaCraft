import React, { useState } from "react";
import Nav from "../components/Nav";
import SignIn from "./SignIn";
import MainP from "./../assets/MainP.png"
import ATS_Score from "./../assets/ATS_Score.png"
import CatTemp from "./../assets/CatTemp.png"
import D1 from "./../assets/D1.png"
import D2 from "./../assets/D2.png"

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <div>
      <Nav setShowPopup={setShowPopup} setIsSignUp={setIsSignUp} />
      {showPopup && <SignIn setShowPopup={setShowPopup} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />}
      <div className="bg-[#D0F6FE] h-screen flex justify-evenly items-center">
      <img src={D1} alt="" className="h-20 w-20 absolute top-60 left-0 m-4" />
      <img src={D2} alt="" className="h-45 w-60 absolute top-13 -right-38 m-4" />
        <div>
          <div className="text-5xl text-black font-[Hanuman] mb-4 font-bold tracking-wide">
            Create Your Perfect Resume in <br /> Minutes
          </div>
          <div className="text-[27px] text-black font-[Hanuman] mb-6 tracking-wider">
            Design a professional resume that stands out with <br /> ease — no experience needed
          </div>
          <button className='bg-[#406B98] text-white px-5 mb-20 tracking-wide py-3 rounded text-[19px] font-semibold hover:cursor-pointer'>Create My Resume</button>
          <div className="flex gap-20">
            <div className="flex gap-5">
              <img src={ATS_Score} alt="ATS Score" className="h-18 w-24" />
              <div className="text-2xl mt-1 tracking-wide font-normal">ATS Score <br /> Checker</div>
            </div>
            <div className="flex gap-3">
              <img src={CatTemp} alt="Cat_Temp" className="-top-2 relative h-24 w-26" />
              <div className="text-2xl mt-1 tracking-wide font-normal">Categorical <br /> Templates</div>
            </div>
          </div>
        </div>
        <img src={MainP} alt="Resume" className='h-150 w-125'/>
      </div>
      <div className="bg-white h-screen">

      </div>
    </div>
  );
}

export default Home;
