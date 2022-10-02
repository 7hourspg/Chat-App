
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmzmFuvSV6jhDK6LIYuS4s4pOSpBc7m2U",
  authDomain: "new-chat-c713e.firebaseapp.com",
  projectId: "new-chat-c713e",
  storageBucket: "new-chat-c713e.appspot.com",
  messagingSenderId: "683408654171",
  appId: "1:683408654171:web:a443cfc485f0c13855247e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()