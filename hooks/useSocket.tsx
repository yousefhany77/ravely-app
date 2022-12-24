import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (): { socket: Socket | null; loading: boolean } => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    (async () => {
      const socket = io(process.env.NEXT_PUBLIC_API_DOMAIN!, {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
      });
      setSocket(socket);
    })();

    return () => {
      socket?.close();
      socket?.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { socket, loading: !socket };
};

export default useSocket;
