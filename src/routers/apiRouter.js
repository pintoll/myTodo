import express from "express";
import {  
    patchSetGoalChecked, deleteGoal, 
    postGetYearlyGoals, postGetMonthlyGoals, postGetWeeklyGoals, postGetDailyGoals, 
    postRenderYearlyGoal, postRenderMonthlyGoal, postRenderWeeklyGoal, postRenderDailyGoal,
    
 } from "../controllers/goalsController";
import { removeRecap, patchSetRecapChecked, postRenderRecap } from "../controllers/recapsController";
import { postGetTodayRecaps, postGetDelayedRecaps, setToday } from "../controllers/todaysController";

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

apiRouter.patch("/recap/isChecked", patchSetRecapChecked);
apiRouter.delete("/recap/remove", removeRecap);

apiRouter.post("/recap/render", postRenderRecap);

apiRouter.post("/today/get/todayRecaps", postGetTodayRecaps);
apiRouter.post("/today/get/delayedRecaps", postGetDelayedRecaps);

apiRouter.post("/today/set", setToday);



export default apiRouter;