// Import the functions you need from the SDKs you need
import  { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

export default db;