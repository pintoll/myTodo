import express from "express";
import {  
    patchSetGoalChecked, deleteGoal, 
    postGetYearlyGoals, postGetMonthlyGoals, postGetWeeklyGoals, postGetDailyGoals, 
    postRenderYearlyGoal, postRenderMonthlyGoal, postRenderWeeklyGoal, postRenderDailyGoal,
    
 } from "../controllers/goalsController";

const apiRouter = express.Router();

apiRouter.patch("/setGoalChecked", patchSetGoalChecked);
apiRouter.delete("/deleteGoal", deleteGoal);

apiRouter.post("/yearlyGoals/get", postGetYearlyGoals);
apiRouter.post("/monthlyGoals/get", postGetMonthlyGoals);
apiRouter.post("/weeklyGoals/get", postGetWeeklyGoals);
apiRouter.post("/dailyGoals/get", postGetDailyGoals);

apiRouter.post("/yearlyGoals/render", postRenderYearlyGoal);
apiRouter.post("/monthlyGoals/render", postRenderMonthlyGoal);
apiRouter.post("/weeklyGoals/render", postRenderWeeklyGoal);
apiRouter.post("/dailyGoals/render", postRenderDailyGoal);



export default apiRouter;