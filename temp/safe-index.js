import { moviesApiSelected, upComingMovies } from "../../app/service/movies-api.js";
import { MovieContent } from "../../app/service/movies-content.js";
import { Schedule } from "../../app/service/schedule-services.js";


document.addEventListener('DOMContentLoaded', () => {
    const div = document.getElementById('moviesCurrent');
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
    let scrollPositionUpComing = 0;
    let daySelectedUpComing = 0;
    let windowWidth = window.innerWidth;
    let cardWidth = 0;
    let cardWidthMoviesUpComing = 0;
    const
        date = new Date(),
        currentDay = date.getDay(),
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
    let daySelected = currentDay;

    function renderDaysButtonsContent() {
        const daysFull = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const daysShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const days = windowWidth > 800 ? daysFull : daysShort;
    
        for (let i = 0; i < daysButtonsElements.length; i++) {
            daysButtonsElements[i].innerHTML = days[i];
        }
    }
    renderDaysButtonsContent();


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
        scrollPositionUpComing = 0;
        const moviesCurrentInstance = await new MovieContent().getMoviesDay(day);
        const divMd = document.getElementById('moviesCurrent');
        const divSm = document.getElementById('moviesCurrentSm');
        const schedule = await new MovieContent().getScheduleDayDiv(day);

        if (moviesCurrentInstance.length === 0) {
            divSm.innerHTML = `<p> We are not open in this day</p>`;
            divMd.innerHTML = `<p class="cardsMoviesCurrent"> We are not open in this day</p>`;
        }else{ 
            divSm.innerHTML = moviesCurrentInstance.map((_, index) => renderMoviesCardsSm(moviesCurrentInstance, index, schedule)).join('');
            divMd.innerHTML = moviesCurrentInstance.map((_, index) => renderMoviesCardsMd(moviesCurrentInstance, index, schedule)).join('');
            cardWidth = $(".cardsMoviesCurrent").width();
            $("#moviesCurrent").animate({ scrollLeft: scrollPosition });        
        }

        responsiveCarouselLayout(day);
    }
    getMoviesContent(currentDay);


    function renderMoviesCardsMd(movie, i, schedule){
        let carouselActive = "active";
        if(i != 0)
            carouselActive = "";

        if (schedule[i] === undefined) {
            schedule[i] = ["Undefined"];
        }
    
        if (schedule[i].length === 0) {
            schedule[i] = ["There are no more schedules today for this film"];
        }
        const cardMd =
        `<div class="cardsMoviesCurrent carousel-item ${carouselActive} d-flex justify-content-center">
            <div class="card bg-primary d-flex justify-content-center text-center text-white" style="width: 14em">
                <div style="height: 4em;">
                    <h4 class="my-1">${movie[i].title}</h4>
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
        return cardMd;
    }

    function renderMoviesCardsSm(movie, i, schedule){
        if (schedule[i] === undefined) {
            schedule[i] = ["Undefined"];
        }
    
        if (schedule[i].length === 0) {
            schedule[i] = ["There are no more schedules today for this film"];
        }
        const cardSm =
        `<div class="d-flex justify-content-center">
            <div class="card bg-primary d-flex justify-content-center text-center text-white" style="width: 14em">
                <div style="height: 4em;">
                    <h4 class="my-1">${movie[i].title}</h4>
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
        </div>`
        return cardSm;
    }

    async function renderUpComingMovies(){
        const divUpComingMovies = document.getElementById('moviesUpComing');
        const leftButtonUpComing = document.getElementById("leftButtonMoviesUpComing");
        const rightButtonUpComing = document.getElementById("rightButtonMoviesUpComing");
        const upComingMoviesInstance = await upComingMovies;
        let cardHTMLupcomingMovies = '';
        for(let i = 0; i < upComingMoviesInstance.length; i++){ 
            cardHTMLupcomingMovies = cardHTMLupcomingMovies +
            `<div class="cardsMoviesUpComing carousel-item d-flex align-items-center justify-content-center">
                <div class="" style="width: 14em">
                        <img class="imagem2 img-fluid rounded rounded-3" src="${upComingMoviesInstance[i].poster_path}" alt="">
                </div>
            </div>`;
        }
        divUpComingMovies.innerHTML = cardHTMLupcomingMovies;
        cardWidthMoviesUpComing = $(".cardsMoviesUpComing").width();
    }
    renderUpComingMovies();
    
    async function initCarouselMoviesCurrent() {
        
        
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");
        const carouselWidth = $("#moviesCurrent")[0].scrollWidth;
        
        
        $("#rightButtonMoviesCurrent").addClass('.display-none')

        $("#rightButtonMoviesCurrent").on("click", function () {
            leftButton.classList.remove('display-none');
            
           
                scrollPosition += cardWidth*2;  
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 400); 
                
            
        });

        $("#leftButtonMoviesCurrent").on("click", function () {
            
            if(scrollPosition > 0){ 
                scrollPosition -= cardWidth*2;
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 400);
                
                leftButton.classList.remove('display-none');
            }else{
                leftButton.classList.add('display-none');
            }
        });
    }
    initCarouselMoviesCurrent();
    
    async function initCarouselMoviesUpComing(){
       
        const leftButton = document.getElementById("leftButtonMoviesUpComing");
        const rightButton = document.getElementById("rightButtonMoviesUpComing");
        const carouselWidth = $("#moviesUpComing")[0].scrollWidth;
       
        $("#rightButtonMoviesUpComing").addClass('.display-none')

        $("#rightButtonMoviesUpComing").on("click", function () {
            
            leftButton.classList.remove('display-none');

                scrollPositionUpComing += cardWidthMoviesUpComing;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 400);
        });

        $("#leftButtonMoviesUpComing").on("click", function () {
            if(scrollPositionUpComing > 0){ 
                scrollPositionUpComing -= cardWidthMoviesUpComing;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 400);
                leftButton.classList.remove('display-none');
            }else{
                leftButton.classList.add('display-none');
            }
        });
    }
    initCarouselMoviesUpComing();

    async function responsiveCarouselLayout(day){
        await upComingMovies;
        const upComingMoviesInstance = await upComingMovies;
        const div = document.getElementById('moviesCurrent');
        const divSm = document.getElementById('moviesCurrentSm');
        const divCarouselMd = document.getElementById('carouselMoviesCurrent');
        const divUpComingMovies = document.getElementById('moviesUpComing');
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");
        const leftButtonUpComing = document.getElementById("leftButtonMoviesUpComing");
        const rightButtonUpComing = document.getElementById("rightButtonMoviesUpComing");
        const movies = await new MovieContent().getMoviesDay(day);
        
        let moviesFrontPage = 0;
        
        if(windowWidth > 1260)
            moviesFrontPage = 5;
        else if(windowWidth <= 1260 && windowWidth >= 800)
            moviesFrontPage = 4;
        else 
            moviesFrontPage = 0;

        if(movies.length <= moviesFrontPage){
            div.classList.add('centralizeMoviesCards'); 
            rightButton.classList.add('display-none');
            leftButton.classList.add('display-none');
        }else{
            div.classList.remove('centralizeMoviesCards'); 
            rightButton.classList.remove('display-none');
        }
        
        if(upComingMoviesInstance.length <= moviesFrontPage){
            divUpComingMovies.classList.add('centralizeMoviesCards'); 
            rightButtonUpComing.classList.add('display-none');
            leftButtonUpComing.classList.add('display-none');
        }else{
            divUpComingMovies.classList.remove('centralizeMoviesCards'); 
            rightButtonUpComing.classList.remove('display-none');
        }
    }
    
    async function resizeWindow(){
        windowWidth = window.innerWidth;
        responsiveCarouselLayout(daySelected);
        if (windowWidth < 800 || windowWidth > 800 && windowWidth < 1000) {
            renderDaysButtonsContent();
        }
    }
    
    window.addEventListener('resize', resizeWindow);
});




