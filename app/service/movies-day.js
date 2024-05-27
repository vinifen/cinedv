import { movieSelected } from "./movie-service.js";

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

    async getMovieDay(day){
        let moviesFilter = [];
        let movies = await movieSelected;
        console.log(movies);
        switch (day) {
            case 0:
                moviesFilter = [1, 5, 6, 7];
                break;
            case 2:
                moviesFilter = [3, 2, 6];
                break;
            case 3:
                moviesFilter = [1, 5, 6, 4];
                break;
            case 4:
                moviesFilter = [2, 3, 6, 7, 1];
                break;
            case 5:
                moviesFilter = [1, 3, 4, 5, 6, 7];
                break;
            case 6:
                moviesFilter = [1, 2, 3, 4, 5, 6, 7, 8];
                break;
            default:
                return [];
        }
        let moviess = movies.filter((_, index) => moviesFilter.includes(index));    
        console.log(moviess);
        return moviess;
    }
}