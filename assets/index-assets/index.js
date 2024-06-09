import { moviesApiSelected, upComingMovies } from "../../app/service/movies-api.js";
import { MovieContent } from "../../app/service/movies-content.js";
import { Schedule } from "../../app/service/schedule-services.js";


document.addEventListener('DOMContentLoaded', () => {
    const div = document.getElementById('movies-cards');
    let cardHTML = ``;
    for (let i = 0; i < 4; i++){
        cardHTML = cardHTML +
        `<div class="card col-12 col-md-3">
        <div>
            <h3></h3>
            <p class="timeline"></p>
        </div>
        <div>  
        <img class="imagem" class="img-fluid" src="/cinedv/assets/img/skeleton-movie.webp" alt="">
        </div>
        <div>
            <div class="container">
                <div class="movie-schedule">
                    <div class="row">
                        
                    </div>
                    <a href="" class="text-center">view more</a>
                </div>
            </div>
        </div> 
        </div>`;
    }
    div.innerHTML = cardHTML;
});

//carregar cards
document.addEventListener('DOMContentLoaded', async () => { 
    await moviesApiSelected;
    let scrollPosition = 0;
    let daySelected = 0;
    const
        date = new Date(),
        currentDay = 3,
        daysButtonsElements = [ 
            document.getElementById('sun'),
            document.getElementById('mon'),
            document.getElementById('tue'),
            document.getElementById('wed'),
            document.getElementById('thu'),
            document.getElementById('fri'),
            document.getElementById('sat'),
        ],
        dateElements = [ 
            document.getElementById('sun-date'),
            document.getElementById('mon-date'),
            document.getElementById('tue-date'),
            document.getElementById('wed-date'),
            document.getElementById('thu-date'),
            document.getElementById('fri-date'),
            document.getElementById('sat-date'),
        ];

    function renderDates(){

        const dates = new Schedule().getCurrentFormatedDates();
        for(let i = 0; i < dateElements.length; i++){
            let index = (currentDay + i) % dateElements.length;
            dateElements[index].innerHTML = dates[i];
        }
    }
    renderDates();


    daysButtonsElements.forEach((dayId, dayIndex) => {dayId.addEventListener('click', () => {
        getMoviesContent(dayIndex), 
        changeButtonStyles(dayIndex), 
        daySelected = dayIndex;

    })});

    async function changeButtonStyles(day){
        
        console.log(scrollPosition, "selecao dia");
        daysButtonsElements.forEach(button => {
            button.classList.remove('selected-button');
        });
        dateElements.forEach(date => {
            date.classList.remove('selected-date-button');
        });
        daysButtonsElements[day].classList.add('selected-button');
        dateElements[day].classList.add('selected-date-button');
    }
    changeButtonStyles(currentDay);


    async function getMoviesContent(day){
        scrollPosition = 0;
        $(".carousel-inner").animate({ scrollLeft: scrollPosition });

        const div = document.getElementById('movies-cards');
        if(day == 1)
            div.innerHTML = `<p>We are not open on Mondays</p>`;
        else{  
            const movies = await new MovieContent().getMoviesDay(day);
            let schedule = await new MovieContent().getScheduleDayDiv(day);
            div.innerHTML = movies.map((_, index) => renderMoviesCards(movies, index, schedule)).join('');
        }
    }
    getMoviesContent(currentDay);


    function renderMoviesCards(movie, i, schedule){
        let carouselActive = "active";
        if(i != 0)
            carouselActive = "";
        if(schedule[i].length == "")
            schedule[i] = "There are no more schedule today for this film"; 
        const card =
        `<div class="carousel-item ${carouselActive} d-flex justify-content-center">
            <div class="card bg-primary d-flex justify-content-center text-center text-white" style="width: 250px">
                <div style="height: 4em;">
                    <h3 class="my-1">${movie[i].title}</h3>
                    <p class="timeline my-1">${movie[i].runtime}</p>
                </div>
                <div class="mb-2">  
                    <img class="imagem rounded rounded-3" class="img-fluid" src="${movie[i].poster_path}" alt="">
                </div>
                <div class="container schedule-container mb-2 bg-secondary rounded rounded-3">
                    <div class="movie-schedule">
                        <div class="row d-flex justify-content-center align-items-center movie-schedule">
                            ${schedule[i]}
                        </div>
                        <div class="mt-3 mb-1">
                            <a href="" class="view-more text-center text-white">view more</a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>`;
        return card;
    }

    async function renderUpComingMovies(){
        const divUpComingMovies = document.getElementById('upcoming-movies');
        const upComingMoviesInstance = await upComingMovies;
        let cardHTMLupcomingMovies = '';
        for(let i = 0; i < upComingMoviesInstance.length; i++){ 
            cardHTMLupcomingMovies = cardHTMLupcomingMovies +
            `<div class="col-12 col-md-3">
                <div class="card">
                    <div class="container">
                        <img class="imagem" class="img-fluid" src="${upComingMoviesInstance[i].poster_path}" alt="">
                    </div>
                </div>
            </div>`;
        }
        divUpComingMovies.innerHTML = cardHTMLupcomingMovies;
    }
    renderUpComingMovies();

    async function initCarousel() {
        const movies = await new MovieContent().getMoviesDay(day);
        await getMoviesContent(currentDay);
        const leftButton = document.getElementById("left-button-carousel");
        const rightButton = document.getElementById("right-button-carousel");
        console.log(scrollPosition, "posicao inicial");
        var carouselWidth = $(".carousel-inner")[0].scrollWidth;
        var cardWidth = $(".carousel-item").width();
        console.log(carouselWidth, cardWidth);
        $(".carousel-control-next").addClass('.remove-carousel-control-prev')

        $(".carousel-control-next").on("click", function () {
            leftButton.classList.remove('remove-carousel-control-prev');
            console.log(cardWidth, carouselWidth, "next");
            console.log(scrollPosition, "posicao antes clique");
           //check if you can go any further
                scrollPosition += cardWidth;  //update scroll position
                $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600); //scroll left
                console.log(cardWidth, carouselWidth, "next depois clique");
                console.log(scrollPosition, "posicao depois clique");
            
        });

        $(".carousel-control-prev").on("click", function () {
            console.log(cardWidth, carouselWidth, "prev");
            console.log(scrollPosition, "posicao antes do clique");
            if(scrollPosition > 0){ 
                scrollPosition -= cardWidth;
                $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
                console.log(scrollPosition, "ss");
                leftButton.classList.remove('remove-carousel-control-prev');
            }else{
                leftButton.classList.add('remove-carousel-control-prev');
            }
            console.log(cardWidth, carouselWidth, "prev depois clique");
            console.log(scrollPosition, "posicao depois clique");
        });
    }
    initCarousel();
});




