import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function SignIn({ setShowPopup, isSignUp, setIsSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (password !== confirmPass) {
        return setError("Passwords do not match");
      }
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          email: res.user.email,
          createdAt: new Date(),
        });
        setShowPopup(false);
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, "users", res.user.uid));
        if (!docSnap.exists()) {
          await setDoc(doc(db, "users", res.user.uid), {
            email: res.user.email,
            createdAt: new Date(),
          });
        }
        setShowPopup(false);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const docSnap = await getDoc(doc(db, "users", res.user.uid));
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", res.user.uid), {
          email: res.user.email,
          name: res.user.displayName,
          createdAt: new Date(),
        });
      }
      setShowPopup(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] backdrop-blur-sm bg-black/40 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-96 transform scale-100 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 hover:text-red-500 text-gray-400 transition-colors duration-200"
        >
          <IoClose size={28} />
        </button>

        <h2 className="text-3xl font-bold text-center text-[#406B98] mb-6 tracking-wide">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#406B98]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#406B98]"
            required
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#406B98]"
              required
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-[#406B98] hover:bg-[#30567f] text-white font-semibold text-lg rounded-lg transition-colors duration-300 shadow-sm"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          <div className="flex items-center gap-2 text-gray-400">
            <hr className="flex-grow border-t" />
            <span className="text-sm">OR</span>
            <hr className="flex-grow border-t" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex items-center justify-center gap-3 py-2 w-full border-2 border-[#406B98] rounded-lg hover:bg-[#f3f6fb] transition-all duration-200"
          >
            <FcGoogle size={21} />
            <span className="font-medium text-sm text-[#406B98]">
              Continue with Google
            </span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#406B98] font-medium hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
