import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCYhdVTpoxmYMaW4BZEvJnML-jpqAIgiAw",
  authDomain: "cis-events-6308b.firebaseapp.com",
  databaseURL: "https://cis-events-6308b-default-rtdb.firebaseio.com",
  projectId: "cis-events-6308b",
  storageBucket: "cis-events-6308b.appspot.com",
  messagingSenderId: "509046888363",
  appId: "1:509046888363:web:46b2a01136f672031f64ee"
};


const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});
export const auth = getAuth();
export const database = getFirestore();
