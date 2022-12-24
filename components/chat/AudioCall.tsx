import { useState, useEffect, useRef } from "react";
import { config, useClient, useMicrophoneAudioTrack } from "./settings";
import Members from "./Member";
import Controls from "./Controls";
import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  UID,
} from "agora-rtc-sdk-ng";
import { User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-init";
export default function AudioCall({
  partyId,
  setInCall,
  currentUser,
}: {
  partyId: string;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User;
}) {
  const [users, setUsers] = useState<{
    [key: string]: IAgoraRTCRemoteUser;
  }>({});
  const [start, setStart] = useState(false);
  const client = useClient();
  // const { ready, track } = useMicrophoneAudioTrack();
  const track = useRef<IMicrophoneAudioTrack>();
  useEffect(() => {
    let Init = async (name: string) => {
      await addMember(partyId, currentUser);
      const localAudioTrack = await useMicrophoneAudioTrack({
        encoderConfig: "high_quality_stereo",
      });
      track.current = localAudioTrack;
      //   addMember(partyId, currentUser, null);

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "audio") {
          if (user.audioTrack) {
            user.audioTrack.play();
            setUsers((prevUsers) => {
              return { ...prevUsers, [user.uid]: user };
            });
          }
        }
      });
      client.enableAudioVolumeIndicator();

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
      });

      client.on("user-left", async (user) => {
        console.log("user left");
        console.log(user.uid);
        await removeMember(partyId, user.uid);
        setUsers((prevUsers) => {
          const newUsers = { ...prevUsers };
          delete newUsers[user.uid];
          return newUsers;
        });
      });

      try {
        const currentUser_UID = currentUser.uid;
        const res = await fetch("/api/party/token", {
          method: "POST",
          body: JSON.stringify({
            partyId,
            uid: currentUser_UID,
          }),
        });
        const { token } = await res.json();
        await client.join(config.appId, name, token, currentUser_UID);
        if (track.current) {
          await client.publish([track.current]);
          setStart(true);
        }
      } catch (error) {
        console.log("error");
      }
    };

    try {
      Init(partyId);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, partyId, track]);
  const muteSpeaker = (value: boolean) => {
    if (value) {
      Object.values(users).forEach((user) => {
        user.audioTrack?.setVolume(0);
      });
    } else {
      Object.values(users).forEach((user) => {
        user.audioTrack?.setVolume(100);
      });
    }
  };
  return (
    <main className="flex flex-col p-6  w-full items-center justify-center gap-4  text-white ">
      <h3 className="text-xl font-bold">
        Audio Chat ({Object.keys(users).length})
      </h3>
      {start && track && <Members partyId={partyId} />}
      {track.current && (
        <Controls
          track={track.current}
          setStart={setStart}
          setInCall={setInCall}
          muteSpeaker={muteSpeaker}
          removeMember={removeMember}
          partyId={partyId}
          uid={currentUser.uid}
        />
      )}
    </main>
  );
}

const addMember = async (partyId: string, currentUser: User) => {
  const docRef = doc(db, "party", partyId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const curr_users = data?.users;

    updateDoc(docRef, {
      users: {
        ...curr_users,
        [currentUser.uid]: {
          uid: currentUser.uid,
          username: currentUser.displayName,
          photoURL: currentUser.photoURL,
          inAudioChat: true,
          timestamp: serverTimestamp(),
        },
      },
    });
  }
};

const removeMember = async (partyId: string, uid: string | UID) => {
  const docRef = doc(db, "party", partyId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data) {
      if (data.users[uid]) {
        const newUsers = data.users;
        delete newUsers[uid];
        updateDoc(docRef, {
          users: newUsers,
          timestamp: serverTimestamp(),
        });
      }
    }
  }
};
