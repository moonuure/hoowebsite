import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0GX4qlerMHGelRMbaXHeIZplUSTXCXXc",
  authDomain: "hoowebsite-a3e2b.firebaseapp.com",
  projectId: "hoowebsite-a3e2b",
  storageBucket: "hoowebsite-a3e2b.appspot.com",
  messagingSenderId: "1008660822729",
  appId: "1:1008660822729:web:32bdc1fa3afba857b62b18",
  measurementId: "G-7FYE3WVR0M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Explicitly export modules
export { app, auth, db, storage };
