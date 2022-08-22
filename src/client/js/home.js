import { renderGoal } from "./goalCRUD";
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

//Add Goals
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


const handleTodoSubmit= async (event) => {
    event.preventDefault();

    const goal = {
        title: event.target.querySelector("input").value,
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
goalForm.addEventListener("submit", handleTodoSubmit);
goalsSwitchLeft.addEventListener("click", handleSwitchLeft);
goalsSwitchRight.addEventListener("click", handleSwitchRight);