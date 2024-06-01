// src/firebaseConfig.js
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbQELjNVTsL2LQUhMn-wBGj81xqFL8ZVI",
  authDomain: "autofeeder-bf528.firebaseapp.com",
  databaseURL:
    "https://autofeeder-bf528-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "autofeeder-bf528",
  storageBucket: "autofeeder-bf528.appspot.com",
  messagingSenderId: "334530359522",
  appId: "1:334530359522:web:5f7e800319b273ae73eebb",
  measurementId: "G-6B8XTV43MY",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

export {db, storage};
