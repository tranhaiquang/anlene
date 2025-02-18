import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const addUser = async (userData: { fullName: string; phone: string; email: string }) => {
  try {
    const docRef = await addDoc(collection(db, "users"), userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
