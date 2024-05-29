import { movieSelected } from "../../app/service/movie-service.js";
import { MovieSchedules } from "../../app/model/movie-schedule.js";
import { MoviesDay } from "../../app/service/movies-day.js";


document.addEventListener('DOMContentLoaded', () => {
    console.log("oi");
    let movieSchedules = new MovieSchedules().timeChecker();
    console.log(movieSchedules);
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

    let currentDay = new Date().getDay();
    switch (currentDay) {
        case 0:
            sunday();
            break;
        case 1:
            wednesday();
            break;
        case 2:
            tuesday();
            break;
        case 3:
            wednesday();
            break;
        case 4:
            thursday();
            break;
        case 5:
            friday();
            break;
        case 6:
            saturday();
            break;
        default:
            error = -1;
    }

    document.getElementById('sun').onclick=async function sunday(){
        let day = 0;
        let movie = await new MoviesDay().getMovieDay(day);
        let div = document.getElementById('teste');
        let scheduleDay = new MoviesDay();
        let schedule = await scheduleDay.getScheduleDiv(day);
        console.log(schedule);
        console.log(movie);
        let cardHTML = ``;
        for (let i = 0; i < movie.length; i++){
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
                    <div class="movie-schedule">
                    ${schedule[i]}
                    </div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }

    
    async function monday(){ 
        let div = document.getElementById('teste');
        let cardHTML = '<p> Nao abrimos segunda feira <p>';
        div.innerHTML = cardHTML;
    }
    document.getElementById('mon').addEventListener('click', monday);

    async function tuesday(){
        let day = 2;
        let movie = await new MoviesDay().getMovieDay(day);
        let div = document.getElementById('teste');
        let scheduleDay = new MoviesDay();
        let schedule = await scheduleDay.getScheduleDiv(day);
        console.log(schedule);
        console.log(movie);
        let cardHTML = ``;
        for (let i = 0; i < movie.length; i++){
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
                    <div class="movie-schedule">
                    ${schedule[i]}
                    </div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }
    document.getElementById('tue').addEventListener('click', tuesday);

    async function wednesday(){
        let day = 3;
        let movie = await new MoviesDay().getMovieDay(day);
        let div = document.getElementById('teste');
        let scheduleDay = new MoviesDay();
        let schedule = await scheduleDay.getScheduleDiv(day);
        console.log(schedule);
        console.log(movie);
        let cardHTML = ``;
        for (let i = 0; i < movie.length; i++){
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
                    <div class="movie-schedule">
                    ${schedule[i]}
                    </div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }
    document.getElementById('wed').addEventListener('click', wednesday);

    async function thursday(){
        let day = 4;
        let movie = await new MoviesDay().getMovieDay(day);
        let div = document.getElementById('teste');
        let scheduleDay = new MoviesDay();
        let schedule = await scheduleDay.getScheduleDiv(day);
        console.log(schedule);
        console.log(movie);
        let cardHTML = ``;
        for (let i = 0; i < movie.length; i++){
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
                    <div class="movie-schedule">
                    ${schedule[i]}
                    </div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }
    document.getElementById('thu').addEventListener('click', thursday);

    async function friday(){
        let day = 5;
        let movie = await new MoviesDay().getMovieDay(day);
        let div = document.getElementById('teste');
        let scheduleDay = new MoviesDay();
        let schedule = await scheduleDay.getScheduleDiv(day);
        console.log(schedule);
        console.log(movie);
        let cardHTML = ``;
        for (let i = 0; i < movie.length; i++){
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
                    <div class="movie-schedule">
                    ${schedule[i]}
                    </div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }
    document.getElementById('fri').addEventListener('click', friday);

    async function saturday(){
        let day = 6;
        let movie = await new MoviesDay().getMovieDay(day);
        let div = document.getElementById('teste');
        let scheduleDay = new MoviesDay();
        let schedule = await scheduleDay.getScheduleDiv(day);
        console.log(schedule);
        console.log(movie);
        let cardHTML = ``;
        for (let i = 0; i < movie.length; i++){
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
                    <div class="movie-schedule">
                    ${schedule[i]}
                    </div>
                    <a href="">view more</a>
                </div> 
            </div>`;
        }
        div.innerHTML = cardHTML;
    }
    document.getElementById('sat').addEventListener('click', saturday);
});




