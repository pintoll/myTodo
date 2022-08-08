import mongoose from "mongoose";

const recapSchema = new mongoose.Schema({
     title: { type: String, required: true, trim: true, },
     description: { type: String, required: true, trim: true, },
     createdAt: {type: Date, required: true, default: Date.now(), },
     rate: Number,
     didAt: Date,
     checked: { type: Boolean, required: true, default: false, },
     feedbacks: [mongoose.Schema.Types.ObjectId],
     todays: [mongoose.Schema.Types.ObjectId],
     cycle: [Number],
});

const Recap = mongoose.model("Recap", recapSchema);
export default Recap;