import mongoose from "mongoose";

const yearlyGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     year: { type: String, required: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [{type: mongoose.Schema.Types.ObjectId, ref: "Feedback"}],
});

const YearlyGoal = mongoose.model("YearlyGoal", yearlyGoalSchema);
export default YearlyGoal;