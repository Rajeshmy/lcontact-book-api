const express= require("express");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();
const connectDb = require("./config/dbConnection")

const app=express();

connectDb();

const port = process.env.PORT||5000;

app.use(express.json());
app.use("/api/contact",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port,()=>{
    console.log("listening")
});