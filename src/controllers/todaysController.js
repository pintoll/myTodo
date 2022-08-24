import Today from "../models/Today";
import { getCurrentDay } from "../timeSetFunctions";


export function getTodaysHome(req, res) {
    return res.status(200).redirect(`/todays/${getCurrentDay()}`);
}

export async function getWatchToday(req, res) {
    const { date } = req.params;
    console.log(date);
    const today = await Today.findOne({ date });
    return res.status(200).render("todays/watchToday", {
        pageTitle: date,
        date,
        today,
    })
}

export async function postWatchToday(req, res) {
    console.log(req.body);
    return res.redirect(`/todays/${req.body.date}`);
}