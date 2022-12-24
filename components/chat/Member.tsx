import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-init";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useClient } from "./settings";
import { UID } from "agora-rtc-sdk-ng";
function Audio({ partyId }: { partyId: string }) {
  const [members, setMembers] = useState<IMembers>({});
  const [memberSpeaking, setMemberSpeaking] = useState<UID | string>("");
  const client = useClient();
  useEffect(() => {
    client.on("volume-indicator", (users) => {
      users.forEach((user) => {
        if (Math.round(user.level) > 27) setMemberSpeaking(user.uid);
        else setMemberSpeaking("");
      });
    });
  }, [client]);
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "party", partyId), (doc) => {
      if (doc.exists()) {
        setMembers(doc.data()?.users);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [partyId]);
  if (!members) return null;
  return (
    <div className="flex items-center justify-center gap-4 p-6 bg-slate-800 w-5/6 h-full rounded-xl">
      {Object.values(members).map((member) => {
        return (
          <div
            key={member.uid}
            className="flex flex-col gap-2 items-center justify-center w-full h-full"
          >
            <div
              className={`aspect-square bg-white w-[130px] ${
                member.uid === memberSpeaking
                  ? "border-red shadow-md"
                  : "border-transparent"
              } border-4 rounded-full flex  items-center justify-center overflow-hidden relative w-full h-full `}
            >
              <Image
                alt="profile"
                src={
                  member.photoURL?.replace("s96", "s256") ||
                  "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                }
                fill
                className="object-cover object-center"
              />
            </div>
            <h1 className="font-bold  text-light-gray">
              {member.username}
            </h1>
          </div>
        );
      })}
    </div>
  );
}

export default Audio;

interface IMembers {
  [key: string]: {
    uid: string;
    username: string;
    photoURL: string;
    inAudioChat: boolean;
  };
}
