const MS_OF_DAY = 86400000;

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