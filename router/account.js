import express from "express";
import Account from "../model/account.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();


router.post("/auth", async (req, resp) => {
    let response = await Account.findOne({ email: req.body.email })
    if (response) {
        let pwd = await bcrypt.compare(req.body.password, response.password)
        if (pwd) {
            //===========================================================
            const token = jwt.sign({email:response.email},process.env.SECRET_KEY,{expiresIn: 60*60*12})



            resp.json({ result: true,message:response,token })
        } else {
            resp.json({ result: false })
        }
    } else {
        resp.json({ result: false })
    }


});

router.post("/register", async (req, resp) => {
    let password = await bcrypt.hash(req.body.password, 10)
    try {
        let response = await Account.create({
            email: req.body.email, password: password, name: req.body.name,
            gender: req.body.gender, birth: req.body.birth
        });
        resp.json({ result: true });
    } catch (e) {
        resp.json({ result: false })
    }

});

router.post("/valid", async (req, resp) => {
    console.log(req.body);
    try{
        const data = jwt.verify(req.body.token,process.env.SECRET_KEY);
        resp.status(200).json({result:true, owner:data.email})
    } catch(e){
        resp.status(401).json({result:false})
    }

});






export default router;