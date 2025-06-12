import cookieParser from "cookie-parser";
import express from "express"
import apiRouter from "./routes/apiRouter.mjs";
import authRouter from "./routes/authRouter.mjs";
import { logger } from "./middlewares/logEvents.mjs";
import refreshTokenRouter from "./routes/refreshTokenRouter.mjs";
import errorHandler from "./middlewares/errorHandler.mjs";
import verifyJWT from "./middlewares/verifyJWT.mjs";
import credentials from "./middlewares/credentials.mjs";
import cors from "cors";
import corsOptions from "./config/corsOptions.mjs";
const app = express();
app.use(logger);

app.use(credentials);
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/auth', authRouter);
app.use('/refresh', refreshTokenRouter);
app.use(verifyJWT)
app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(3000, () => console.log('app listening on port 3000!'));