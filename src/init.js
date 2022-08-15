import "dotenv/config"
import { scheduleJob } from "node-schedule";
import "./db";

//Recap Data
import "./models/Recap";

//Goal Data
import "./models/goal/DailyGoal";
import "./models/goal/WeeklyGoal";
import "./models/goal/MonthlyGoal";
import "./models/goal/YearlyGoal";
import "./models/goal/CustomizedGoal";

//Today Data
import "./models/Today";
import "./models/Backgrounds"
import app from "./server";

const PORT = 4000;

const handalListening = () => 
    console.log(`\n※ Server listesning on port http://localhost:${PORT} ... ※`);

app.listen(PORT, handalListening);

scheduleJob("0 6 * * *", ()=>console.log(Date.now()));
