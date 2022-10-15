// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv-PmDwJv1CxDE6FwD8V2RQbwv1XD28Hk",
  authDomain: "mobile-hub-e6b77.firebaseapp.com",
  projectId: "mobile-hub-e6b77",
  storageBucket: "mobile-hub-e6b77.appspot.com",
  messagingSenderId: "937544557999",
  appId: "1:937544557999:web:f658a392a9272c16e3fb5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);