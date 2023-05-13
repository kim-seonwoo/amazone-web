//firebase에 대한 초기설정

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZiztOVgBqu_5yZWXgQSouA-tbUL3saQc",
  authDomain: "e-clone-web-eddc0.firebaseapp.com",
  projectId: "e-clone-web-eddc0",
  storageBucket: "e-clone-web-eddc0.appspot.com",
  messagingSenderId: "376878672873",
  appId: "1:376878672873:web:957d881260a3af46f0f978",
  measurementId: "G-2LWQNDN3W9",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); //파이어 베이스 데이터 베이스 구축
const auth = getAuth();

export { db, auth };
