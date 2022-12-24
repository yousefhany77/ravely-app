import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase/firebase-init";
import { ContinueWatching } from "../util/addToContinueWatching";

function useGetContinueWatching() {
  const { user } = useContext(AuthContext);
  const { data: continueWatching ,isLoading ,error} = useSWR(
    user?.uid ? "continueWatching" : null,
    async () => {
      // get the user id
      if (user?.uid) {
        const docRef = doc(db, "continueWatching", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as ContinueWatching;
        }
      }
    }
  );
  return [continueWatching , isLoading ,error] as const;
}

export default useGetContinueWatching;
