import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBbSmE4ZG3ZNIWELldyMS9njRC-lOZhYNc",
  authDomain: "los-inmaduros-roller-madrid.firebaseapp.com",
  projectId: "los-inmaduros-roller-madrid",
  storageBucket: "los-inmaduros-roller-madrid.appspot.com",
  messagingSenderId: "904969777508",
  appId: "1:904969777508:web:d8055371739f5b56e70a71"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
export default app