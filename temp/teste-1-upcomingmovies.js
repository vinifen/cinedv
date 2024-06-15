

async function selectedUpComingMovies(){
    const upComingMoviesData = await upComingMoviesApi()
    const upComingMovies = upComingMoviesData.map(movie => ({
        title: movie.title,        
        backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        overview: movie.overview
    }));
    

    
    let upComingMovies1 = upComingMovies.splice(1, 1);
    
    return upComingMovies1;
}