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