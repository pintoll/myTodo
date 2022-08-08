import mongoose from "mongoose";

const todaySchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now() },
    todayRecaps: [mongoose.Schema.Types.ObjectId],
    delayedRecaps: [mongoose.Schema.Types.ObjectId],
    goals: [mongoose.Schema.Types.ObjectId],
    feedbacks: [mongoose.Schema.Types.ObjectId],
    did: [mongoose.Schema.Types.ObjectId],
    didnt: [mongoose.Schema.Types.ObjectId],
});

const Today = mongoose.model("Today", todaySchema);
export default Today;