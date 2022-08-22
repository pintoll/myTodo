import mongoose from "mongoose";

const todaySchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true, },
    // todayRecapIds: [{ 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: "Recap",
    // }],
    // delayedRecapIds: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Recap",
    //  }],
    // did: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "recap",
    // }],
    feedbacks: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
     }],
});

const Today = mongoose.model("Today", todaySchema);
export default Today;