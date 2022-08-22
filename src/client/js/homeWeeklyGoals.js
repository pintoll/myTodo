import { renderGoal } from "./goalCRUD";

const weekSelector = document.getElementById("week-selector");
const weeklyGoalsList = document.getElementById("weekly-goals-list");
const createWeek = document.getElementById("create-week");

async function getWeeklyGoals (week) {
    while (weeklyGoalsList.hasChildNodes()) {
        weeklyGoalsList.removeChild(weeklyGoalsList.firstChild);
    }

    const response = await fetch("/api/weeklyGoals/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ week }),
    });

    if(response.status === 200) {
        const { weeklyGoals } = await response.json();
        weeklyGoals.forEach(goal => {
            weeklyGoalsList.appendChild(renderGoal(goal, "WeeklyGoal"));
        });
    } else if(response.status === 300) {
        const msg = document.createElement("span");
        msg.innerText = "There is no Weekly Goal.";
        weeklyGoalsList.appendChild(msg);
    } else {
        console.log(response.status);
    }
}

function handleweekSelectorInput (event) {
    const week = event.target.value;
    getWeeklyGoals(week);
    createWeek.href = `/goals/week/create?week=${week}`;
}

getWeeklyGoals(weekSelector.value);
weekSelector.addEventListener("input", handleweekSelectorInput);
