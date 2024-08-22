import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVvSup-YYK9UFbe9iE9pyqwY2Lm-VkOQg",
  authDomain: "artigialingua.firebaseapp.com",
  projectId: "artigialingua",
  storageBucket: "artigialingua.appspot.com",
  messagingSenderId: "1013127396866",
  appId: "1:1013127396866:web:6ffe8d6d682d899878311b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
