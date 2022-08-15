import mongoose from "mongoose";

const customizedGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     deadline: { 
        start: { type: Date, required: true, },
        end: { type: Date, required: true, },
      },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [mongoose.Schema.Types.ObjectId],
});

const CustomizedGoal = mongoose.model("CustomizedGoal", customizedGoalSchema);
export default CustomizedGoal;