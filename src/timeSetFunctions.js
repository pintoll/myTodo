const MS_OF_DAY = 86400000;
const MS_OF_HOUR = 3600000;
const CYCLE_INTERVAL = [1,3,7,14,31,90,180,365];

export function setDate(day) {
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    return new Date(`${year}-${month}-${date} 06:00:00`);
}

export function getCurrentMonth() {
    const now = new Date(Date.now() - 6*MS_OF_HOUR );
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}`;
}

export function getCurrentWeek() {
    const now = new Date(Date.now() - 6*MS_OF_HOUR );
    const thisMonday = now.getDay() === 0 ? now - 6*MS_OF_DAY : now - (now.getDay()-1)*MS_OF_DAY;
    const startDate = new Date(new Date(thisMonday).getFullYear(), 0, 1) - 1;
    const weekNumber = Math.ceil(Math.floor((thisMonday - startDate) / MS_OF_DAY)/7);
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, '0')}`;
}

export function getCurrentDay() {
    const now = new Date(Date.now() - 6*MS_OF_HOUR );
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
}

export function getAddedCurrentDay(i) {
    const now = new Date(Date.now() - 6*MS_OF*HOUR + i*MS_OF_DAY);
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
}

function formatDate(now) {
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;   
}

export function formatAddedDate(stringDate, i) {
    const now = new Date(new Date(stringDate) + i*MS_OF_DAY);
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;   
}

export function defaultRecapCycle(date) {
    const cycle = [];
    cycle.push(date);
    
    CYCLE_INTERVAL.forEach(element => {
        cycle.push(formatDate(new Date(
            new Date(date).getTime() + element*MS_OF_DAY)
            ));
    });
    return cycle;
}

export function compareStringDate(a, b) {
    if( new Date(a) < new Date(b) ) return false;
    else return true;
}

export function sortRecapCycle(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])].sort((a,b) => {
        if(new Date(a) > new Date(b)) return 1;
        if( a === b ) return 0;
        if(new Date(a) < new Date(b)) return -1;
    });
}