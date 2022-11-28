import { getAuth } from "firebase-admin/auth";
import { redirect } from "next/navigation";
import { Admin_Firebase } from "../firebase/firebase-admin";

export const getCurrentUser = async (cookie: string) => {
  try {
    const auth = getAuth(Admin_Firebase);
    const user = await auth.verifyIdToken(cookie);
    return user;
  } catch (error) {
    console.log(error);
    fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/deletecookie`)
      .then((res) => res.json())
      .then(console.log);

    return null;
  }
};
