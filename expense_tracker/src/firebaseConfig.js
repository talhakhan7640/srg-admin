// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd7AtTK3YQNG6OAqtl4BKLGn3KZDG7hLc",
  authDomain: "expense-tracker01-32dd5.firebaseapp.com",
  projectId: "expense-tracker01-32dd5",
  storageBucket: "expense-tracker01-32dd5.appspot.com",
  messagingSenderId: "23491484529",
  appId: "1:23491484529:web:bedb0609d91039b01774d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;