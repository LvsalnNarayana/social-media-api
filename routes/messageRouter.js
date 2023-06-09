import { messageHandler } from "../socketHandlers/messageHandler.js";
export const messageRouter = (socket,io) => {
    const MessageHandler = new messageHandler(socket, io);
}