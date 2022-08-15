
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

//Add Todos
const goalsList = document.getElementById("goals__ul");
const todayRecapsList = document.getElementById("today-recaps__ul");
const delayedRecapsList = document.getElementById("delayed-recaps__ul");

const goalForm = goalsList.querySelector("form");

const paintGoal = async (newGoal) => {
    // Creating Todo Obj
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `/goal/${newGoal.id}`;
    a.innerText = newGoal.text;
    const icons = document.createElement("div");
    icons.classList.add("icons");
    const iconContainer1 = document.createElement("div");
    const iconContainer2 = document.createElement("div");
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-check")
    const xmarkIcon = document.createElement("i");
    xmarkIcon.classList.add("fa-solid", "fa-xmark");

    iconContainer1.appendChild(checkIcon);
    iconContainer2.appendChild(xmarkIcon);
    icons.appendChild(iconContainer1);
    icons.appendChild(iconContainer2);
    
    li.appendChild(a);
    li.appendChild(icons);

    goalsList.insertBefore(li, goalForm);

    iconContainer1.addEventListener("click", checkGoal);
    iconContainer2.addEventListener("click", xmarkGoal);
}

const checkGoal = (event) => {
    const li = event.target.parentElement.parentElement.parentElement;
    li.remove();
} 

const xmarkGoal = (event) => {
    const li = event.target.parentElement.parentElement.parentElement;
    li.remove();
} 




const handleTodoSubmit= (event) => {
    event.preventDefault();
    const newTodo = {
        text: event.target.querySelector("input").value,
        id: Date.now(),
    }
    paintGoal(newTodo);
}

goalForm.addEventListener("submit", handleTodoSubmit);