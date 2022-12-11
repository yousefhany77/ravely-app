import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getUserRole } from "../util/getUserRole";

function useParty() {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  //      @check if user is premium
  const { user } = useContext(AuthContext);
  if (user) {
    getUserRole(user).then((role) => {
      if (role !== "basic") {
        //    update state to user subscription
        setIsPremium(true);
      }
    });
  }
  //    if not premium prompt to upgrade or use free video player
  //     => mount free video player || => redirect to upgrade page
  //    if premium create party
  //     => mount premium video player
  return <div>useParty</div>;
}

export default useParty;
