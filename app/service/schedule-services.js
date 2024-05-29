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
        console.log(hours)
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
        return `${hours}:${mins.toString().padStart(2, '0')}`;
    }

}