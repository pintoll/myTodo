import mongoose from "mongoose";

const dailyGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     day: { type: String, required: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [{type: mongoose.Schema.Types.ObjectId, ref:"Feedback"}],
});

const DailyGoal = mongoose.model("DailyGoal", dailyGoalSchema);
export default DailyGoal;