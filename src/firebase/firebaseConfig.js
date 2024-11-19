// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdTq9v66Dy6dPjayKvSD8tgEHcIaxbvaE",
  authDomain: "proyectofinalreact-55741.firebaseapp.com",
  projectId: "proyectofinalreact-55741",
  storageBucket: "proyectofinalreact-55741.firebasestorage.app",
  messagingSenderId: "48963956978",
  appId: "1:48963956978:web:e7322f47254ff6c3f9e06b",
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log(db);
console.log(auth);
console.log(app);

export { db, auth };
