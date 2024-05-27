export class MovieSchedules{
    movieSchedule(){
        return [
            ["2:25", "10:30"],

            ["1:30", "3:30", "4:20", "5:30", "8:30"],

            ["1:00", "4:03", "7:37", "9:10", "8:30"],
        ]
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

    timeChecker(){
        const formattedTime = this.currentTime();
        const schedule = this.movieSchedule();
        if(formattedTime.includes('AM') || formattedTime.includes('12') && formattedTime.includes('PM')){
            return schedule;
        }
        const [splitHours, splitMinutes] = formattedTime.split(":").map(parseFloat);
        const currentTime = splitHours * 60 + splitMinutes;

        const selectedSchedule = schedule.map(movie => movie.filter(timeCompare));
        function timeCompare(time){
            const [hours, minutes] = time.split(":").map(parseFloat);
            const totalMinutes = hours * 60 + minutes;
            return parseFloat(totalMinutes) > currentTime;
        }

        return selectedSchedule;
    }
}
