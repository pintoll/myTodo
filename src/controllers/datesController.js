import Today from "../models/Today";

export function getDatesHome (req, res) {
    return res.render("dates/datesHome", {pageTitle: "Dates"});
}

export function postDatesHome (req, res) {
    let {date} = req.body;
    date = date.substring(0,4) + date.substring(5,7) + date.substring(8,10);
    return res.redirect(`/dates/${date}`);
}

export async function getDate (req, res) {
    const { date } = req.params;
    const year = date.substring(0,4);
    const month = date.substring(4,6);
    const day = date.substring(6,8);
    const dateTime = new Date(`${year}-${month}-${day} 06:00:00`);

    const today = await Today.findOne({date: dateTime});
    if (today && today.goalIds && today.goalIds.length !== 0) {
        today.populate("DailyGoal");
    }
    return res.render("dates/date", {
        pageTitle:`${month}/${day}/${year}`, 
        year, 
        month, 
        day,
        today,
    });
}

export function postDate (req, res) {
    res.redirect("/");
}

export function getCreateDate (req, res) {
    res.render("dates/createDate", {pageTitle: "Create Date"})
}

export async function postCreateDate (req, res) {
    const { todayStr } = req.body;
    console.log(todayStr, typeof todayStr);
    const year = todayStr.substring(0,4);
    const month = todayStr.substring(5,7);
    const day = todayStr.substring(8,10);

    
    const today = await Today.create({
        date: new Date(`${year}-${month}-${day} 06:00:00`),
    });

    res.redirect("/dates");
}