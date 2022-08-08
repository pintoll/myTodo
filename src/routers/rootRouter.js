import express from "express";
import { home } from "../controllers/todayController";

const rootRouter =  express.Router();

rootRouter.get("/", home);

export default rootRouter;