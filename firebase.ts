// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBsbqntGBjcfDgq4PQFPrs1qIJLB-FJRJI",
  authDomain: "smartspace-67e98.firebaseapp.com",
  projectId: "smartspace-67e98",
  storageBucket: "smartspace-67e98.appspot.com",
  messagingSenderId: "73370055031",
  appId: "1:73370055031:web:2bb926f3d11ccc08f73172",
  measurementId: "G-K44KVMR17B",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
