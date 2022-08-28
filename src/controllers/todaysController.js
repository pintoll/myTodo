import Recap from "../models/Recap";
import Today from "../models/Today";
import { getCurrentDay, getAddedCurrentDay, formatAddedDate } from "../timeSetFunctions";

//API
export async function postGetTodayRecaps(req, res) {
    const { date } = req.body;
    const today = await Today.findOne({ date });
    if(!today) {
        await Today.create({ date });
        return res.sendStatus(300);
    }
    today.populate("todayRecapIds");
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

export async function setToday(req, res) {
    let today = await Today.findOne({date: getAddedCurrentDay(0)});
    if(!today) today = await Today.create({ date: getAddedCurrentDay(0)});

    const yesterday = await Today.findOne({date: getAddedCurrentDay(-1)}).populate("todayRecapIds");
    if(!yesterday) return res.sendStatus(404);

    if(!yesterday) return;
    for(let i = 0; i < yesterday.todayRecapIds.length; i++) {
        const recap = await Recap.findById(yesterday.todayRecapIds[i]._id);
        if(recap.checked) {
            recap.delayedDays = 0;
            recap.dateIndex += 1;
            recap.date = recap.dateTodo[recap.dateIndex];
            recap.checked = false;
            await recap.save();
        } else {
            recap.delayedDays += 1;
            await plus1DayDateTodo(recap._id);
            for(let j = 0; j < recap.dateTodo.length; j++) {
                recap.dateTodo[j] = formatAddedDate(recap.dateTodo[j], 1);
            }
            recap.date = recap.dateTodo[recap.dateIndex];
            await recap.save();
        }
        return res.sendStatus(201);
    }
}


async function plus1DayDateTodo (id) {
    const recap = await Recap.findById(id);
    for(let i = 0; i < recap.dateTodo.length; i++) {
        const deletingToday = await Today.findOne({ date: recap.dateTodo[i] });
        deletingToday.todayRecapIds.splice(deletingToday.todayRecapIds.indexOf(recap._id), 1);
        await deletingToday.save();

        recap.dateTodo[i] = formatAddedDate(recap.dateTodo[i], 1);

        let addingToday = await Today.findOne({ date: recap.dateTodo[i] });
        if(!addingToday) addingToday = await Today.create({ date: recap.dateTodo[i] });
        addingToday.todayRecapIds.push(recap._id);
        await addingToday.save();
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


//#TODO styling myTodo
//      react + typescript -> 아마 필요한 것들이 많을거임
//      이렇게 하고 추가로 다른 server에 필요한 것들을 좀 익히자
//      그러고나서 react + node js 로 하나 뭐 만들어보자.
//      그런 후에 자료구조를 하던지, 책을 좀 더 읽던지 해보자