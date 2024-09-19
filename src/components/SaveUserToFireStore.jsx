import { useAuth } from '@clerk/nextjs';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/fireBase.mjs';

const SaveUserToFirestore = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado

  const saveUserData = async () => {
    if (user) {
      try {
        // Guardar los datos del usuario en Firestore
        await setDoc(doc(db, 'dataUsers', user.id), {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: user.fullName,
          createdAt: new Date(),
        });
        console.log('Usuario guardado en Firestore');
      } catch (error) {
        console.error('Error al guardar el usuario en Firestore:', error);
      }
    }
  };

  // Llama a la función cuando el usuario se autentique
  saveUserData();

  return null; // No necesitas renderizar nada aquí
};

export default SaveUserToFirestore;
