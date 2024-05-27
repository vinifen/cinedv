class MoviesDay{ 
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
    let schedule;
    const currentDay = new Date().getDay();
    switch(currentDay){
        case 0:
            schedule = this.sunSchedule();
            break;
        case 2:
            schedule = this.tueSchedule();
            break;
        case 3:
            schedule = this.wedSchedule();
            break;
        case 4:
            schedule = this.thuSchedule();
            break;
        case 5:
            schedule = this.friSchedule();
            break;
        case 6:
            schedule = this.satSchedule();
            break;                
        default:
            return [];            
    }
    
    const formattedTime = this.currentTime();
    if(formattedTime.includes('AM') || formattedTime.includes('12') && formattedTime.includes('PM')){
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
}