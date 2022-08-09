import express from "express";
import { uploadImage } from "../middlewares";
import { getBackground, postBackground } from "../controllers/updateController";

const updateRouter =  express.Router();

updateRouter.route("/bgimage").get(getBackground).post(uploadImage.single("bgImage"), postBackground);

export default updateRouter;