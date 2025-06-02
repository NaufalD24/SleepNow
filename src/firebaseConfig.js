// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_h0HZkUvPoJcAKr3Yo8xsv73AK-vzUkE",
  authDomain: "sleepnow-4fbc3.firebaseapp.com",
  projectId: "sleepnow-4fbc3",
  storageBucket: "sleepnow-4fbc3.appspot.com",
  messagingSenderId: "193376671932",
  appId: "1:193376671932:android:df59cba13d4c45faef0b4f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
