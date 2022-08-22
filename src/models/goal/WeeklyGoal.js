import mongoose from "mongoose";

const weeklyGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     week: { type: String, required: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [{type: mongoose.Schema.Types.ObjectId, ref: "Feedback"}],
});

const WeeklyGoal = mongoose.model("WeeklyGoal", weeklyGoalSchema);
export default WeeklyGoal;