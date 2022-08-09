import mongoose from "mongoose";
import random from "mongoose-random";

const backgroundSchema = new mongoose.Schema({
    imgPath: { type: String, index: true, required: true },
});
backgroundSchema.plugin(random, { path: "r" });

const Backgrounds = mongoose.model("Backgrounds",backgroundSchema);
export default Backgrounds;