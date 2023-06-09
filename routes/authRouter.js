import { authHandler } from "../socketHandlers/authHandler.js";
import { authRoutes } from "../constant.js";
export const authRouter = (socket, io) => {
    const AuthHandler = new authHandler(socket, io);
    socket.on(authRoutes.CHECK_USERNAME_REQUEST, (data) => {
        AuthHandler.CHECK_USERNAME(data);
    });
    socket.on(authRoutes.CREATE_USER_REQUEST, (data) => {
        AuthHandler.CREATE_USER(data);
    });
    socket.on(authRoutes.LOGIN_USER_REQUEST, (data) => {
        AuthHandler.LOGIN(data);
    });
    socket.on(authRoutes.LOGOUT_USER_REQUEST, (data) => {
        AuthHandler.LOGOUT(data);
    });
}