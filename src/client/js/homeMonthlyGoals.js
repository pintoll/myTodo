import { renderGoal } from "./goalCRUD";

const monthSelector = document.getElementById("month-selector");
const monthlyGoalsList = document.getElementById("monthly-goals-list");
const CreateMonth = document.getElementById("create-month");

async function getMonthlyGoals (month) {
    while (monthlyGoalsList.hasChildNodes()) {
        monthlyGoalsList.removeChild(monthlyGoalsList.firstChild);
    }

    const response = await fetch("/api/monthlyGoals/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ month }),
    });

    if(response.status === 200) {
        const { monthlyGoals } = await response.json();
        monthlyGoals.forEach(goal => {
            monthlyGoalsList.appendChild(renderGoal(goal, "MonthlyGoal"));
        });
    } else if(response.status === 300) {
        const msg = document.createElement("span");
        msg.innerText = "There is no Monthly Goal.";
        monthlyGoalsList.appendChild(msg);
    } else {
        console.log(response.status);
    }
}

function handleMonthSelectorInput (event) {
    const month = event.target.value;
    getMonthlyGoals(month);
    CreateMonth.href = `/goals/month/create?month=${month}`;
}

getMonthlyGoals(monthSelector.value);
monthSelector.addEventListener("input", handleMonthSelectorInput);
