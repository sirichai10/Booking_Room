import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDGtie2_05_wkJKisLmMpFsEWNe3jiaKZo",
  authDomain: "bookingroom-e4f9f.firebaseapp.com",
  projectId: "bookingroom-e4f9f",
  storageBucket: "bookingroom-e4f9f.appspot.com",
  messagingSenderId: "492917038193",
  appId: "1:492917038193:web:33c23d317a690b98b70fd0",
  measurementId: "G-KPG9E4BJGB"
};

// Initialize Firebase
export const appdb = initializeApp(firebaseConfig);