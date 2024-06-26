import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import MySQLStore from 'express-mysql-session';
import timeout from 'connect-timeout';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { BACKEND_PORT, FRONTEND_IP_PORT } from './global.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';


const app = express();

const dbOptions = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '1234',
    database: 'community_kcs'
  };


const sessionStore = new MySQLStore(dbOptions);
const session = {
    secret: "my key",
    resave: true,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true,
    }
};

app.use(cors({
    origin: `${FRONTEND_IP_PORT}`,
    credentials: true 
}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    if (req.session) {
        req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    }
    next();
});
app.use(expressSession(session));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(timeout('5s'));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100
  }));

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(BACKEND_PORT, () => { 
    console.log(`====================================== COMMUNITY BACKEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${BACKEND_PORT}`);
});
