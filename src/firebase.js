import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


  const firebaseConfig = {
  apiKey: "AIzaSyDgL9zi3u6xMufXYZabcdeFghijklmn",
  authDomain: "cricket-app.firebaseapp.com",
  projectId: "cricket-app",
  storageBucket: "cricket-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefg123456"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
