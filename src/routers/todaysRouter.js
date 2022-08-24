import express from "express";
import { getTodaysHome, getWatchToday, postWatchToday, } from "../controllers/todaysController";

const todaysRouter = express.Router();

todaysRouter.get("/", getTodaysHome);
todaysRouter.route("/:date([0-9]{4}[-][0-9]{2}[-][0-9]{2})").get(getWatchToday).post(postWatchToday);


export default todaysRouter;