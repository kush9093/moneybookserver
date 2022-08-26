import dotenv from "dotenv";

dotenv.config();

console.log(process.cwd());
console.log(process.env.MONGODB_URI);
console.log(process.env.SECRET_KEY);