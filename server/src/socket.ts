import { Server } from "socket.io";


export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("message", (data)=>{
        console.log("The message is..", data);
        socket.broadcast.emit("message", data);
    })

    socket.on("disconnect", ()=>{
        console.log("a user disconnected", socket.id);
    })
  });

 
}
