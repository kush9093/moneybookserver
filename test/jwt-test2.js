
import jwt from "jsonwebtoken";

const secret = "UdBi#3VZez!jpnm!f&5O7bkZ@Hjk!4k5"

const token = jwt.sign({subject:"backend"},secret,{expiresIn:5});


setTimeout(()=>{
    const r = jwt.verify(token,secret);
    console.log(r);
}, 6000);
