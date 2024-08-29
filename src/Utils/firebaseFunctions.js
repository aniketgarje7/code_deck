import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseCode";

export async function createData(collectionName, data) {
  try {
    // Generate a unique document ID
    const docRef = doc(db, collectionName);
    await setDoc(docRef, data);
    console.log("Data created successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error creating data:", error);
    return { errro: true };
  }
}

export const addUserData = async (userData,user) => {
    if (!user) {
      console.error("No user is signed in.");
      return;
    }
  
    const userId = user.uid;  // Use user ID as the document ID
    const userDocRef = doc(db, "users2", userId);
  
    try {
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        // Document exists, update it
        await updateDoc(userDocRef, {...userData});
        console.log("User data updated successfully");
      } else {
        // Document does not exist, create it
        await setDoc(userDocRef, 
        {...userData}  // Create a new array with the initial data
        );
        console.log("New user document created successfully");
      }
      return {success:true}
    } catch (error) {

      console.error("Error adding or updating user data: ", error);
      return {error:true}
    }
  };

 export const getUserData = async (userId) => {
    // Reference to the user's document
    const userDocRef = doc(db, "users2", userId);
  
    try {
      // Fetch the document
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        // Document exists, retrieve the array
        const userData = docSnap.data();  // Get the document data
  
        console.log("User array:", userData);
        return userData; // Return the array
      } else {
        console.log("No such document!");
        return null;  // Return null if the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      return null;  // Return null if there is an error
    }
  };
  
  