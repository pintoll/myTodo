import { renderGoal } from "./goalCRUD";

const daySelector = document.getElementById("day-selector");
const dailyGoalsList = document.getElementById("daily-goals-list");
const createDay = document.getElementById("create-day");

async function getDailyGoals (day) {
    while (dailyGoalsList.hasChildNodes()) {
        dailyGoalsList.removeChild(dailyGoalsList.firstChild);
    }

    const response = await fetch("/api/dailyGoals/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ day }),
    });

    if(response.status === 200) {
        const { dailyGoals } = await response.json();
        dailyGoals.forEach(goal => {
            dailyGoalsList.appendChild(renderGoal(goal, "DailyGoal"));
        });
    } else if(response.status === 300) {
        const msg = document.createElement("span");
        msg.innerText = "There is no Daily Goal.";
        dailyGoalsList.appendChild(msg);
    } else {
        console.log(response.status);
    }
}

function handleDaySelectorInput (event) {
    const day = event.target.value;
    getDailyGoals(day);
    createDay.href = `/goals/day/create?day=${day}`;
}

getDailyGoals(daySelector.value);
daySelector.addEventListener("input", handleDaySelectorInput);
