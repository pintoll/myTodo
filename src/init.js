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
import { formatAddedDate, getCurrentDay, getAddedCurrentDay } from "./timeSetFunctions";

const PORT = 4000;

const handalListening = () => 
    console.log(`\n※ Server listesning on port http://localhost:${PORT} ... ※`);

app.listen(PORT, handalListening);

scheduleJob("0 6 * * *", setToday);

async function setToday() {
    let today = await Today.findOne({date: getAddedCurrentDay(1)});
    if(!today) today = await Today.create({ date: getAddedCurrentDay(1)});

    const yesterday = await Today.findOne({date: getAddedCurrentDay(0)}).populate("todayRecapIds");

    if(!yesterday) return;
    for(let i = 0; i < yesterday.todayRecapIds.length; i++) {
        const recap = await Recap.findById(yesterday.todayRecapIds[i]._id);
        console.log(recap);
        if(recap.checked) {
            recap.delayedDays = 0;
            recap.dateIndex += 1;
            recap.date = recap.dateTodo[recap.dateIndex];
            recap.checked = false;
            await recap.save();
        } else {
            recap.delayedDays += 1;
            await plus1DayDateTodo(recap._id);
            for(let j = 0; j < recap.dateTodo.length; j++) {
                recap.dateTodo[j] = formatAddedDate(recap.dateTodo[j], 1);
            }
            recap.date = recap.dateTodo[recap.dateIndex];
            await recap.save();
        }
        console.log(recap)
    }
}


async function plus1DayDateTodo (id) {
    const recap = await Recap.findById(id);
    for(let i = 0; i < recap.dateTodo.length; i++) {
        const deletingToday = await Today.findOne({ date: recap.dateTodo[i] });
        deletingToday.todayRecapIds.splice(deletingToday.todayRecapIds.indexOf(recap._id), 1);
        await deletingToday.save();

        recap.dateTodo[i] = formatAddedDate(recap.dateTodo[i], 1);

        let addingToday = await Today.findOne({ date: recap.dateTodo[i] });
        if(!addingToday) addingToday = await Today.create({ date: recap.dateTodo[i] });
        addingToday.todayRecapIds.push(recap._id);
        await addingToday.save();
    }
}