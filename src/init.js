import "dotenv/config"
import { scheduleJob } from "node-schedule";
import "./db";

//Recap Data
import "./models/Recap";
import Recap from "./models/Recap";

//Goal Data
import "./models/goal/DailyGoal";
import "./models/goal/WeeklyGoal";
import "./models/goal/MonthlyGoal";
import "./models/goal/YearlyGoal";
import "./models/goal/CustomizedGoal";

//Today Data
import "./models/Today";
import "./models/Backgrounds"
import Today from "./models/Today";

import app from "./server";
import { formatAddedDate, getCurrentDay } from "./timeSetFunctions";

const PORT = 4000;

const handalListening = () => 
    console.log(`\n※ Server listesning on port http://localhost:${PORT} ... ※`);

app.listen(PORT, handalListening);

scheduleJob("0 6 * * *", setToday);


async function setToday() {
    let today = await Today.findOne({date: getCurrentDay()});
    if(!today) today = await Today.create({ date: getCurrentDay()});

    const yesterday = await Today.findOne({date: getAddedCurrentDay(-1)}).populate("todayRecapIds");

    yesterday.todayRecapIds.forEach(async (rcp) => {
        const recap = await Recap.findById(rcp._id);
        if(recap.checked) {
            recap.dateIndex += 1;
            recap.date = recap.dateTodo[recap.dateIndex];
            await recap.save();
        } else {
            recap.delayedDays += 1;
            plus1DayDateTodo(recap);
            recap.date = dateTodo[dateIndex];
            await recap.save();
        }
    });
}


async function plus1DayDateTodo (recap) {
    recap.dateTodo.forEach(async date => {
        const deletingToday = await Today.findOne({ date });
        deletingToday.todayRecapIds.splice(deletingToday.todayRecapIds.indexOf(recap._id), 1);
        await deletingToday.save();

        date = formatAddedDate(date, 1);

        let addingToday = await Today.findOne({ date });
        if(!addingToday) addingToday = await Today.create({ date });
        addingToday.todayRecapIds.push(recap._id);
        await addingToday.save();
    });
}