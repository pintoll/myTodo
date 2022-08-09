import Backgrounds from "../models/Backgrounds";

export const getBackground = (req, res) => {
    return res.render("update/backgroundImg", {pageTitle: "Update Background"});
}

export const postBackground = async (req, res) => {
    const { path: imgPath } = req.file;
    await Backgrounds.create({ imgPath: '/' + imgPath });
    return res.redirect("/");
}