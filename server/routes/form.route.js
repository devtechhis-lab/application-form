import express from "express";
import { newRegistration } from "../controller/form.controller.js";

const router = express.Router();

router.post("/", newRegistration);

export default router;
