async function processAPI(){
    console.log("api chamada")
    const url = 'https://moviesverse1.p.rapidapi.com/most-popular-movies';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '634bd87a92msh6104c4ab10758c1p1bf9a8jsn93a4ca1cb312',
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.movies;
    } catch (error) {
        return [];
    }
}

async function selectedMoviesAPI(){
    try{
        console.log("oioioi");
        const allMovies = await processAPI();
        let moviesData = [];
        let moviesNumber = 8;
        for (let i = 0; i < moviesNumber; i++){
            moviesData.push(allMovies[i]);
        }
        const newData = moviesData.map(item => ({
            title: item.title,
            image: item.image,
            timeline: item.timeline
            }));
        return newData;
    } catch(error){
        return [];
    }
}

export const movieSelected = new Promise(async (resolve, reject) => {
    try {
        const movies = await selectedMoviesAPI();
        resolve(movies);
    } catch (error) {
        reject(error);
    }
});


