import express, { json } from "express"   

const app = express();

app.use(bodyParser.json());


app.listen(3000,()=>{
    console.log("hello world");
})