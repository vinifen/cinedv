//carregar cards
import {Movies} from "./model/movie-service.js";

document.addEventListener('DOMContentLoaded', () =>{
    let div = document.getElementById('teste');
    var cardHTML = ``;
    for (let i = 0; i < 8; i++){
        cardHTML = cardHTML + `<div class="card">
        <h3>Título do Card</h3>
        <p>Descrição do Card</p>
        <div> 
            <div class="image">aa</div> 
        </div>
        <button class="btn btn-primary">Ver Mais</button>
        </div>`;
    }
    div.innerHTML = cardHTML;
});

//carregar api e cards
document.addEventListener('DOMContentLoaded', async () =>{  
    let classMovies = new Movies;
    const movie = await classMovies.selectedMoviesAPI();

    let cardHTML = ``;
    let div = document.getElementById('teste');
    for (let i = 0; i < 8; i++){
        cardHTML = cardHTML + `<div class="card">
        <h3>${movie[i].title}</h3>
        <p>${movie[i].timeline}</p>
        <div>  
            <img class="imagem" src="${movie[i].image}" alt="">
        </div>
        <button class="btn btn-primary">Ver Mais</button>
        </div>`;
    }
    div.innerHTML = cardHTML;


    document.getElementById('tue').onclick=function(){
        let div = document.getElementById('teste');
        let cardHTML = ``;
        for (let i = 0; i < 2; i++){
            cardHTML = cardHTML + `<div class="card">
            <h3>${movie[i].title}</h3>
            <p>${movie[i].timeline}</p>
            <div>  
                <img class="imagem" src="${movie[i].image}" alt="">
            </div>
            <button class="btn btn-primary">Ver Mais</button>
            </div>`;
        }
        div.innerHTML = cardHTML;
    }

    
    document.getElementById('wed').onclick=function(){
        let div = document.getElementById('teste');
        let cardHTML = ``;
        for (let i = 0; i < 6; i++){
            if(i == 1 || i == 3 || i == 4){     
                cardHTML = cardHTML + `<div class="card">
                <h3>${movie[i].title}</h3>
                <p>${movie[i].timeline}</p>
                <div>  
                    <img class="imagem" src="${movie[i].image}" alt="">
                </div>
                <button class="btn btn-primary">Ver Mais</button>
                </div>`;
            }
        }
        div.innerHTML = cardHTML;
    }
});




