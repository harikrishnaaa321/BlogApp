// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-30564.firebaseapp.com",
  projectId: "blog-app-30564",
  storageBucket: "blog-app-30564.appspot.com",
  messagingSenderId: "807117297544",
  appId: "1:807117297544:web:e3b3c5c2f3d7ed9b3d0c3d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

