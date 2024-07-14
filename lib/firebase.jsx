import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-js-firebase-blog-web-app.firebaseapp.com",
  projectId: "next-js-firebase-blog-web-app",
  storageBucket: "next-js-firebase-blog-web-app.appspot.com",
  messagingSenderId: "35870757098",
  appId: "1:35870757098:web:1e4e9e2ba9b06a3a3c8793",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
