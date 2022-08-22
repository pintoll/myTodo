import YearlyGoal from "../../models/goal/YearlyGoal";

export function renderGoal (goal, type) {
    const goalLi = document.createElement("li");
    goalLi.dataset.id = goal._id;
    goalLi.dataset.type = type;
    
    const isCheckedIcon = document.createElement("i");
    if(goal.checked) {
        isCheckedIcon.classList.add("fa-solid", "fa-thumbs-up");
    } else {
        isCheckedIcon.classList.add("fa-solid", "fa-fire");
    }

    const textDiv = document.createElement("div");
    const title = document.createElement("a");
    title.href = `/goals/${typeURL(type)}/${goal._id}`;
    title.innerText = goal.title;
    const description = document.createElement("p");
    description.innerText = goal.description === undefined ? "No Description" : goal.description;
    textDiv.appendChild(title);
    textDiv.appendChild(description);
    
    const checkDiv = document.createElement("div");
    const checkIcon = document.createElement("i");
    if(goal.checked) {
        checkIcon.classList.add("fa-solid", "fa-rotate-left");
    } else {
        checkIcon.classList.add("fa-solid", "fa-check");
    }
    
    const xmarkIcon = document.createElement("i");
    xmarkIcon.classList.add("fa-solid", "fa-xmark");
    checkDiv.appendChild(checkIcon);
    checkDiv.appendChild(xmarkIcon);

    goalLi.appendChild(isCheckedIcon);
    goalLi.appendChild(textDiv);
    goalLi.appendChild(checkDiv);

    checkIcon.addEventListener("click", checkGoal);
    xmarkIcon.addEventListener("click", xmarkGoal);

    return goalLi;
}

async function checkGoal (event) {
    const goalLi = event.target.parentNode.parentNode;
    const { id, type } = goalLi.dataset;

    const response = await fetch("/api/setGoalChecked", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, type, }),
    });
    
    if(response.status === 200) {
        const isCheckedIcon = goalLi.querySelector("i");
        isCheckedIcon.classList.toggle("fa-thumbs-up");
        isCheckedIcon.classList.toggle("fa-fire");

        const checkIcon = event.target;
        checkIcon.classList.toggle("fa-rotate-left");
        checkIcon.classList.toggle("fa-check");
    }
}

async function xmarkGoal (event) {
    const goalLi = event.target.parentNode.parentNode;
    const title = goalLi.childNodes[1].firstChild;
    const { id, type } = goalLi.dataset;
    const assurance = confirm(`Delete ${title.innerText}?`)
    if(assurance === false) return;

    const response = await fetch("/api/deleteGoal", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, type, }),
    });
    
    if(response.status === 204) {
        goalLi.remove();
    } else {
        alert("error")
    }
}

function typeURL (type) {
    if(type === "YearlyGoal") return "year";
    else if(type === "MonthlyGoal") return "month";
    else if(type === "WeeklyGoal") return "week";
    else if(type === "DailyGoal") return "day";
    else return "customized";
}