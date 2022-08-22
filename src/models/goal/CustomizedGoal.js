import mongoose from "mongoose";

const customizedGoalSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     deadline: { 
        start: { type: String, required: true, },
        end: { type: String, required: true, },
      },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [{type: mongoose.Schema.Types.ObjectId, ref: "Feedback"}],
});

const CustomizedGoal = mongoose.model("CustomizedGoal", customizedGoalSchema);
export default CustomizedGoal;