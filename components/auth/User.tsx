import SignOutButton from "./SignOut";
import LoginButton from "./LoginButton";
import { getAuth } from "firebase/auth";
import { FirebaseApp } from "../../firebase/firebase-init";

function User() {
  const auth = getAuth(FirebaseApp);
  const userData = auth.currentUser;
  if (userData ) {
    return (
      <div>
        <span className="text-red font-bold">{userData.displayName}</span>
        <SignOutButton />
      </div>
    );
  }
  return <LoginButton />;
}

export default User;
