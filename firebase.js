import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5gm5oEX8uXr086DEtCLEiVgH3_L4Oz88",
  authDomain: "ar-application-35c3e.firebaseapp.com",
  databaseURL: "https://ar-application-35c3e-default-rtdb.firebaseio.com",
  projectId: "ar-application-35c3e",
  storageBucket: "ar-application-35c3e.appspot.com",
  messagingSenderId: "791180963944",
  appId: "1:791180963944:web:730e9f429001a21ff80bdd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
