import { postHandler } from "../socketHandlers/postHandler.js";
export const postRouter = (socket,io) => {
    const PostHandler = new postHandler(socket, io);
}