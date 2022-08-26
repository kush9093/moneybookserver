
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();


// auth token check middelware
router.use((req,resp,next)=>{
    const authorization = req.get("Authorization");
    if(!authorization || ! authorization.startsWith("Bearer")){
        return resp.status(401).json({result:false,message:"unauthorized error"})
    }
    const token = authorization.split(" ")[1];

    try{
        const payload = jwt.verify(token,process.env.SECRET_KEY);
        req.logonEmail = payload.email;
    }catch(e){
        console.log(e.message);
        return resp.status(401).json({result:false,message:"invalid token"})
    }

    next()
    
})



router.get("/",(req,resp)=>{

    console.log(req.logonEmail);
    return resp.status(200).json({result:true,datas:[]});
})


router.get("/delete",(req,resp)=>{

    console.log(req.logonEmail);
    return resp.status(200).json({result:false});
})


export default router;