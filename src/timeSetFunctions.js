import { NoEmitOnErrorsPlugin } from "webpack";
import Today from "./models/Today";

const MS_OF_DAY = 86400000

export function setDate(day) {
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    return new Date(`${year}-${month}-${date} 06:00:00`);
}

export async function setToday() {
    //today = Today.find({date: })
    //Today's delayedRecapIds =Yesterday's todayReccapIds

    //TODO! fetch / Date / ProtoType 공부
    //      goals + TOday로 이루어진 자료 입출력 완료
}

export function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}`;
}

export function getCurrentWeek() {
    const now = new Date();
    const thisMonday = now.getDay() === 0 ? now - 6*MS_OF_DAY : now - (now.getDay()-1)*MS_OF_DAY;
    const startDate = new Date(new Date(thisMonday).getFullYear(), 0, 1) - 1;
    const weekNumber = Math.ceil(Math.floor((thisMonday - startDate) / MS_OF_DAY)/7);
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
}

export function getCurrentDay() {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
}