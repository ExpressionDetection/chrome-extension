import { io } from "socket.io-client";

console.log("NEXT_PUBLIC_SOCKER_IO_PROTOCOL: ", process.env.NEXT_PUBLIC_SOCKER_IO_PROTOCOL)
console.log("NEXT_PUBLIC_SOCKER_IO_HOST: ", process.env.NEXT_PUBLIC_SOCKER_IO_HOST)  
console.log("NEXT_PUBLIC_SOCKER_IO_PORT: ", process.env.NEXT_PUBLIC_SOCKER_IO_PORT)  

const URL = `${process.env.NEXT_PUBLIC_SOCKER_IO_PROTOCOL}://${process.env.NEXT_PUBLIC_SOCKER_IO_HOST}:${process.env.NEXT_PUBLIC_SOCKER_IO_PORT}`;
const socket: any = io(URL, { autoConnect: false });

socket.onAny((event: any, ...args: any) => {
  console.log(event, args);
});

export default socket;