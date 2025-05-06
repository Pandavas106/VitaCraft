// AuthContext.jsx
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./../../firebase";
import { db } from "./../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, name = "") {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      name,
      createdAt: new Date(),
    });
    return res;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setIsLoggedIn(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    authUser,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen backdrop-blur-sm bg-white/30">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-transparent border-b-blue-500 rounded-full animate-spin delay-200"></div>
        </div>
        
      </div>
      
      
      
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
