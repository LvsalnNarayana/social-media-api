import { Server } from "socket.io";
import { sessionMiddleware } from "./sessionMiddleware.js";
import {
    setSocketInstance,
    addNewConnectedUser,
    disconnectUser,
} from "../socketHandlers/connectionHandler.js";
import { authRouter } from "./../routes/authRouter.js";
import { postRouter } from "./../routes/postRouter.js";
import { userRouter } from "./../routes/userRouter.js";
import { messageRouter } from "./../routes/messageRouter.js";
export const registerSocketServer = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:4200"],
            methods: ["GET", "POST", "UPDATE", "DELETE"],
        },
        credentials: true,
    });
    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });
    io.on("connection", (socket) => {
        setSocketInstance(io);
        if (socket?.request?.session?.user?.id !== null) {
            addNewConnectedUser(socket?.id, socket?.request?.session?.user?.id);
            authRouter(socket, io);
            postRouter(socket, io);
            userRouter(socket, io);
            messageRouter(socket, io);
        }
        socket.on("disconnect", () => {
            disconnectUser(socket?.id);
        });
    });
};
