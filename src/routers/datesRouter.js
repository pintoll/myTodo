import express from "express";
import { getDate, postDate, getCreateDate, postCreateDate, getDatesHome, postDatesHome } from "../controllers/dateController";

const datesRouter = express.Router();

datesRouter.route("/").get(getDatesHome).post(postDatesHome);
datesRouter.route("/:date([0-9]{8})").get(getDate).post(postDate);
datesRouter.route("/create").get(getCreateDate).post(postCreateDate);
export default datesRouter;