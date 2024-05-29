import { movieSelected } from "./movie-service.js";
import { MovieSchedules } from "../model/movie-schedule.js";
import { Schedule } from "./schedule-services.js";

export class MoviesDay{

    async sunMovie(){
        const moviesFilter = [1, 5, 6, 7];

        const movies = await movieSelected;
        const moviesSelected = movies.filter((_, index) => moviesFilter[index]);    
        return moviesSelected;
        
    }

    async tueMovie(){
        const moviesFilter = [2, 5, 6, 7];

        const movies = await movieSelected;
        const moviesSelected = movies.filter((_, index) => moviesFilter[index]);    
        return moviesSelected;
        
    }

    async wedMovie(){
        const moviesFilter = [5, 6, 7];

        const movies = await movieSelected;
        const moviesSelected = movies.filter((_, index) => moviesFilter[index]);    
        console.log(moviesSelected);
        return moviesSelected;
        
    }

    async getMoviesFilter(day){
        switch (day) {
            case 0:
                return [0, 1, 5, 6, 7];
            case 2:
                return [3, 2, 6];
            case 3:
                return [0, 1, 5, 6, 4];
            case 4:
                return [2, 3, 6, 7, 1];
            case 5:
                return [0, 1, 3, 4, 5, 6, 7];
            case 6:
                return [1, 2, 3, 4, 5, 6, 7, 8];
            default:
                return [];
        }
    }

    async getMovieDay(day){
        const movies = await movieSelected;
        const moviesFilter = await this.getMoviesFilter(day);
        const moviesFiltered = movies.filter((_, index) => moviesFilter.includes(index));    
        return moviesFiltered;
    }

    async getScheduleDay(day){
        let schedule = new MovieSchedules();
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
                return [];
        }
    }

    async getSelectedSchedule(day){
        const scheduleDay = await this.getScheduleDay(day);
        const moviesFilter = await this.getMoviesFilter(day);
        const scheduleCheck = new Schedule().timeChecker(scheduleDay, day);
        const scheduleFiltered = scheduleCheck.filter((_, index) => moviesFilter.includes(index));
        const orderedTimes = new Schedule().getOrderedTimes(scheduleFiltered);
        return orderedTimes;
    }

    async getScheduleDiv(day){
        const selectedSchedule = await this.getSelectedSchedule(day);
        const timeParagraphs = selectedSchedule.map(sublist => {
            return sublist.map(time => `<div>${time}</div>`).join('');
        });
        return timeParagraphs;
    }
}