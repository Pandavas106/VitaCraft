import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

function SignIn({ setShowPopup, isSignUp, setIsSignUp }) {
  return (
    <div className="fixed inset-0 flex items-center z-999 justify-center backdrop-blur-md bg-black/30">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-2 right-2 hover:text-gray-900 text-gray-600 text-xl"
        >
          <IoClose size={32} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
              />
            )}

            {/* Submit Button */}
            <button className="w-full p-2 bg-[#406B98] text-white font-semibold text-[17px] rounded">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {/* Google Sign-in */}
            <button className="flex gap-3 justify-center items-center p-2 w-full border-2 rounded border-[#406B98]">
              Continue with Google <FcGoogle size={21} />
            </button>

            {/* Toggle Sign In/Sign Up */}
            <p className="text-center mt-1">
              {isSignUp ? "Already Have an Account?" : "Don't Have an Account?"}{" "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className="hover:cursor-pointer text-[#406B98] hover:text-gray-800"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
