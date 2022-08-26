
import jwt from "jsonwebtoken";

const secret = "UdBi#3VZez!jpnm!f&5O7bkZ@Hjk!4k5"
const w_secret = "UdBi#3VZez!jpnm!f&5O7bkZ@Hjk!4k6"
const token = jwt.sign({subject:"backend",title:"jwt"},secret);
console.log(token);

const result = jwt.verify(token,secret);
console.log(result);
const v_token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiZnJvbnRlbmQiLCJ0aXRsZSI6Imp3dCIsImlhdCI6MTY2MTQwMzg3OX0.JKTZWFrSnFslZzr6M078Tvl9Uul1Z8M_tRxXZJKqTwQ";

console.log(jwt.verify(v_token,secret));
