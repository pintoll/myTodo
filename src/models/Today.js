import mongoose from "mongoose";

const todaySchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true, },
    todayRecapIds: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "todayRecap",
        default: [],
    }],
    delayedRecapIds: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "delayedRecap",
        default: [],
     }],
    feedbacks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
        default: [],
     }],
});

const Today = mongoose.model("Today", todaySchema);
export default Today;