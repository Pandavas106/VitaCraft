import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "./../../firebase";
import { useAuth } from "../context/auth_context";

function SignIn({ setShowPopup, isSignUp, setIsSignUp }) {
  const { signup, login } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        if (password !== confirmPass) {
          return setError("Passwords do not match");
        }
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      setShowPopup(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: res.user.displayName,
          email: res.user.email,
          createdAt: new Date(),
        });
      }
      setShowPopup(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 mt-19 flex items-center justify-center z-[999] backdrop-blur-sm bg-black/40">
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-96">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <IoClose size={28} />
        </button>
        <h2 className="text-3xl font-bold text-center text-[#406B98] mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#406B98]"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#406B98]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#406B98]"
            required
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#406B98]"
              required
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-[#406B98] text-white font-semibold rounded-lg hover:bg-[#30567f]"
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
            className="flex items-center justify-center gap-3 py-2 w-full border-2 border-[#406B98] rounded-lg hover:bg-[#f3f6fb]"
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
