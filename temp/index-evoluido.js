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
    const moviesDayInstance = new MoviesDay();
    const htmlConverter = new toHTML();
    const div = document.getElementById('movies-cards');

    const updateMoviesCard = async (day) => {
        if(day == 1){ 
            div.innerHTML = `<p>We are not open on Mondays</p>`
        }else{ 
        const movies = await moviesDayInstance.getMoviesDay(day);
        const schedules = await moviesDayInstance.getScheduleDiv(day);
        div.innerHTML = movies.map((movie, index) => getMovieCard(movie, index, schedules)).join('');
        }
    };

    const getMovieCard = (movie, index, schedule) => 
        `<div class="card col-12 col-md-3">
            <div>
                <h3>${movie.title}</h3>
                <p class="timeline">${movie.timeline}</p>
            </div>
            <div>  
                <img class="imagem" class="img-fluid" src="${movie.image}" alt="">
            </div>
            <div>
                <div class="movie-schedule">${schedule[index]}</div>
                <a href="">view more</a>
            </div> 
        </div>`;

    const dayButtons = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    dayButtons.forEach((buttonId, index) => {
        document.getElementById(buttonId).addEventListener('click', () => updateMoviesCard(index));
    });

    const currentDay = new Date().getDay();
    if (currentDay >= 0 && currentDay <= 6) {
        updateMoviesCard(currentDay);
    } else {
        console.error('Invalid Day');
    }
});





