//carregar cards
import { movieSelected } from "../../app/service/movie-service.js";
import { MovieSchedules } from "../../app/model/movie-schedule.js";
import { MoviesDay } from "../../app/service/movies-day.js";


document.addEventListener('DOMContentLoaded', () => {
    console.log("oi");
    let movieSchedules = new MovieSchedules();
    console.log(movieSchedules.timeChecker())
    let div = document.getElementById('teste');
    var cardHTML = ``;
    for (let i = 0; i < 8; i++){
        cardHTML = cardHTML +
        `<div class="card col">
            <div>
                <h3></h3>
                <p></p>
            </div>
            <div>  
                <img class="imagem" src="" alt="">
            </div>
            <div>
                <div id="moviue-schedule"></div>
                <div class="hora1">10:00</div>
                <a href="">view more</a>
            </div> 
        </div>`;
    }
    div.innerHTML = cardHTML;
});


document.addEventListener('DOMContentLoaded', async () => {  
    let aa = new MoviesDay();
    let aaa = await aa.sunMovie();
    let bbb = await aa.tueMovie();
    let ccc = await aa.wedMovie();
    console.log(ccc);
    console.log(bbb);
    console.log(aaa);
});

//carregar api e cards
document.addEventListener('DOMContentLoaded', async () => {  
    const movie = await movieSelected;
    console.log(movie);
    let cardHTML = ``;
    let div = document.getElementById('teste');
    for (let i = 0; i < 8; i++){
        cardHTML = cardHTML + 
        `<div class="card col-12 col-md-3">
            <div>
                <h3>${movie[i].title}</h3>
                <p class="timeline">${movie[i].timeline}</p>
            </div>
            <div>  
                <img class="imagem" class="img-fluid" src="${movie[i].image}" alt="">
            </div>
            <div>
                <div id="moviue-schedule"></div>
                <a href="">view more</a>
            </div> 
        </div>`;
    }
    div.innerHTML = cardHTML;


    document.getElementById('tue').onclick=function(){
        let div = document.getElementById('teste');
        let cardHTML = ``;
        for (let i = 0; i < 2; i++){
            cardHTML = cardHTML +
            `<div class="card col-12 col-md-3">
                <div>
                    <h3>${movie[i].title}</h3>
                    <p class="timeline">${movie[i].timeline}</p>
                </div>
                <div>  
                    <img class="imagem" class="img-fluid" src="${movie[i].image}" alt="">
                </div>
                <div>
                    <div id="moviue-schedule"></div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }

    
    document.getElementById('wed').onclick=async function(){

        let div = document.getElementById('teste');
        let cardHTML = ``;
        for (let i = 0; i < 6; i++){
            if(i == 1 || i == 3 || i == 4){     
                cardHTML = cardHTML + 
                `<div class="card col-12 col-md-3">
                    <div>
                        <h3>${movie[i].title}</h3>
                        <p class="timeline">${movie[i].timeline}</p>
                    </div>
                    <div>  
                        <img class="imagem" class="img-fluid" src="${movie[i].image}" alt="">
                    </div>
                    <div>
                        <div id="moviue-schedule"></div>
                        <a href="">view more</a>
                    </div> 
                </div>`;
            }
        }
        
        div.innerHTML = cardHTML;
        let ccc = await movieSelected;
        console.log(ccc);
        let aa = new MoviesDay();
        let yyy = await aa.wedMovie();
        console.log(yyy);
    }
});




