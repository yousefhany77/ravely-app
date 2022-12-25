import { memo, useEffect, useRef, VideoHTMLAttributes } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Socket } from "socket.io-client";
import useSocket from "../../hooks/useSocket";
import "react-toastify/dist/ReactToastify.css";
import LoadingPlayer from "./LoadingPlayer";
interface IVideoPlayer extends VideoHTMLAttributes<HTMLVideoElement> {
  room: string;
  src: string;
  mediaType: "mp4" | "webm";
  className?: string;
  username: any;
}

const VideoPlayer = (props: IVideoPlayer) => {
  const { socket, loading } = useSocket();
  if (loading) return <LoadingPlayer />;
  return <Video socket={socket} {...props} />;
};
export default memo(VideoPlayer);
interface VideoProps extends IVideoPlayer {
  socket: Socket | null;
}
const Video = ({
  socket,
  room,
  src,
  mediaType,
  className,
  username,
  ...rest
}: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    socket?.emit("join-room", room, username, (msg: string) => {
      toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        icon: false,
      });
    });
  }, [room, socket, username]);
  // add event listener
  useEffect(() => {
    console.log("monted");
    const handdleEvent = (
      user: string,
      timeline: number,
      eventType: "play" | "pause"
    ) => {
      socket?.emit("video_event", user, timeline, eventType, room);
    };

    const video = videoRef.current;
    if (videoRef.current && socket) {
      videoRef.current.addEventListener("pause", (e: any) =>
        handdleEvent(username, e.target.currentTime, "pause")
      );
      videoRef.current.addEventListener("play", (e: any) =>
        handdleEvent(username, e.target.currentTime, "play")
      );
    }

    return () => {
      console.log("unmonted");
      if (video) {
        video.removeEventListener("pause", (e) =>
          handdleEvent(" ", 0, "pause")
        );
        video.removeEventListener("play", (e) => handdleEvent(" ", 0, "play"));
      }
    };
  }, [room, socket, username]);

  // receive event
  useEffect(() => {
    socket?.on(
      "video_event",
      (user: string, timeline: number, eventType: string) => {
        toast.info(`${user} ${eventType} at ${timeline}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          icon: "🎥",
        });
        const video = videoRef.current;
        if (video) {
          switch (eventType) {
            case "play":
              video.paused && video.play();
              break;
            case "pause":
              video.pause();
              break;
            default:
              break;
          }
          if (
            timeline > 0 &&
            timeline < video.duration &&
            !video.paused &&
            !video.ended &&
            video.readyState > 2
          ) {
            video.currentTime = timeline;
          }
        }
      }
    );
  }, [socket]);
  return (
    <>
      <ToastContainer limit={3} hideProgressBar={true} />
      <video
        ref={videoRef}
        controls
        width="100%"
        controlsList="nodownload"
        contextMenu="return false;"
        autoPlay
        className={className}
        {...rest}
      >
        <source src={src} type={`video/${mediaType || "mp4"}`} />
      </video>
    </>
  );
};
