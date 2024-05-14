import express from 'express'; 
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import { BACKEND_PORT, FRONTEND_IP_PORT } from './global.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';


const app = express();
const session = {
    secret: "my key",
    resave: true,
    saveUninitialized: true,
}

app.use(cors({
    origin: `${FRONTEND_IP_PORT}`,
    credentials: true 
}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(expressSession(session));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(BACKEND_PORT, () => { 
    console.log(`====================================== COMMUNITY BACKEND SERVER START ! ======================================`);
    console.log(`PORT NUMBER -> ${BACKEND_PORT}`);
});
