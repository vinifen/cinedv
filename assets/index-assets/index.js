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
async function cineDV(){ 
    await moviesApiSelected;
    let scrollPosition = 0;
    let scrollPositionUpComing = 0;
    let daySelectedUpComing = 0;
    let windowWidth = window.innerWidth;
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
        scrollPositionUpComing = 0;
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");
        const moviesCurrentInstance = await new MovieContent().getMoviesDay(day);
        const div = document.getElementById('moviesCurrent');
        const divSm = document.getElementById('moviesCurrentSm');
        const divCarouselMd = document.getElementById('carouselMoviesCurrent');
        responsiveCarouselLayout(day);
        if(day == 1)
            div.innerHTML = `<p>We are not open on Mondays</p>`;
        else{  
            let schedule = await new MovieContent().getScheduleDayDiv(day);
            divSm.innerHTML = moviesCurrentInstance.map((_, index) => renderMoviesCards(moviesCurrentInstance, index, schedule)).join('');
            div.innerHTML = moviesCurrentInstance.map((_, index) => renderMoviesCards(moviesCurrentInstance, index, schedule)).join('');
            $("#moviesCurrent").animate({ scrollLeft: scrollPosition });
            /*if(windowWidth > 800){ 
                divCarouselMd.classList.remove('display-none');
                divSm.classList.add('display-none');
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition });
                
            }else if( windowWidth < 800){ 
                divSm.classList.remove('display-none');
                divCarouselMd.classList.add('display-none');
                
            }*/
        }
        
        
    }
    getMoviesContent(currentDay);


    function renderMoviesCards(movie, i, schedule){
        let carouselActive = "active";
        if(i != 0)
            carouselActive = "";
        if(schedule[i].length == "")
            schedule[i] = "There are no more schedule today for this film"; 
        const cardWindowMd =
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
        const cardWindowSm =
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
        </div>`;
        const card = windowWidth > 800 ? cardWindowMd : cardWindowSm;
        return card;
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
        
    }
    renderUpComingMovies();

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
        console.log(day, "sapo");
        const movies = await new MovieContent().getMoviesDay(day);
        
        let moviesFrontPage = 0;
        console.log(windowWidth, "sapaourubu");
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
        console.log(upComingMoviesInstance.length, "cavalos ", moviesFrontPage);
        if(upComingMoviesInstance.length <= moviesFrontPage){
            divUpComingMovies.classList.add('centralizeMoviesCards'); 
            rightButtonUpComing.classList.add('display-none');
            leftButtonUpComing.classList.add('display-none');
        }else{
            divUpComingMovies.classList.remove('centralizeMoviesCards'); 
            rightButtonUpComing.classList.remove('display-none');
        }
    }
    

    async function initCarouselMoviesCurrent() {
        
        const movies = await new MovieContent().getMoviesDay(daySelected);
        await getMoviesContent(currentDay);
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");
        console.log(scrollPosition, "posicao inicial");
        var carouselWidth = $("#moviesCurrent")[0].scrollWidth;
        var cardWidth = $(".cardsMoviesCurrent").width();
        console.log(carouselWidth, cardWidth);
        $("#rightButtonMoviesCurrent").addClass('.display-none')

        $("#rightButtonMoviesCurrent").on("click", function () {
            leftButton.classList.remove('display-none');
            console.log(cardWidth, carouselWidth, "next");
            console.log(scrollPosition, "posicao antes clique");
           //check if you can go any further
                scrollPosition += cardWidth*2;  //update scroll position
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 600); //scroll left
                console.log(cardWidth, carouselWidth, "next depois clique");
                console.log(scrollPosition, "posicao depois clique");
            
        });

        $("#leftButtonMoviesCurrent").on("click", function () {
            console.log(cardWidth, carouselWidth, "prev");
            console.log(scrollPosition, "posicao antes do clique");
            if(scrollPosition > 0){ 
                scrollPosition -= cardWidth*2;
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 600);
                console.log(scrollPosition, "ss");
                leftButton.classList.remove('display-none');
            }else{
                leftButton.classList.add('display-none');
            }
            console.log(cardWidth, carouselWidth, "prev depois clique");
            console.log(scrollPosition, "posicao depois clique");
        });
    }
    
    async function initCarouselMoviesUpComing(){
       
        const movies = await new MovieContent().getMoviesDay(daySelected);
        await getMoviesContent(currentDay);
        const leftButton = document.getElementById("leftButtonMoviesUpComing");
        const rightButton = document.getElementById("rightButtonMoviesUpComing");
        console.log(scrollPositionUpComing, "posicao inicial");
        var carouselWidth = $("#moviesUpComing")[0].scrollWidth;
        var cardWidth = $(".cardsMoviesUpComing").width();
        console.log(cardWidth, "asdf");
        console.log(carouselWidth, cardWidth);
        $("#rightButtonMoviesUpComing").addClass('.display-none')

        $("#rightButtonMoviesUpComing").on("click", function () {
            console.log("sapo")
            leftButton.classList.remove('display-none');
            console.log(cardWidth, carouselWidth, "next");
            console.log(scrollPositionUpComing, "posicao antes clique");
           //check if you can go any further
                scrollPositionUpComing += cardWidth;  //update scroll position
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 600); //scroll left
                console.log(cardWidth, carouselWidth, "next depois clique");
                console.log(scrollPositionUpComing, "posicao depois clique");
            
        });

        $("#leftButtonMoviesUpComing").on("click", function () {
            console.log(cardWidth, carouselWidth, "prev");
            console.log(scrollPositionUpComing, "posicao antes do clique");
            if(scrollPositionUpComing > 0){ 
                scrollPositionUpComing -= cardWidth;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 600);
                console.log(scrollPositionUpComing, "ss");
                leftButton.classList.remove('display-none');
            }else{
                leftButton.classList.add('display-none');
            }
            console.log(cardWidth, carouselWidth, "prev depois clique");
            console.log(scrollPositionUpComing, "posicao depois clique");
        });
    }
    
    if(windowWidth > 800){
        initCarouselMoviesCurrent();
        initCarouselMoviesUpComing();
    }

    async function sapinho(){
        windowWidth = window.innerWidth;
        console.log(daySelected, "asdfasdfasdfasd")
        responsiveCarouselLayout(daySelected);
        if (windowWidth < 800 || windowWidth > 800 && windowWidth < 1000) {
            console.log('Janela menor que 600px. Executar ação desejada.');
            renderDaysButtonsContent();
            
            // Adicione aqui as ações que você deseja executar quando a janela for menor que 600px
        } else {
            console.log('Janela maior ou igual a 600px. Executar ação desejada.');
            // Adicione aqui as ações que você deseja executar quando a janela for maior ou igual a 600px
        }
    }
    
    window.addEventListener('resize', sapinho);
};

document.addEventListener('DOMContentLoaded', cineDV);
//atualizar página quando mudar resolução


/*async function sapinho(){
    let urubu = window.innerWidth;
    console.log(urubu);
    if (urubu < 800 || urubu > 800 && urubu < 1000) {
        console.log('Janela menor que 600px. Executar ação desejada.');
        cineDV();
        // Adicione aqui as ações que você deseja executar quando a janela for menor que 600px
    } else {
        console.log('Janela maior ou igual a 600px. Executar ação desejada.');
        // Adicione aqui as ações que você deseja executar quando a janela for maior ou igual a 600px
    }
}

window.addEventListener('resize', sapinho);*/



