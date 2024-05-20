import { getAPI, selectedMovies} from "./model/movie-service.js";
async function fetchMovies() {
    const movie = await getAPI;
    console.log(movie);
    const moviesSelected = selectedMovies; 
    console.log(moviesSelected);
    let div = document.getElementById('teste');
    var cardHTML = ``;
    for (let i = 0; i < 8; i++){
        cardHTML = cardHTML +
         `<div class="card">
        <h3>Título do Card</h3>
        <p>Descrição do Card</p>
        <img src="${movie[i].image}" class="imagem" alt="">
        <button class="btn btn-primary">Ver Mais</button>
        </div>`
    ;
    }
    div.innerHTML = cardHTML;
    return movie;
}

fetchMovies();
