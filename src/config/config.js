// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";

// config
const firebaseConfig = {
  apiKey: "AIzaSyDMeEJMCBtcRX4_wEf3pYM3CUHhiB1GXe4",
  authDomain: "shopifyg28.firebaseapp.com",
  projectId: "shopifyg28",
  storageBucket: "shopifyg28.appspot.com",
  messagingSenderId: "505096509768",
  appId: "1:505096509768:web:4147b238b13b4fe1a6fb7d",
  measurementId: "G-C3KQ1ZBFQ1"
};

const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
export const auth = getAuth(app);
