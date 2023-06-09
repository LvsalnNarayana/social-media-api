import session from "express-session";
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import dotenv from 'dotenv';
dotenv.config();
const MongoDBStore = connectMongoDBSession(session);
export const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions',
});

export const sessionMiddleware = session({
    cookie: {
        secure: false,
        maxAge: 10 * 24 * 60 * 60,
        httpOnly: false,
    },
    name: 'socSesId',
    secret: process.env.STORE_SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
})