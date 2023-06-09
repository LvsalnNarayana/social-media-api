import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './utils/sessionMiddleware.js';
import { store } from './utils/sessionMiddleware.js';
import asyncHandler from "express-async-handler";
import { registerSocketServer } from './utils/registerSocket.js';
import connectDB from './utils/connectDB.js';
import cors from 'cors';

const app = express();
const server = createServer(app);
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
app.use((req, res, next) => {
    connectDB().then(() => {
        next()
    }).catch((err) => {
        next(err)
    })
})
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.get('/', asyncHandler(async (req, res, next) => {
    let cookies = req.headers.cookie;
    let cookie_obj = {};
    let sessionId = req.sessionID;
    cookies?.split(";").map((data) => {
        cookie_obj[data.trim().split("=")[0]] = data.trim().split("=")[1];
    });
    if (cookie_obj["socSesId"] === null || cookie_obj["socSesId"] === undefined) {
        req.session.user = null;
        req.session.save();
        return res.status(404).json({
            cookie: false,
            session: false,
            message: "Session not Found.",
        });
    }
    store.get(sessionId, async (err, data) => {
        if (data !== null && data !== undefined) {
            if (req.session.cookie.expires.getTime() < new Date().getTime()) {
                req.session.user = null;
                req.session.save();
                return res.status(440).json({
                    cookie: true,
                    session: false,
                    message: "Session Expired. Please Login Again.",
                });
            } else {
                return res.status(200).json({ cookie: true, session: true, status: "session initiated" });
            }
        } else {
            req.session.user = null;
            req.session.save();
            return res.status(404).json({
                cookie: true,
                session: false,
                message: "Session not Found.",
            });
        }
    });
}));
app.use((err, req, res, next) => {
    console.log('_________ERROR_________');
    console.log(err);
    res.send("'error found here");
})
registerSocketServer(server);
server.listen(process.env.PORT || 3000);