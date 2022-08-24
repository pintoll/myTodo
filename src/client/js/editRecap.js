import { compareStringDate } from "./setTimeFunctions";

const form = document.querySelector("form");
const recapAddBtn = form.querySelector("button");
const addedDate = form.querySelector("#added-date");
const hiddenData = form.querySelector("#hidden-data");
const recapsP = form.querySelector("p");
const submit = form.querySelector("#submit");

let addedCycleArray = [];

function addCycleToArray(addedCycle) {
    for(let i = 0; i < addedCycleArray.length; i++) {
        if(addedCycleArray[i] === addedCycle) {
            addedCycleArray.splice(i, 1);
            return;
        }
        if(compareStringDate(addedCycleArray[i], addedCycle)) {
            addedCycleArray.splice(i, 0, addedCycle);
            return;
        }
    }
    addedCycleArray.push(addedCycle);
}


function handleAddCycle(event) {
    event.preventDefault();
    if(addedDate.value === "") return;

    addCycleToArray(addedDate.value);
    hiddenData.value = addedCycleArray;
    recapsP.innerText = addedCycleArray.toString().replace(/,/g," ");
}

function handleSubmit(event) {
    if(addedCycleArray.length === 0) {
        alert("복습주기 필요!");
        event.preventDefault();
    }
}


addedCycleArray = hiddenData.dataset.original.split(",");
hiddenData.value = addedCycleArray;
recapsP.innerText = addedCycleArray.toString().replace(/,/g," ");

recapAddBtn.addEventListener("click", handleAddCycle);
submit.addEventListener("click", handleSubmit);