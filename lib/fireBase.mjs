import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbSmE4ZG3ZNIWELldyMS9njRC-lOZhYNc",
  authDomain: "los-inmaduros-roller-madrid.firebaseapp.com",
  projectId: "los-inmaduros-roller-madrid",
  storageBucket: "los-inmaduros-roller-madrid.appspot.com",
  messagingSenderId: "904969777508",
  appId: "1:904969777508:web:d8055371739f5b56e70a71",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;

export const setDocument = (path, data, id) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path, id), data);
};

export const updateDocument = (path, data, id) => {
  data.updatedAt = serverTimestamp();
  return setDoc(doc(db, path, id), data, { merge: true });
};

// obtener documentes de coleccion

export const getDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef)  

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; 
    } else {
      console.error("No se encontró el documento");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return null;
  }
};

