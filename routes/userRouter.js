import { userHandler } from "../socketHandlers/userHandler.js";
export const userRouter = (socket, io) => {
    const UserHandler = new userHandler(socket, io);
    socket.on('', () => { })
}