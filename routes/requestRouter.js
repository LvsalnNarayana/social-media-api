import { requestHandler } from "../socketHandlers/requestHandler.js";
export const messageRouter = () => {
    const RequestHandler = new requestHandler(socket, io);
}