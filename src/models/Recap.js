import mongoose from "mongoose";

const recapSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, trim: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     checked: { type: Boolean, required: true, default: false, },
     date: { type: String, required: true, },
     dateIndex: { type: Number, required: true, default: 0 },
     dateTodo: [{ type: String, required: true, }],
     feedbacks: [{type: mongoose.Schema.Types.ObjectId, ref: "Feedback"}],
});

const Recap = mongoose.model("Recap", recapSchema);
export default Recap;