import express from "express";
import {  
    patchSetGoalChecked, deleteGoal, postGetYearlyGoals, postGetMonthlyGoals
 } from "../controllers/goalsController";

const apiRouter = express.Router();

apiRouter.patch("/setGoalChecked", patchSetGoalChecked);
apiRouter.delete("/deleteGoal", deleteGoal);

apiRouter.post("/yearlyGoals/get", postGetYearlyGoals);

apiRouter.post("/monthlyGoals/get", postGetMonthlyGoals);

export default apiRouter;