// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const provider = new GoogleAuthProvider();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr2A_3nfVNWFjPgRrhtaEqP-yWJAufByM",
  authDomain: "booking-app-25ea0.firebaseapp.com",
  projectId: "booking-app-25ea0",
  storageBucket: "booking-app-25ea0.firebasestorage.app",
  messagingSenderId: "190386935614",
  appId: "1:190386935614:web:e80e2f74bc2c68d61d3e6f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
