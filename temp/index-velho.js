import { movieSelected } from "../../app/service/api-movie-service.js";
import { MovieSchedules } from "../../app/model/movie-schedule.js";
import { MoviesDay } from "../../app/service/movies-day.js";
import { toHTML } from "../../app/service/html-service.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("oi");
    let movieSchedules = new MovieSchedules().timeChecker();
    console.log(movieSchedules);
    let div = document.getElementById('movies-cards');
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
                <div class="hora1"></div>
                <a href="">view more</a>
            </div> 
        </div>`;
    }
    div.innerHTML = cardHTML;
    const date = new Date();
    let currentDay = date.getDay();
    console.log(currentDay);
    let currentDate = date.getDate();
    let currentMonth = date.getMonth() + 1;
    const year = date.getFullYear();

    const firstDayNextMonth = new Date(year, currentMonth, 1);
    const lastDayCurrentMonth = new Date(firstDayNextMonth - 1).getDate();
    let dates = [];
    if(currentDate == lastDayCurrentMonth)
        dates.push()
    for(let i = 0; i <= 6; i++){
        if(currentDate > lastDayCurrentMonth){ 
            currentDate = 1;
            currentMonth = currentMonth + 1;
            if(currentMonth > 12){
                currentMonth = 1;
            }
        }
        dates.push(`${currentMonth.toString().padStart(2, '0')}/${currentDate.toString().padStart(2,'0')}`);
        currentDate++;
    }
    const dateElements = [ 
        document.getElementById('sun-date'),
        document.getElementById('mon-date'),
        document.getElementById('tue-date'),
        document.getElementById('wed-date'),
        document.getElementById('thu-date'),
        document.getElementById('fri-date'),
        document.getElementById('sat-date'),
    ]
    for(let i = 0; i < dateElements.length; i++){
        let index = (currentDay + i) % dateElements.length;
        dateElements[index].innerHTML = dates[i];
    }


});

//carregar api e cards
document.addEventListener('DOMContentLoaded', async () => {  

    await movieSelected;
    const 
        moviesDayInstance = new MoviesDay(),
        htmlConverter = new toHTML(),
        div = document.getElementById('movies-cards');

    const currentDay = new Date().getDay();
    switch (currentDay){
        case 0: sunday(); break;
        case 1: monday(); break;
        case 2: tuesday(); break;
        case 3: wednesday(); break;
        case 4: thursday(); break;
        case 5: friday(); break;
        case 6: saturday(); break;
        default: console.error('Invalid Day');
    }

    async function sunday(){
        const
            day = 0,
            movies = await moviesDayInstance.getMoviesDay(day),
            schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((_, index) => getMovieCard(movies, index, schedules));
    }
    document.getElementById('sun').addEventListener('click', sunday);

    
    async function monday(){ 
        let cardHTML = '<p>We are not open on Mondays</p>';
        div.innerHTML = cardHTML;
    }
    document.getElementById('mon').addEventListener('click', monday);

    async function tuesday(){
        const
            day = 2,
            movies = await moviesDayInstance.getMoviesDay(day),
            schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((_, index) => getMovieCard(movies, index, schedules));
    }
    document.getElementById('tue').addEventListener('click', tuesday);

    async function wednesday(){
        const
            day = 3,
            movies = await moviesDayInstance.getMoviesDay(day),
            schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((_, index) => getMovieCard(movies, index, schedules));
    }
    document.getElementById('wed').addEventListener('click', wednesday);

    async function thursday(){
        const
            day = 4,
            movies = await moviesDayInstance.getMoviesDay(day),
            schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((_, index) => getMovieCard(movies, index, schedules));
    }
    document.getElementById('thu').addEventListener('click', thursday);

    async function friday(){
        const
            day = 5,
            movies = await moviesDayInstance.getMoviesDay(day),
            schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((_, index) => getMovieCard(movies, index, schedules));
    }
    document.getElementById('fri').addEventListener('click', friday);

    async function saturday(){
        const
            day = 6,
            movies = await moviesDayInstance.getMoviesDay(day),
            schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((_, index) => getMovieCard(movies, index, schedules));
    }
    document.getElementById('sat').addEventListener('click', saturday);

    const getMovieCard = (movie, i, schedule) => {
        const card =
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
        return card;
    }
});




