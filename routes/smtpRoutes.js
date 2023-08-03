import express from "express";
import { smtpResponse } from "../controllers/smtpControllers.js";

const router = express.Router();

router.post("/", smtpResponse);

export default router;