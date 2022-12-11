import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (): { socket: Socket | null; loading: boolean } => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    (async () => {
      await fetch("/api/socket/video");
      const socket = io();
      setSocket(socket);
    })();
    console.log(socket);
    return () => {
      console.log("disconnect");
      socket?.disconnect();
      socket?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { socket, loading: !socket };
};

export default useSocket;
