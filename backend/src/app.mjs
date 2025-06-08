import express from "express"   
import apiRouter from "./routes/apiRouter.mjs";
const app = express();
app.use(bodyParser.json());



app.use('/api',apiRouter);

app.listen(3000,()=>{
    console.log("hello world");
})