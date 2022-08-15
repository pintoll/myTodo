import mongoose from "mongoose";

const monthlyGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     month: { type: String, required: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [mongoose.Schema.Types.ObjectId],
});

const MonthlyGoal = mongoose.model("MonthlyGoal", monthlyGoalSchema);
export default MonthlyGoal;