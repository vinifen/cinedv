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
        return moviesSelected;
        
    }
}