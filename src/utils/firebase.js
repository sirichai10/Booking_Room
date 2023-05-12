import { initializeApp } from "firebase/app";

//firebaseConfig in your firebase project
const firebaseConfig = {
  apiKey: "......",
  authDomain: "......",
  projectId: "........",
  storageBucket: ".....",
  messagingSenderId: "......",
  appId: ".......",
  measurementId: "......."
};

// Initialize Firebase
export const appdb = initializeApp(firebaseConfig);