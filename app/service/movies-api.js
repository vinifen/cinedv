async function processAPI() {
    console.log("API chamada");
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=b6d5faa16246f7a6600a2feeea7743b7&language=en-US&page=1`;
    
    try{
        const response = await fetch(url);
        const result = await response.json();
        console.log(result.results);
        return result.results;
    }catch(error){
        console.error('API request error: ', error); 
        return [];
    }
}

async function selectedMoviesAPI() {
    try{
        console.log("Iniciando seleção de filmes");
        const allMovies = await processAPI();
        const allMoviesSelected = await toRemoveEqualsUpComingMovies(allMovies);
        console.log(allMoviesSelected);
        let moviesData = [];
        let moviesNumber = 12;

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
        console.log(moviesData);
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
        console.log(movies);
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
            console.log(result);
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

async function toCheckMoviesDate(movies){
    const moviesFiltered = movies.filter(checkDate);
    function checkDate(date){
        const
            currentYear = new Date().getFullYear(),
            currentMonth = new Date().getMonth() + 1,
            [year, month, _]= date.release_date.split('-').map(Number);
        return year > currentYear || year >= currentYear && month >= currentMonth;
    }
    return moviesFiltered;
}  

async function selectedUpComingMovies(){
    const upComingMoviesData = await upComingMoviesApi()
    const upComingMovies = upComingMoviesData.map(movie => ({
        title: movie.title,        
        backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview
    }))
    return upComingMovies;
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








