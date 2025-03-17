import express from "express"   
import passport from './config/passport.mjs';
const app = express();

app.use(bodyParser.json());


app.listen(3000,()=>{
    console.log("hello world");
})