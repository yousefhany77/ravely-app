import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db, FirebaseApp } from "../firebase/firebase-init";
const addToContinueWatching = async (
  id: string,
  mediaData: ContinueWatching
) => {
  // add to continue watching
  const { currentUser } = getAuth(FirebaseApp);
  if (currentUser) {
    // get the user id
    const userId = currentUser.uid;
    const docRef = doc(db, "continueWatching", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // update the data
      console.log("Document data:", docSnap.data());
      await updateDoc(docRef, {
        [id]: mediaData,
      });
    } else {
      await setDoc(docRef, {
        [id]: mediaData,
      });
    }
    // add the data
  }
};

export default addToContinueWatching;

export interface ContinueWatching {
  mediaId: string | number;
  posterLink: string;
  title: string;
}
