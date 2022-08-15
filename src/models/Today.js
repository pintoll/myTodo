import mongoose from "mongoose";
import { setDate } from "../timeSetFunctions";

const todaySchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true, default: setDate(new Date()) },
    // todayRecapIds: [{ 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Recap",
    // }],
    // delayedRecapIds: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Recap",
    //  }],
    // did: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "recap",
    // }],
    dailyGoalIds: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "DailyGoal",
     }],
     customizedGoalIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CustomizedGoal",
     }],
    feedbacks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
     }],
});

const Today = mongoose.model("Today", todaySchema);
export default Today;