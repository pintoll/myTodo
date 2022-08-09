import Backgrounds from "../models/Backgrounds";

export const home = async (req, res) => {
    const bgImage = await Backgrounds.findRandom().limit(1);
    if(bgImage.length === 1) {
        return res.render("home", {pageTitle: "Home", bgImage: bgImage[0].imgPath, });
    } else {
        return res.render("home", {pageTitle:"Home"});
    }
}