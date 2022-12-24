import { useClient } from "./settings";
import { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { useCallback, useEffect, useState } from "react";
interface Props {
  track: IMicrophoneAudioTrack;
  setStart: any;
  setInCall: any;
  muteSpeaker: (value: boolean) => void;
  removeMember: (partyId: string, uid: string) => void;
  partyId: string;
  uid: string;
}
import { BsFillMicMuteFill, BsFillMicFill } from "react-icons/bs";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import { MdCallEnd } from "react-icons/md";
function Controls(props: Props) {
  const client = useClient();
  const {
    track,
    setStart,
    setInCall,
    muteSpeaker,
    removeMember,
    partyId,
    uid,
  } = props;
  const [microphone, setMicrophone] = useState(true);
  const [speackers, setSpeackers] = useState(true);
  const muteMicrophone = async () => {
    if (track) {
      await track.setEnabled(!microphone);
      setMicrophone(!microphone);
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      client.leave();
      muteMicrophone();
      setInCall(false);
      setStart(false);
      removeMember(partyId, uid);
    });
    return () => {
      window.removeEventListener("beforeunload", (e) => {
        client.leave();
        muteMicrophone();
        setInCall(false);
        setStart(false);
        removeMember(partyId, uid);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const leaveCall = useCallback(async () => {
    client.leave();
    muteMicrophone();
    setInCall(false);
    setStart(false);
    removeMember(partyId, uid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // function to  mute speackers

  return (
    <div className="  text-white flex items-end justify-center gap-4  w-full ">
      <button
        className={` ${
          microphone
            ? "bg-white text-slate-800"
            : "bg-slate-800 text-white shadow-md"
        } px-4 h-12   hover:bg-slate-400 transition-colors ease-in-out duration-200 rounded-md flex items-center justify-center gap-2`}
        onClick={muteMicrophone}
      >
        {microphone ? (
          <>
            <span>Mute</span> <BsFillMicMuteFill />
          </>
        ) : (
          <>
            <span>Unmute</span> <BsFillMicFill />
          </>
        )}
      </button>
      <button
        className={`
         px-4 h-12 ${
           speackers
             ? "bg-white text-slate-800"
             : "bg-slate-800 text-white shadow-md"
         }  hover:bg-slate-400 transition-colors ease-in-out duration-200 rounded-md flex items-center justify-center gap-2`}
        onClick={() => {
          muteSpeaker(speackers);
          setSpeackers(!speackers);
        }}
      >
        {speackers ? (
          <>
            <span>on</span>
            <BsFillVolumeUpFill />
          </>
        ) : (
          <>
            <span>off</span> <BsFillVolumeMuteFill />
          </>
        )}
      </button>

      <button
        className="bg-red px-4 h-12 rounded-md hover:bg-rose-900 "
        onClick={leaveCall}
      >
        <MdCallEnd />
      </button>
    </div>
  );
}

export default Controls;
