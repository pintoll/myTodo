import Recap from "../models/Recap";
import Today from "../models/Today";
import { defaultRecapCycle, getCurrentDay, sortRecapCycle } from "../timeSetFunctions";

// Default Functions 
async function updateTodayForCreateRecap (_id, date) {
    const today = await Today.findOne({ date });
    if(today) {
        today.todayRecapIds.push(_id);
        await today.save();
        return;
    } else {
        const newToday = await Today.create({ date })
        newToday.todayRecapIds.push(_id);
        await today.save();
        return;
    }
}

async function updateTodayForDeleteRecap (_id, date) {
    const today = await Today.findOne({ date });
    if(today) {
        const idx = today.todayRecapIds.indexOf(_id);
        if(idx > -1) today.todayRecapIds.splice(idx, 1)
        return;
    } return;
}

// API
export async function patchSetRecapChecked(req, res) {
    const { id } = req.body;
    const recap = await Recap.findById(id);
    recap.checked = !recap.checked;
    await recap.save();
    
    return res.sendStatus(200);
}

export async function removeRecap(req, res) {
    const { id } = req.body;
    const recap = await Recap.findById(id);
    try {
        recap.dateTodo.forEach(async (date) => {
        const today = await Today.findOne({ date });
        if(today) {
            const idx = today.todayRecapIds.indexOf(recap._id);
            today.todayRecapIds.splice(idx, 1);
            await today.save();
            }
        });        
    } catch(err) {
        console.log("Failed to edit Today", err);
        return res.sendStatus(500);
    }

    await Recap.findByIdAndDelete(id);
    return res.sendStatus(204);
}

export async function postRenderRecap (req, res) {
    const { title, description,rate, date } = req.body.recap;
    const dateTodo = defaultRecapCycle(date);
    let newRecap;
    try {
        newRecap = await Recap.create({
            title,
            description,
            rate,
            date,
            dateTodo,
        });
    } catch (err) {
        console.log("Failed to make Recap");
        return res.sendStatus(500);
    }

    try {
        newRecap.dateTodo.forEach(async (date) => {
            const today = await Today.findOne({ date });
            if(today) {
                today.todayRecapIds.push(newRecap._id);
                await today.save();
            } else {
                await Today.create({
                    date,
                    todayRecapIds: [newRecap._id],
                });
            }
        });
    } catch(err) {
        console.log("Failed to make Today", err);
        await Recap.findByIdAndRemove(newRecap._id);
        return res.sendStatus(500);
    }
    return res.status(201).json({ newRecap });
}

//Controllers
export function getRecapsHome (req, res) {
    return res.status(200).render("recaps/recapsHome", {
        pageTitle: "Recaps",
    })
}

export async function getRecapSearch (req, res) {
    const { keyword } = req.query;
    const searchedRecaps = await Recap.find({ title: {
        $regex: new RegExp(keyword, "i"),
        }, 
    });

    return res.render("recaps/searchRecaps", {
        pageTitle: "Search Recaps", 
        searchedRecaps,
    });
}

export function getCreateRecap (req, res) {
    const date = getCurrentDay();
    return res.status(200).render("recaps/createRecap", {
        pageTitle: "Create Recap",
        date,
    });
}

export async function postCreateRecap (req, res) {
    const { title, description, rate, date, defaultCycle, addedCycleStrings } = req.body;
    let dateTodo;
    
    if(addedCycleStrings !== "")  {
        const addedCycleArray = addedCycleStrings.split(",");
        dateTodo = ((defaultCycle === "on") 
            ? sortRecapCycle(defaultRecapCycle(date), addedCycleArray) 
            : addedCycleArray);
    } else {
        dateTodo = defaultRecapCycle(date);
    }

    let newRecap;
    try {
        newRecap = await Recap.create({
            title,
            description,
            rate,
            date,
            dateTodo,
        });
    } catch (err) {
        console.log("Failed to make Recap");
        return res.status(500).send("Failed to make recap");
    }

    try {
        newRecap.dateTodo.forEach(async (date) => {
            const today = await Today.findOne({ date });
            if(today) {
                today.todayRecapIds.push(newRecap._id);
                await today.save();
            } else {
                await Today.create({
                    date,
                    todayRecapIds: [newRecap._id],
                });
            }
        });
    } catch(err) {
        console.log("Failed to make Today", err);
        await Recap.findByIdAndRemove(newRecap._id);
        return res.status(500).send("Failed to make today");
    }

    return res.status(201).redirect("/recaps"); 
}

export async function getReadRecap (req, res) {
    const { id } = req.params;
    
    const recap = await Recap.findById(id);
    if(recap) {
        return res.status(200).render("recaps/readRecap", {
            pageTitle: recap.title,
            recap,
        });
    } 
    return res.status(404).render("404", {pageTitle: 404});
}

export async function getEditRecap (req, res) {
    const { id } = req.params;
    const recap = await Recap.findById(id);
    res.status(200).render("recaps/editRecap", {
        pageTitle: "Edit Recap",
        recap,
        now: getCurrentDay(),
    });
}

export async function patchEditRecap (req, res) {
    const { id } = req.params;
    const { title, description, rate, checkbox, addedCycleStrings } = req.body;
    
    const recap = await Recap.findById(id);
    recap.title = title;
    recap.description = description;
    recap.rate = rate;
    recap.checked = (checkbox === "on");
    const cycleArray = addedCycleStrings.split(",")
    const deletedDateTodo = recap.dateTodo.slice(recap.dateIndex).filter(x => !cycleArray.includes(x));
    const addedDateTodo = cycleArray.filter(x => !recap.dateTodo.slice(recap.dateIndex).includes(x));
    console.log(deletedDateTodo, addedDateTodo);

    try {
        addedDateTodo.forEach(async (date) => {
            const today = await Today.findOne({ date });
            if(today) {
                today.todayRecapIds.push(recap._id);
                await today.save();
            } else {
                await Today.create({
                    date,
                    todayRecapIds: [recap._id],
                });
            }
        });

        deletedDateTodo.forEach(async (date) => {
            const today = await Today.findOne({ date });
            if(today) {
                const idx = today.todayRecapIds.indexOf(recap._id);
                today.todayRecapIds.splice(idx, 1);
                await today.save();
            }
        });        
    } catch(err) {
        console.log("Failed to edit Today", err);
        return res.status(500).send("Failed to edit today");
    }

    recap.dateTodo = [].concat(recap.dateTodo.slice(0, recap.dateIndex), cycleArray);
    recap.date = recap.dateTodo[recap.dateIndex];
    await recap.save();

    return res.status(201).redirect(`/recaps/${id}`);
}

export async function deleteRecap (req, res) {
    const { id } = req.params;
    const recap = await Recap.findById(id);
    try {
        recap.dateTodo.forEach(async (date) => {
        const today = await Today.findOne({ date });
        if(today) {
            const idx = today.todayRecapIds.indexOf(recap._id);
            today.todayRecapIds.splice(idx, 1);
            await today.save();
            }
        });        
    } catch(err) {
        console.log("Failed to edit Today", err);
        return res.status(500).send("Failed to edit today");
    }

    await Recap.findByIdAndDelete(id);
    return res.status(201).redirect("/recaps");
}