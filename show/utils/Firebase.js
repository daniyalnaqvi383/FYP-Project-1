import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBUSG5x7157wS2VBrhmxpgAEyiRNTKBFsw",
  authDomain: "login-85b1a.firebaseapp.com",
  projectId: "login-85b1a",
 storageBucket: "login-85b1a.appspot.com",

  messagingSenderId: "714771480148",
  appId: "1:714771480148:web:7f951c62f34cba20e3b7c1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); // ✅ singular

export { auth, provider };
