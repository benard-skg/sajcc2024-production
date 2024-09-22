// firebase/clientApp.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // If you're using Firebase Analytics, uncomment the following line:
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

  apiKey: "AIzaSyASID4xsG1yusXzBgGLvIaRj4ea6KnbrXA",

  authDomain: "sajcc2024-prod.firebaseapp.com",

  projectId: "sajcc2024-prod",

  storageBucket: "sajcc2024-prod.appspot.com",

  messagingSenderId: "690450083561",

  appId: "1:690450083561:web:3b657dc2bcf244c5d64a78"

};

// // Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);