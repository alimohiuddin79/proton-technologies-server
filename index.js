// IMPORTS
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db/db.js";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import smtpRoutes from "./routes/smtpRoutes.js";

// CONFIGURATIONS
dotenv.config();
connectDB();

// CONSTANTS || VARIABLES
const app = express();
const port = process.env.PORT || 5000;


// MIDDLEWARE'S
app.use(cors({
    origin: 'http://localhost:5173', // Corrected URL without the trailing slash
    credentials: true, 
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": true,

}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", smtpRoutes);
app.get("/", (req, res) => {
    res.send("HEllo World");
});

app.post("/", (req, res) => {
    console.log(req.body);
});


// ERROR MIDDLEWARE'S
app.use(notFound);
app.use(errorHandler);


// SERVER
app.listen(port, () => console.log(`server is running on ${port}`));