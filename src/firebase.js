import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBohfXq3ogjDdvoZT0C6LW_1fpz0sxbBtw",
  authDomain: "memories-70f87.firebaseapp.com",
  databaseURL:'https://memories-70f87-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: "memories-70f87",
  storageBucket: "memories-70f87.appspot.com",
  messagingSenderId: "924894240874",
  appId: "1:924894240874:web:783f59ac9a5e54f22dea13"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const storage = getStorage(app)


export { db, storage }