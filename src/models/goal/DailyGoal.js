import mongoose from "mongoose";

const dailyGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     day: { type: Date, required: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [mongoose.Schema.Types.ObjectId],
});

const DailyGoal = mongoose.model("DailyGoal", dailyGoalSchema);
export default DailyGoal;