async function processAPI() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=b6d5faa16246f7a6600a2feeea7743b7&language=en-US&page=1`;
    
    try{
        const response = await fetch(url);
        const result = await response.json();
        return result.results;
    }catch(error){
        console.error('API request error: ', error); 
        return [];
    }
}

async function selectedMoviesAPI() {
    try{
        const allMovies = await processAPI();
        const equalMoviesRemoved = await toRemoveEqualsUpComingMovies(allMovies);
        const allMoviesSelected = await toRemoveOldMovies(equalMoviesRemoved);
        let moviesData = [];
        let moviesNumber = 7;

        for (let i = 0; i < moviesNumber; i++) {
            const movie = allMoviesSelected[i];
            const runtime = await getMoviesRuntime(movie.id);
            
            moviesData.push({
                title: movie.title,
                runtime: runtime ? `${runtime} minutes` : 'N/A',
                release_date: movie.release_date,
                backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
                poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                overview: movie.overview
            });
        }
        
        return moviesData;
    }catch(error){
        console.error('API selection error: ', error); 
        return [];
    }
}

async function getMoviesRuntime(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=b6d5faa16246f7a6600a2feeea7743b7&language=en-US`;
    
    try{
        const response = await fetch(url);
        const result = await response.json();
        return result.runtime;
    }catch(error){
        console.error(`Error fetching movie runtime for ID ${movieId}:`, error);
        return [];
    }
}

export const moviesApiSelected = new Promise(async (resolve, reject) => {
    try{
        const movies = await selectedMoviesAPI();
        resolve(movies);
    }catch(error){
        console.error('Api request error: ', error); 
        reject(error);
    }
});


async function upComingMoviesApi(){
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=b6d5faa16246f7a6600a2feeea7743b7&language=en-US&page=1`;
    try{
        const
            response = await fetch(url),
            result = await response.json(),
            moviesFiltered = toCheckMoviesDate(result.results);
        return moviesFiltered;
    }catch(error){
        console.error(`Error fetching movie runtime for ID ${movieId}: `, error);
        return [];
    }
}

async function toRemoveEqualsUpComingMovies(allMovies){
    const upComingMoviesData = await upComingMoviesApi();
    const checkedMovies = allMovies.filter(checkTitles);
    function checkTitles(movieUpComing){
        return !upComingMoviesData.some(movie => movieUpComing.title === movie.title)
    }
    return checkedMovies;
}

async function toRemoveOldMovies(movieSelected){
    const yearAccepted = new Date().getFullYear() - 2;
    const oldMoviesRemoved = movieSelected.filter(checkOldYear);
    function checkOldYear(movie){
        const [movieYear, mouth, day] = movie.release_date.split('-').map(Number);
        return yearAccepted < movieYear; 
    }
    return oldMoviesRemoved;
}

async function toCheckMoviesDate(movies){
    const moviesFiltered = movies.filter(checkDate);
    function checkDate(movie){
        const
            currentYear = new Date().getFullYear(),
            currentMonth = new Date().getMonth(),
            [year, month, day] = movie.release_date.split('-').map(Number);
        return year > currentYear || year >= currentYear && month >= currentMonth;
    }
    return moviesFiltered;
}  

async function selectedUpComingMovies(){
    const upComingMoviesData = await upComingMoviesApi();
    const upComingMovies = upComingMoviesData.map(movie => ({
        title: movie.title,        
        backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview
    }));
    const upComingMoviesSlice = upComingMovies.slice(0, 7);
    return upComingMoviesSlice;
}

export const upComingMovies = new Promise(async (resolve, reject) => {
    try{
        const movies = await selectedUpComingMovies();
        resolve(movies);
    }catch(error){
        console.error('Api up coming movies request error: ', error); 
        reject(error);
    }
});








