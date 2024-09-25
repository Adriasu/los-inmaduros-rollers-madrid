"use client";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fireBase.mjs";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saveUserToFirestore = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const userDocRef = doc(db, "dataUsers", user.id);
          const docSnapshot = await getDoc(userDocRef);

          if (!docSnapshot.exists()) {
            console.log("Guardando nuevo usuario en Firestore...");
            await setDoc(userDocRef, {
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress || "Sin correo",
              name: user.fullName || "Usuario de Ejemplo",
              firstName: user.firstName,
              image: user.imageUrl,
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Error al guardar el usuario en Firestore:", error);
        }
      }
    };

    saveUserToFirestore();
  }, [isLoaded, isSignedIn, user]);

  return (
    <AuthContext.Provider value={{ isSignedIn, user, isLoaded, isSaving }}>
      {children}
    </AuthContext.Provider>
  );
}
