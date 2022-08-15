import { renderGoal } from "./goalCRUD";

const yearlyGoals2022 = document.getElementById("yearlyGoals2022");
const yearlyGoals2023 = document.getElementById("yearlyGoals2023");
const yearlyGoals2024 = document.getElementById("yearlyGoals2024");
const yearlyGoals2025 = document.getElementById("yearlyGoals2025");

async function getYearlyGoals (yearlyGoalsList, year) {
    const response = await fetch("/api/yearlyGoals/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ year }),
    });
   
    if(response.status === 200) {
        const { yearlyGoals } = await response.json();
        yearlyGoals.forEach(goal => {
            yearlyGoalsList.appendChild(renderGoal(goal, "YearlyGoal"));
        });
    } else if(response.status === 300) {
        //
    } else {
        console.log(response.status);
    }
}




getYearlyGoals(yearlyGoals2022, 2022);
getYearlyGoals(yearlyGoals2023, 2023);
getYearlyGoals(yearlyGoals2024, 2024);
getYearlyGoals(yearlyGoals2025, 2025);

//TODO editgoal까지 다 해버리자 그리고 today랑 연동
// 이러면 끝!