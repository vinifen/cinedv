export class Schedule{

    timeChecker(schedule, day){
        const currentDay = new Date().getDay();
        const formattedTime = this.currentTime();
        if(formattedTime.includes('AM') || formattedTime.includes('12') && formattedTime.includes('PM') || currentDay != day){
            return schedule;
        }
        const [splitHours, splitMinutes] = formattedTime.split(":").map(parseFloat);
        const currentTime = splitHours * 60 + splitMinutes;

        const selectedSchedule = schedule.map(item => item.map(movie => movie.filter(timeCompare)));
        function timeCompare(time){
            const [hours, minutes] = time.split(":").map(parseFloat);
            const totalMinutes = hours * 60 + minutes;
            return parseFloat(totalMinutes) > currentTime;
        }

        return selectedSchedule;
    }

    currentTime(){
        const date = new Date();
        let hours = date.getHours();
        const minutes = String(date.getMinutes());
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        
        const formattedTime = `${hours}:${minutes} ${ampm}`;
        return formattedTime;
    }

    async getOrderedTimes(schedule) {
        let orderedTimes = schedule.map(sublist => {
            // Combinar todos os horários em uma única lista
            const allTimes = sublist.flat();
            // Converter para minutos, ordenar e reconverter para "HH:MM"
            return allTimes.map(this.toMinutes).sort((a, b) => a - b).map(this.toTimeString);
        });
        return orderedTimes;
    }

    toMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    toTimeString(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    addZerosTime(time){
        const [hour, minute] = time.split(':');
        return hour.padStart(2, '0') + ":" + minute.padStart(2, '0'); 
    }

    getCurrentFormatedDates(){
        const date = new Date();
        let currentDate = date.getDate();
        let currentMonth = date.getMonth() + 1;
        const year = date.getFullYear();

        const firstDayNextMonth = new Date(year, currentMonth, 1);
        const lastDayCurrentMonth = new Date(firstDayNextMonth - 1).getDate();
        let dates = [];
        for(let i = 0; i <= 6; i++){
            if(currentDate > lastDayCurrentMonth){ 
                currentDate = 1;
                currentMonth = currentMonth + 1;
                if(currentMonth > 12){
                    currentMonth = 1;
                }
            }
            dates.push(`${currentMonth.toString().padStart(2, '0')}/${currentDate.toString().padStart(2,'0')}`);
            currentDate++;
        }
        return dates;
    }

    getDayName(day){
        switch(day){
            case 0:
                return "Sunday"
            case 1:
                return "Monday"
            case 2:
                return "Tuesday"
            case 3:
                return "Wednesday"
            case 4:
                return "Thursday"
            case 5:
                return "Friday"
            case 6:
                return "Saturday"
            default:
                console.error('Invalid day on get day name'); 
                return [];
        }
    }
}