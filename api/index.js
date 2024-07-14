import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import postRoutes from './routes/post.route.js' 
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((error) => {
    console.log(error);
  });


const app = express();

app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("server is running on port 3000!!");
});


app.use("/api/user", userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/post',postRoutes)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;

  const message = err.message || 'internal server error';

  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})