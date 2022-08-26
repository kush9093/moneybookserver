import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import account from "./router/account.js";
import history from "./router/history.js"

const app = express();
dotenv.config()
app.use(cors());
app.use(morgan("short"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/account",account);
app.use("/api/history",history);

mongoose.connect(process.env.MONGODB_URI,{dbName:"moneybook"});



app.listen(8080,()=>{
    console.log("[SERVER] START...")
})


/*
    cors
    morgan
    express
    mongoose
    mongodb
    dotenv
    jsonwebtoken

    bcrypt

*/