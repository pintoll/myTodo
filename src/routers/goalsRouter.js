import express from "express";
import { 
    getHomeGoals,
    getHomeYearlyGoals, getCreateYearlyGoal, postCreateYearlyGoal, getYearlyGoal, getEditYearlyGoal, postEditYearlyGoal, deleteYearlyGoal,
    getHomeMonthlyGoals, getCreateMonthlyGoal, postCreateMonthlyGoal, getMonthlyGoal, getEditMonthlyGoal, postEditMonthlyGoal, deleteMonthlyGoal,
    } from "../controllers/goalsController";

const goalsRouter = express.Router();

goalsRouter.get("/", getHomeGoals);

goalsRouter.get("/year", getHomeYearlyGoals);
goalsRouter.route("/year/create").get(getCreateYearlyGoal).post(postCreateYearlyGoal);
goalsRouter.get("/year/:id([0-9a-f]{24})", getYearlyGoal);
goalsRouter.route("/year/:id([0-9a-f]{24})/edit").get(getEditYearlyGoal).post(postEditYearlyGoal);
goalsRouter.delete("/year/:id([0-9a-f]{24})/delete", deleteYearlyGoal);

goalsRouter.get("/month", getHomeMonthlyGoals);
goalsRouter.route("/month/create").get(getCreateMonthlyGoal).post(postCreateMonthlyGoal);
goalsRouter.get("/month/:id([0-9a-f]{24})", getMonthlyGoal);
goalsRouter.route("/month/:id([0-9a-f]{24})/edit").get(getEditMonthlyGoal).post(postEditMonthlyGoal);
goalsRouter.delete("/month/:id([0-9a-f]{24})/delete", deleteMonthlyGoal);



export default goalsRouter;