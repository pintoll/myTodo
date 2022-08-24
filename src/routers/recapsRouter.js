import express from "express";
import { getCreateRecap, getRecapsHome, postCreateRecap, getRecapSearch, getReadRecap, getEditRecap, patchEditRecap, deleteRecap } from "../controllers/recapsController";

const recapsRouter = express.Router();

recapsRouter.get("/", getRecapsHome);
recapsRouter.get("/search", getRecapSearch);
recapsRouter.route("/create").get(getCreateRecap).post(postCreateRecap);
recapsRouter.get("/:id([0-9a-f]{24})",getReadRecap);
recapsRouter.route("/:id([0-9a-f]{24})/edit").get(getEditRecap).patch(patchEditRecap);
recapsRouter.delete("/:id([0-9a-f]{24})/delete", deleteRecap);

export default recapsRouter;