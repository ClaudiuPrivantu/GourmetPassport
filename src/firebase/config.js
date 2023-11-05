import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAsP6REPIJCayyWEiM7ZeadJfLdPyqweww",
  authDomain: "gourmetpassport-be2c1.firebaseapp.com",
  projectId: "gourmetpassport-be2c1",
  storageBucket: "gourmetpassport-be2c1.appspot.com",
  messagingSenderId: "356040579335",
  appId: "1:356040579335:web:1fadc6fcbe906ff5218da2",
  measurementId: "G-6QLFNXRNPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app