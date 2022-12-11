import { Server } from "socket.io";
const SocketHandler = (_: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing ⚠️");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("🚀⚡ Socket connected video v2 =>" + socket.id);
      socket.on("join", (room: string, callback: Function) => {
        socket.join(room);
        callback("joined room =>" + room);
      });
      socket.on(
        "video_event",
        (
          user: string,
          timeline: number,
          eventType: "play" | "pause",
          room: string
        ) => {
          socket.to(room).emit("video_event", user, timeline, eventType);
          console.log("video_event", user, timeline, eventType);
        }
      );
    });

    io.on("disconnect", () => {
      console.log("😭 Socket disconnected");
    });
  }
  res.end();
};

export default SocketHandler;
