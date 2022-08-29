import Backgrounds from "../models/Backgrounds";
import Today from "../models/Today";
import { getCurrentDay } from "../timeSetFunctions";

export const home = async (req, res) => {
    const today = await Today.findOne({date: getCurrentDay()}).populate("todayRecapIds");

    const bgImage = await Backgrounds.findRandom().limit(1);
    if(bgImage.length === 1) {
        return res.render("home", {
            pageTitle: "Home", 
            bgImage: bgImage[0].imgPath, 
            date: today ? today.date : getCurrentDay(),
        });
    } else {
        return res.render("home", {
            pageTitle:"Home", 
            date: today ? today.date : getCurrentDay(),        
        });
    }
}