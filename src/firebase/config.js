import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCE0q_RaJeGgPlRU-bVrTCWN0MISje5z4U",
  authDomain: "myshop-11thapr.firebaseapp.com",
  projectId: "myshop-11thapr",
  storageBucket: "myshop-11thapr.appspot.com",
  messagingSenderId: "140752846532",
  appId: "1:140752846532:web:628ff1c6b9c02f1ce71391"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)
export default app