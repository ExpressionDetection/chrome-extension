import io from "socket.io-client";

console.log("NEXT_PUBLIC_SOCKER_IO_PROTOCOL: ", process.env.NEXT_PUBLIC_SOCKER_IO_PROTOCOL)
console.log("NEXT_PUBLIC_SOCKER_IO_HOST: ", process.env.NEXT_PUBLIC_SOCKER_IO_HOST)  
console.log("NEXT_PUBLIC_SOCKER_IO_PORT: ", process.env.NEXT_PUBLIC_SOCKER_IO_PORT)  

const URL = `${process.env.NEXT_PUBLIC_SOCKER_IO_PROTOCOL}://${process.env.NEXT_PUBLIC_SOCKER_IO_HOST}:${process.env.NEXT_PUBLIC_SOCKER_IO_PORT}`;
const socket: any = io(URL);

//socket.onAny((event: any, ...args: any) => {
//  console.log(event, args);
//});

socket.on("session", ({ sessionID, userID }: any) => {
  console.log("SocketIO: Started Session")
  console.log(`SessionID: ${sessionID}`)
  console.log(`UserID: ${userID}`)
  // attach the session ID to the next reconnection attempts
  // socket.auth = { sessionID }; 
  // store it in the localStorage
  localStorage.setItem("socketioSessionId", sessionID);
  // save the ID of the user
  socket.userID = userID;
});

socket.on("connect_error", (err: any) => {
  console.log("SocketIO: Session Error on Connect: ", err)
});

socket.on("disconnect", () => {
  console.log("SocketIO: Session Disconnected")
});

function connectSocketSession() {
  const sessionID = localStorage.getItem("socketioSessionId");
  //socket.auth = { sessionID }; TODO: Find a way to send session on v2.3.0
  
  socket.connect();
}

export { socket, connectSocketSession };