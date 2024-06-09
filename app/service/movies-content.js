import { moviesApiSelected } from "./movies-api.js";
import { MovieSchedule } from "../model/movie-schedule.js";
import { Schedule } from "./schedule-services.js";

export class MovieContent{

    async getMoviesFilter(day){
        switch (day) {
            case 0:
                return [0, 1, 5, 6, 7];
            case 2:
                return [3, 2, 6, 4];
            case 3:
                return [0, 1, 2, 3];
            case 4:
                return [2, 3, 6, 7, 1];
            case 5:
                return [0, 1, 3, 4, 5, 6, 7];
            case 6:
                return [1, 2, 3, 4, 5, 6, 7, 8];
            default:
                console.error('Invalid movies content day'); 
                return [];
        }
    }

    async getMoviesDay(day){
        const
            movies = await moviesApiSelected,
            moviesFilter = await this.getMoviesFilter(day),
            moviesFiltered = movies.filter((_, index) => moviesFilter.includes(index));    
        return moviesFiltered;
    }

    async getScheduleDay(day){
        const schedule = new MovieSchedule();
        switch (day) {
            case 0:
                return schedule.sunSchedule();      
            case 2:  
                return schedule.tueSchedule();
            case 3:  
                return schedule.wedSchedule();  
            case 4:   
                return schedule.thuSchedule();
            case 5:
                return schedule.friSchedule();
            case 6:
                return schedule.satSchedule();
            default:
                console.error('Invalid schedule day'); 
                return [];
        }
    }

    async getSelectedSchedule(day){
        const
            scheduleDay = await this.getScheduleDay(day),
            moviesFilter = await this.getMoviesFilter(day),
            scheduleCheck = new Schedule().timeChecker(scheduleDay, day),
            scheduleFiltered = scheduleCheck.filter((_, index) => moviesFilter.includes(index)),
            orderedTimes = new Schedule().getOrderedTimes(scheduleFiltered);
        return orderedTimes;
    }

    async getScheduleDayDiv(day){
        const selectedSchedule = await this.getSelectedSchedule(day);
        const timeDiv = selectedSchedule.map(sublist => {
            return sublist.map(time => `<div class="col-3 time">${time}</div>`).join('')});
        return timeDiv;
    }
}