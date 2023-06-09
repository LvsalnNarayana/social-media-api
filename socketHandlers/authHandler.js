import { authRoutes } from "../constant.js";
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';
export class authHandler {
    constructor(socket, io) {
        this.socket = socket;
        this.io = io;
    }
    CHECK_USERNAME = asyncHandler(async (data) => {
        const username_availability = await User.CHECK_USERNAME(data);
        this.socket.emit(authRoutes.CHECK_USERNAME_RESPONSE, username_availability === null ? true : false);
    });
    CREATE_USER = asyncHandler(async (data) => {
        const user = await User.CREATE_USER(data);
        this.socket.emit(authRoutes.CREATE_USER_RESPONSE, user);
    });
    LOGIN(data) {
        console.log(data);
        console.log(this.socket?.id);
        this.socket.request.session.user = data.username;
        this.socket.request.session.save();
        this.socket.emit(authRoutes.LOGIN_USER_RESPONSE, 'user logged in');
    }
    LOGOUT() { 
        this.socket.request.session.destroy();
        this.socket.emit(authRoutes.LOGOUT_USER_RESPONSE,'user logged out')
    }

    GET_PROFILE() { }
}