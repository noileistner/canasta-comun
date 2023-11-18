import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCTyjRKEkk1P5kLqPaJWBw92YkAXiJ1XZs",
  authDomain: "canastacomun-tr.firebaseapp.com",
  projectId: "canastacomun-tr",
  storageBucket: "canastacomun-tr.appspot.com",
  messagingSenderId: "136777397623",
  appId: "1:136777397623:web:f4001cb7dec472f1df5d72",
  measurementId: "G-K5B83ZH7D0",
};

const app = initializeApp(firebaseConfig);

export function useFirebase() {
  return {
    app,
  };
}
