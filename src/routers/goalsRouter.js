import express from "express";
import { 
    getHomeGoals,
    getHomeYearlyGoals, getCreateYearlyGoal, postCreateYearlyGoal, getYearlyGoal, getEditYearlyGoal, postEditYearlyGoal, deleteYearlyGoal,
    getHomeMonthlyGoals, getCreateMonthlyGoal, postCreateMonthlyGoal, getMonthlyGoal, getEditMonthlyGoal, postEditMonthlyGoal, deleteMonthlyGoal,
    getHomeWeeklyGoals, getCreateWeeklyGoal, postCreateWeeklyGoal, getWeeklyGoal, getEditWeeklyGoal, postEditWeeklyGoal, deleteWeeklyGoal,
    getHomeDailyGoals, getCreateDailyGoal, postCreateDailyGoal, getDailyGoal, getEditDailyGoal, postEditDailyGoal, deleteDailyGoal,
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

goalsRouter.get("/week", getHomeWeeklyGoals);
goalsRouter.route("/week/create").get(getCreateWeeklyGoal).post(postCreateWeeklyGoal);
goalsRouter.get("/week/:id([0-9a-f]{24})", getWeeklyGoal);
goalsRouter.route("/week/:id([0-9a-f]{24})/edit").get(getEditWeeklyGoal).post(postEditWeeklyGoal);
goalsRouter.delete("/week/:id([0-9a-f]{24})/delete", deleteWeeklyGoal);

goalsRouter.get("/day", getHomeDailyGoals);
goalsRouter.route("/day/create").get(getCreateDailyGoal).post(postCreateDailyGoal);
goalsRouter.get("/day/:id([0-9a-f]{24})", getDailyGoal);
goalsRouter.route("/day/:id([0-9a-f]{24})/edit").get(getEditDailyGoal).post(postEditDailyGoal);
goalsRouter.delete("/day/:id([0-9a-f]{24})/delete", deleteDailyGoal);


export default goalsRouter;