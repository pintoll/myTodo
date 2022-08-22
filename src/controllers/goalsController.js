import Today from "../models/Today";
import DailyGoal from "../models/goal/DailyGoal";
import WeeklyGoal from "../models/goal/WeeklyGoal";
import MonthlyGoal from "../models/goal/MonthlyGoal";
import YearlyGoal from "../models/goal/YearlyGoal";
import CustomizedGoal from "../models/goal/CustomizedGoal";
import { getCurrentMonth, getCurrentWeek, getCurrentDay } from "../timeSetFunctions";

// /API
export async function patchSetGoalChecked (req, res) {
    let response;
    const { id, type } = req.body;
    if ( type === "DailyGoal" ) {
        response = await DailyGoal.findById(id);
    } else if ( type === "WeeklyGoal" ) {
        response = await WeeklyGoal.findById(id);
    } else if ( type === "MonthlyGoal" ) {
        response = await MonthlyGoal.findById(id);
    } else if ( type === "YearlyGoal" ) {
        response = await YearlyGoal.findById(id);
    } else if ( type === "CustomizedGoal" ) {
        response = await CustomizedGoal.findById(id);
    } else {
        return res.sendStatus(404);
    }

    response.checked = response.checked ? false : true;
    response.save();
    
    return res.sendStatus(200);
}

export async function deleteGoal (req, res) {
    const { id, type } = req.body;
    try {
        if ( type === "DailyGoal" ) {
            const goal = await DailyGoal.findById(id);

            await DailyGoal.deleteOne({ _id: id });
            return res.sendStatus(204);
        } else if ( type === "WeeklyGoal" ) {
            await WeeklyGoal.deleteOne({ _id: id });
            return res.sendStatus(204);
        } else if ( type === "MonthlyGoal" ) {
            await MonthlyGoal.deleteOne({ _id: id });
            return res.sendStatus(204);
        } else if ( type === "YearlyGoal" ) {
            await YearlyGoal.deleteOne({ _id: id });
            return res.sendStatus(204);
        } else if ( type === "CustomizedGoal" ) {
            await CustomizedGoal.deleteOne({ _id: id });
            return res.sendStatus(204);
        } else {
            return res.sendStatus(404);
        }
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function postGetYearlyGoals (req, res) {
    const { year } = req.body;
    const yearlyGoals = await YearlyGoal.find({ year });
    if(yearlyGoals.length === 0) {
        return res.sendStatus(300)
    } else {
        return res.status(200).json({ yearlyGoals });
    }
}

export async function postGetMonthlyGoals (req, res) {
    const { month } = req.body;
    const monthlyGoals = await MonthlyGoal.find({ month });
    if(monthlyGoals.length === 0) {
        return res.sendStatus(300)
    } else {
        return res.status(200).json({ monthlyGoals });
    }
}

export async function postGetWeeklyGoals (req, res) {
    const { week } = req.body;
    const weeklyGoals = await WeeklyGoal.find({ week });
    if(weeklyGoals.length === 0) {
        return res.sendStatus(300)
    } else {
        return res.status(200).json({ weeklyGoals });
    }
}

export async function postGetDailyGoals (req, res) {
    const { day } = req.body;
    const dailyGoals = await DailyGoal.find({ day });
    if(dailyGoals.length === 0) {
        return res.sendStatus(300)
    } else {
        return res.status(200).json({ dailyGoals });
    }
}

export async function postRenderYearlyGoal (req, res) {
    const { title, rate, year } = req.body.goal;
    const newGoal = await YearlyGoal.create({
        title,
        rate,
        year,
    });
    return res.status(201).json({ newGoal });
}

export async function postRenderMonthlyGoal (req, res) {
    const { title, rate, month } = req.body.goal;
    const newGoal = await MonthlyGoal.create({
        title,
        rate,
        month,
    });
    return res.status(201).json({ newGoal });
}

export async function postRenderWeeklyGoal (req, res) {
    const { title, rate, week } = req.body.goal;
    const newGoal = await WeeklyGoal.create({
        title,
        rate,
        week,
    });
    return res.status(201).json({ newGoal });
}

export async function postRenderDailyGoal (req, res) {
    const { title, rate, day } = req.body.goal;
    const newGoal = await DailyGoal.create({
        title,
        rate,
        day,
    });
    return res.status(201).json({ newGoal });
}





// /GOALS
export function getHomeGoals (req, res) {
    return res.render("goals/goalsHome", {pageTitle: "Goals"});
}


//Yearly
export async function getHomeYearlyGoals (req, res) {
    return res.render("goals/year/homeYearlyGoals", {pageTitle: "Yearly Goals"});
}

export function getCreateYearlyGoal (req, res) {
    return res.render("goals/year/createYearlyGoal", {pageTitle: "Create Yearly Goals"});
}

export async function postCreateYearlyGoal (req, res) {
    const { title, description, year, rate } = req.body;
    try{
        const yearlyGoal = await YearlyGoal.create({
            title,
            description,
            year,
            rate,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).redirect("/err/500");
    }

    return res.redirect("/goals/year");
}

export async function getYearlyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await YearlyGoal.findById(id);
        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedback");
        }
        return res.render("goals/year/yearlyGoal", { pageTitle: `${goal.year} Goal`, goal });
    } catch {
        return res.redirect("/err/404");
    }
}

export async function getEditYearlyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await YearlyGoal.findById(id);
        console.log(goal);
        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedbacks");
        }
        return res.render("goals/year/editYearlyGoal", {pageTitle: `Edit ${goal.title}`, goal});
    } catch {
        return res.redirect("/err/404");
    }
}
export async function postEditYearlyGoal (req, res) {
    const { id } = req.params;
    const { title, description, year, rate, checkbox } =req.body;
    await YearlyGoal.findOneAndUpdate({ id }, {
        title,
        description,
        year,
        rate,
        checked: checkbox === "on" ? true : false,
    });
    return res.redirect(`/goals/year/${id}`);
}

export async function deleteYearlyGoal (req, res) {
    const { id } = req.params;
    await YearlyGoal.deleteOne({ _id: id });
    return res.status(204).redirect("/goals/year");
}


//Month
export async function getHomeMonthlyGoals (req, res) {
    return res.render("goals/month/homeMonthlyGoals", {
        pageTitle: "Monthly Goals", 
        currentMonth: getCurrentMonth(),
        month: req.query.month ? req.query.month : false,
    });
}

export function getCreateMonthlyGoal (req, res) {
    const { month } = req.query;
    return res.render("goals/month/createMonthlyGoals", {
        pageTitle: "Create Monthly Goal", 
        month,
    });
}

export async function postCreateMonthlyGoal (req, res) {
    const { month, title, description, rate } = req.body;
    await MonthlyGoal.create({ month, title, description, rate });
    return res.redirect(`/goals/month?month=${month}`);
}

export async function getMonthlyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await MonthlyGoal.findById(id);
        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedback");
        }
        return res.render("goals/month/monthlyGoal", { pageTitle: `${goal.month} Goal`, goal });
    } catch {
        return res.redirect("/err/404");
    }
}

export async function getEditMonthlyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await MonthlyGoal.findById(id);

        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedbacks");
        }
        return res.render("goals/month/editMonthlyGoal", {pageTitle: `Edit ${goal.title}`, goal});
    } catch {
        return res.redirect("/err/404");
    }
}
export async function postEditMonthlyGoal (req, res) {
    const { id } = req.params;
    const { title, description, month, rate, checkbox } =req.body;
    console.log(title, description, month, "hello");
    const goal = await MonthlyGoal.findOneAndUpdate({ id }, {
        title,
        description,
        month,
        rate: rate,
        checked: checkbox === "on" ? true : false,
    });
    return res.redirect(`/goals/month/${id}`);
}

export async function deleteMonthlyGoal (req, res) {
    const { id } = req.params;
    const { month } = await MonthlyGoal.findById(id);
    await MonthlyGoal.deleteOne({ _id: id });
    return res.status(204).redirect(`/goals/month?month=${month}`);
}

//Week
export async function getHomeWeeklyGoals (req, res) {
    return res.render("goals/week/homeWeeklyGoals", {
        pageTitle: "Weekly Goals", 
        currentWeek: getCurrentWeek(),
        week: req.query.week ? req.query.week : false,
    });
}

export function getCreateWeeklyGoal (req, res) {
    const { week } = req.query;
    return res.render("goals/week/createWeeklyGoals", {
        pageTitle: "Create Weekly Goal", 
        week,
    });
}
export async function postCreateWeeklyGoal (req, res) {
    const { week, title, description, rate } = req.body;
    await WeeklyGoal.create({ week, title, description, rate });
    return res.redirect(`/goals/week?week=${week}`);
}

export async function getWeeklyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await WeeklyGoal.findById(id);
        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedback");
        }
        return res.render("goals/week/weeklyGoal", { pageTitle: `${goal.month} Goal`, goal });
    } catch {
        return res.redirect("/err/404");
    }
}

export async function getEditWeeklyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await WeeklyGoal.findById(id);

        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedbacks");
        }
        return res.render("goals/week/editWeeklyGoal", {pageTitle: `Edit ${goal.title}`, goal});
    } catch {
        return res.redirect("/err/404");
    }
}
export async function postEditWeeklyGoal (req, res) {
    const { id } = req.params;
    const { title, description, week, rate, checkbox } =req.body;
    console.log(title, description, week, "hello");
    const goal = await WeeklyGoal.findOneAndUpdate({ id }, {
        title,
        description,
        week,
        rate: rate,
        checked: checkbox === "on" ? true : false,
    });
    return res.redirect(`/goals/week/${id}`);
}

export async function deleteWeeklyGoal (req, res) {
    const { id } = req.params;
    const { week } = await WeeklyGoal.findById(id);
    await WeeklyGoal.deleteOne({ _id: id });
    return res.status(204).redirect(`/goals/week?week=${week}`);
}

//Day
export async function getHomeDailyGoals (req, res) {
    console.log(getCurrentDay());
    return res.render("goals/day/homeDailyGoals", {
        pageTitle: "Daily Goals", 
        currentDay: getCurrentDay(),
        day: req.query.day ? req.query.day : false,
    });
}

export function getCreateDailyGoal (req, res) {
    const { day } = req.query;
    return res.render("goals/day/createDailyGoals", {
        pageTitle: "Create Daily Goal", 
        day,
    });
}
export async function postCreateDailyGoal (req, res) {
    const { day, title, description, rate } = req.body;
    await DailyGoal.create({ day, title, description, rate });
    return res.redirect(`/goals/day?day=${day}`);
}

export async function getDailyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await DailyGoal.findById(id);
        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedback");
        }
        return res.render("goals/day/dailyGoal", { pageTitle: `${goal.month} Goal`, goal });
    } catch {
        return res.redirect("/err/404");
    }
}

export async function getEditDailyGoal (req, res) {
    try {
        const { id } = req.params;
        const goal = await DailyGoal.findById(id);

        if(goal.feedbacks.length !== 0) {
            goal.populate("Feedbacks");
        }
        return res.render("goals/day/editDailyGoal", {pageTitle: `Edit ${goal.title}`, goal});
    } catch {
        return res.redirect("/err/404");
    }
}
export async function postEditDailyGoal (req, res) {
    const { id } = req.params;
    const { title, description, day, rate, checkbox } =req.body;
    console.log(title, description, day, "hello");
    const goal = await DailyGoal.findOneAndUpdate({ id }, {
        title,
        description,
        day,
        rate: rate,
        checked: checkbox === "on" ? true : false,
    });
    return res.redirect(`/goals/day/${id}`);
}

export async function deleteDailyGoal (req, res) {
    const { id } = req.params;
    const { day } = await DailyGoal.findById(id);
    await DailyGoal.deleteOne({ _id: id });
    return res.status(204).redirect(`/goals/day?day=${day}`);
}
