import { renderGoal } from "./goalCRUD";
import { renderRecap } from "./recapCRUD";
import { getCurrentDay, getCurrentMonth, getCurrentWeek } from "./setTimeFunctions";

// Clock
const getClock = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
    
}

const clock = document.querySelector("h1.user__clock");
getClock();
setInterval(getClock, 1000);


// Goals
const GOAL_TYPE = ["YearlyGoal", "MonthlyGoal", "WeeklyGoal", "DailyGoal"];

const goalsContainer = document.getElementById("goals");
const goalsSwitchingDiv = goalsContainer.querySelector(".switching-div");
const goalsSwitchH3 = goalsSwitchingDiv.querySelector("h3");
const goalsSwitchLeft = goalsSwitchingDiv.querySelector(".fa-arrow-left");
const goalsSwitchRight = goalsSwitchingDiv.querySelector(".fa-arrow-right");
const goalsList = document.getElementById("goals__ul");
const goalForm = goalsList.querySelector("form");

const eraseGoal = () => {
    while(goalsList.childNodes.length > 1) {
        goalsList.lastChild.remove();
    }
}

const printGoal = async (newGoal) => {
    const goalLi = renderGoal(newGoal, GOAL_TYPE[goalsSwitchH3.dataset.enum]);
    const description = goalLi.querySelector("div").querySelector("p");
    description.remove();
    goalsList.appendChild(goalLi);
}

const paintGoal = async () => {
    eraseGoal();
    if(GOAL_TYPE[goalsSwitchH3.dataset.enum] === "YearlyGoal") {
        const year = new Date().getFullYear();
        const response = await fetch("/api/yearlyGoals/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ year }),
        });

        if(response.status === 200) {
            const { yearlyGoals } = await response.json();
            yearlyGoals.forEach(goal => {
                printGoal(goal);
            });
        } else if(response.status === 300) {
            //
        } else {
            console.log(response.status);
        }
    }

    else if(GOAL_TYPE[goalsSwitchH3.dataset.enum] === "MonthlyGoal") {
        const month = getCurrentMonth();
        const response = await fetch("/api/monthlyGoals/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ month }),
        });

        if(response.status === 200) {
            const { monthlyGoals } = await response.json();
            monthlyGoals.forEach(goal => {
                printGoal(goal);
            });
        } else if(response.status === 300) {
            //
        } else {
            console.log(response.status);
        }
    }

    else if(GOAL_TYPE[goalsSwitchH3.dataset.enum] === "WeeklyGoal") {
        const week = getCurrentWeek();
        const response = await fetch("/api/weeklyGoals/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ week }),
        });

        if(response.status === 200) {
            const { weeklyGoals } = await response.json();
            weeklyGoals.forEach(goal => {
                printGoal(goal);
            });
        } else if(response.status === 300) {
            //
        } else {
            console.log(response.status);
        }
    }

    else if(GOAL_TYPE[goalsSwitchH3.dataset.enum] === "DailyGoal") {
        const day = getCurrentDay();
        const response = await fetch("/api/dailyGoals/get", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ day }),
        });

        if(response.status === 200) {
            const { dailyGoals } = await response.json();
            dailyGoals.forEach(goal => {
                printGoal(goal);
            });
        } else if(response.status === 300) {
            //
        } else {
            console.log(response.status);
        }
    }

    else {
        return;
    }

    
}


const hadleGoalSubmit= async (event) => {
    event.preventDefault();

    const goal = {
        title: event.target.querySelector("input").value,
        description: "No Description",
        rate: 1,
        year: new Date().getFullYear(),
        month: getCurrentMonth(),
        week: getCurrentWeek(),
        day: getCurrentDay(),
    } 
    const urlList = ["yearlyGoals", "monthlyGoals", "weeklyGoals", "dailyGoals"];

    const response = await fetch(`/api/${urlList[goalsSwitchH3.dataset.enum]}/render`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal }),
    }); 

    if(response.status === 201) {
        const newGoal = (await response.json()).newGoal;
        printGoal(newGoal);
        return event.target.querySelector("input").value = "";
    }
}

const handleSwitchLeft = () => {
    const newEnum = parseInt(goalsSwitchH3.dataset.enum) - 1;
    goalsSwitchH3.dataset.enum = (newEnum === -1) ? 3 : newEnum;
    goalsSwitchH3.innerText = GOAL_TYPE[goalsSwitchH3.dataset.enum];
    paintGoal();
}

const handleSwitchRight = () => {
    const newEnum = parseInt(goalsSwitchH3.dataset.enum) + 1;
    goalsSwitchH3.dataset.enum = (newEnum === 4) ? 0 : newEnum;
    goalsSwitchH3.innerText = GOAL_TYPE[goalsSwitchH3.dataset.enum];
    paintGoal();
}

paintGoal();
goalForm.addEventListener("submit", hadleGoalSubmit);
goalsSwitchLeft.addEventListener("click", handleSwitchLeft);
goalsSwitchRight.addEventListener("click", handleSwitchRight);


//TODO: recap and Today 만들기
const todayRecapsList = document.getElementById("today-recaps__ul");
const todayRecapsForm = todayRecapsList.querySelector("form");
const delayedRecapsList = document.getElementById("delayed-recaps__ul");
const delayedRecapsForm = delayedRecapsList.querySelector("form");

const eraseTodayRecaps = () => {
    while(todayRecapsList.childNodes.length > 1) {
        todayRecapsList.lastChild.remove();
    }
}

const printTodayRecap = async (newRecap) => {
    const recapLi = renderRecap(newRecap);
    todayRecapsList.appendChild(recapLi);
}

const paintTodayRecaps = async () => {
    eraseTodayRecaps();
    const response = await fetch("/api/today/get/todayRecaps", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ date: getCurrentDay() }),
    });

    if(response.status === 200) {
        const { todayRecaps } = await response.json();
        todayRecaps.forEach(recap => {
            printTodayRecap(recap);
        });
    } else if(response.status === 300) {    
        //There is no Today's recap
    } else {
        console.log(response.status);
    }
}

const eraseDelayedRecaps = () => {
    while(delayedRecapsList.childNodes.length > 1) {
        delayedRecapsList.lastChild.remove();
    }
}

const printDelayedRecap = async (newRecap) => {
    const recapLi = renderRecap(newRecap);
    delayedRecapsList.appendChild(recapLi);
}

const paintDelayedRecaps = async () => {
    eraseDelayedRecaps();
    const response = await fetch("/api/today/get/delayedRecaps", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ date: getCurrentDay() }),
    });

    if(response.status === 200) {
        const { delayedRecaps } = await response.json();
        delayedRecaps.forEach(recap => {
            printDelayedRecap(recap);
        });
    } else if(response.status === 300) {    
        //There is no Today's recap
    } else {
        console.log(response.status);
    }
}


const handleRecapSubmit = async (event) => {
    event.preventDefault();

    const recap = {
        title: event.target.querySelector("input").value,
        description: "No Description",
        rate: 1,
        date: getCurrentDay(),
    } 
    const response = await fetch(`/api/recap/render`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recap }),
    }); 

    if(response.status === 201) {
        const newRecap = (await response.json()).newRecap;
        printTodayRecap(newRecap);
        return event.target.querySelector("input").value = "";
    }
}


paintTodayRecaps();
todayRecapsForm.addEventListener("submit", handleRecapSubmit);