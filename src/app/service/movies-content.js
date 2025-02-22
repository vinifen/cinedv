import { moviesApiSelected } from "./movies-api.js";
import { MovieSchedule } from "../model/movie-schedule.js";
import { Schedule } from "./schedule-services.js";

export class MovieContent{

    async getMoviesFilter(day){
        switch (day) {
            case 0:
                return [0, 1, 2, 5, 6];
            case 1:
                return [];
            case 2:
                return [0, 1, 2, 4];
            case 3:
                return [0, 1, 2, 3, 5];
            case 4:
                return [0, 1, 2, 4, 5, 6];
            case 5:
                return [0, 1, 2, 3, 4, 6];
            case 6:
                return [0, 1, 2, 3, 4, 5, 6];
            default:
                console.error('Invalid movies content day, day: ', day); 
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
            case 1:
                return schedule.monSchedule();
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
    async getScheduleDayInSectionsFilter(day){
        const scheduleDay = await this.getScheduleDay(day);
        const moviesFilter = await this.getMoviesFilter(day);
        const scheduleCheck = new Schedule().timeChecker(scheduleDay, day);
        const scheduleFiltered = scheduleCheck.filter((_, index) => moviesFilter.includes(index));
        return scheduleFiltered;
    } 

    async getScheduleDayInSectionsDiv(day){
        const scheduleDayInSectionsFiltered = await this.getScheduleDayInSectionsFilter(day);
        const scheduleSectionDiv = scheduleDayInSectionsFiltered.map(sublist => getScheduleSectionDiv(sublist));
        function getScheduleSectionDiv(scheduleMovie) {

            return scheduleMovie.map(scheduleSection => {

                return scheduleSection.map(schedule => {
                    schedule = new Schedule().addZerosTime(schedule);
                    return `<div class="mx-1 mx-sm-2 mx-md-3 mx-1 modal-time-movies-current border rounded px-3 d-flex align-items-end justify-content-end">${schedule}</div>`;
                }).join('');
            });
        }
        
        return scheduleSectionDiv;
    }

    async getSelectedSchedule(day){
        const
            scheduleDay = await this.getScheduleDay(day);
        const moviesFilter = await this.getMoviesFilter(day);
        const scheduleCheck = new Schedule().timeChecker(scheduleDay, day);
        const scheduleFiltered = scheduleCheck.filter((_, index) => moviesFilter.includes(index));
        const orderedTimes = new Schedule().getOrderedTimes(scheduleFiltered);
        return orderedTimes;
    }

    async getScheduleDayDiv(day){
        const selectedSchedule = await this.getSelectedSchedule(day);
        const timeDiv = selectedSchedule.map(sublist => {
            return sublist.map(time => `<div class="border col-3 time">${time}</div>`).join('')});
        return timeDiv;
    }

}