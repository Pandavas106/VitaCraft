import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDyUAZq-gVJaZLrL9-y6FeCBXx-GjLk6U8",
  authDomain: "vitacraft-70fcc.firebaseapp.com",
  projectId: "vitacraft-70fcc",
  storageBucket: "vitacraft-70fcc.firebasestorage.app",
  messagingSenderId: "427960339262",
  appId: "1:427960339262:web:0fae26c57e6b9e39337a6f",
  measurementId: "G-NHWGF5YFBE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
