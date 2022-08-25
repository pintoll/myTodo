import Recap from "../models/Recap";
import Today from "../models/Today";
import { getCurrentDay } from "../timeSetFunctions";

//API
export async function postGetTodayRecaps(req, res) {
    const { date } = req.body;
    const today = await Today.findOne({ date }).populate("todayRecapIds");
    const todayRecaps = today.todayRecapIds.filter(recap => {
        return recap.delayedDays === 0;
    });
    if(todayRecaps.length === 0) {
        return res.sendStatus(300)
    } else {
        return res.status(200).json({ todayRecaps });
    }
}

export async function postGetDelayedRecaps(req, res) {
    const { date } = req.body;
    const today = await Today.findOne({ date }).populate("todayRecapIds");
    const delayedRecaps = today.todayRecapIds.filter(recap => {
        return recap.delayedDays !== 0;
    });
    if(delayedRecaps.length === 0) {
        return res.sendStatus(300)
    } else {
        return res.status(200).json({ delayedRecaps });
    }
}

//Today
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