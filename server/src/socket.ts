import { Server } from "socket.io";


export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  });

  io.on("disconnect", (socket) => {
    console.log("a user disconnected", socket.id);
  });
}
