import http from "http";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server);

server.listen(process.env.PORT || 3000);