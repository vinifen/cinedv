async function processSecundaryAPI(){
    const movieTitle = selectedMovies[1].title;
    const options = {
      method: 'GET',
      url: 'https://advanced-movie-search.p.rapidapi.com/search/movie',
      params: {
        query: movieTitle,
        page: '1'
      },
      headers: {
        'X-RapidAPI-Key': '634bd87a92msh6104c4ab10758c1p1bf9a8jsn93a4ca1cb312',
        'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        return response.data.results[0];
    } catch (error) {
        return [];
    }
}

export const api2 = await processSecundaryAPI();