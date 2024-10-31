import { moviesApiSelected, upComingMovies } from "../../app/service/movies-api.js";
import { MovieContent } from "../../app/service/movies-content.js";
import { Schedule } from "../../app/service/schedule-services.js";
import { UserRegister } from "../../app/service/user-register.js";

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
    let localStorageUserContent = JSON.parse(localStorage.getItem('user')) || {};
    const offLogin = document.getElementById('loggedOut');
    const onLogin = document.getElementById('logged');
    const modalAuthentication = document.getElementById('loginModalLabel');
    const textLogin = document.getElementById('loginText');

    function reloadCounter() {
        
        let counter = parseInt(localStorage.getItem('counterReload'));
    
        if (isNaN(counter)) {
            counter = 0;
        } else {
            counter++;
        }

        localStorage.setItem('counterReload', counter);
    }

    if(localStorage.getItem('login') === "true"){  
        reloadCounter();
        textLogin.innerHTML = localStorageUserContent.name;
        modalAuthentication.classList.add('d-none');
        offLogin.classList.add('d-none');
        onLogin.classList.remove('d-none');
    }else{
        localStorage.removeItem('counterReload');
        offLogin.classList.remove('d-none');
        onLogin.classList.add('d-none');
        modalAuthentication.classList.remove('d-none');
    }

    function logout() {
        localStorage.removeItem('login');
        location.reload();
    }
    
    document.getElementById('logoutButton').addEventListener('click', logout);
    
    if (localStorage.getItem('counterReload') > 1 && localStorage.getItem('rememberMe') === 'false') {
        logout();
    }

    register();
    login();

    
});


document.addEventListener('DOMContentLoaded', async () => { 
    const apiMoviesAll = await moviesApiSelected;
    const upComingMoviesInstance = await upComingMovies;
    const movieContentInstance = new MovieContent();
    
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
        ],
        
        bkSm = 576,
        bkMd = 805,
        bkLg = 992,
        bkXl = 1279,
        bkXxl = 1400;

    let daySelected = currentDay,
        windowWidth = window.innerWidth,

        daysButtonsCont = currentDay,

        scrollPositionMoviesCurrent = 0,
        cardWidthMoviesCurrent = 0,
        buttonCountMoviesCurrent = 0,
        carouselButtonLimitMoviesCurrent = 0,

        cardWidthMoviesUpComing = 0,
        scrollPositionMoviesUpComing = 0,
        buttonCountMoviesUpComing = 0,
        carouselButtonLimitMoviesUpComing = 0,

        cardWidthMovieTheaterImgs = $(".carousel-item-movie-theater-imgs").width(),
        scrollPositionMovieTheaterImgs = 0,
        buttonCountMovieTheaterImgs = 0,
        carouselButtonLimitMovieTheaterImgs = 0;
        $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 0);
        document.getElementById("leftButtonMovieTheaterImgs").classList.add("visibility-hidden");
        
    const amountCardsMoviesCurrentAnimate = 2;
    const amountCardsMoviesUpComingAnimate = 1;
    const amountCardsMovieTheaterImgsAnimate = 1;

    function renderDaysButtonsContent() {
        const daysFull = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const daysShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const days = windowWidth > bkMd ? daysFull : daysShort;
    
        for (let i = 0; i < daysButtonsElements.length; i++) {
            daysButtonsElements[i].innerHTML = days[i];
        }
    }
    renderDaysButtonsContent();


    function renderDates(){

        const dates = new Schedule().getCurrentFormatedDates();
        for(let i = 0; i < dateElements.length; i++){
            let index = (currentDay + i) % dateElements.length;
            dateElements[index].textContent = dates[i];
        }
    }
    renderDates();


    daysButtonsElements.forEach((dayId, dayIndex) => {dayId.addEventListener('click', () => {
        renderMoviesCurrent(dayIndex); 
        changeButtonStyles(dayIndex); 
        daySelected = dayIndex;
        daysButtonsCont = dayIndex;
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

    function daysButtons(){
        document.getElementById("rightButtonDays").addEventListener('click', () => {
            if(daysButtonsCont < 6){ 
                daysButtonsCont++;
            } else {
                daysButtonsCont = 0;
            }
            daySelected = daysButtonsCont;
            renderMoviesCurrent(daysButtonsCont); 
            changeButtonStyles(daysButtonsCont);
        });
        document.getElementById("leftButtonDays").addEventListener('click', () => {
            if(daysButtonsCont > 0){ 
                daysButtonsCont--;
            } else {
                daysButtonsCont = daysButtonsElements.length - 1;
            }
            daySelected = daysButtonsCont;
            renderMoviesCurrent(daysButtonsCont); 
            changeButtonStyles(daysButtonsCont);
        });
    } 
    daysButtons();

    async function renderMoviesCurrent(day){

        const moviesCurrentDayContent = await movieContentInstance.getMoviesDay(day);
        const schedule = await movieContentInstance.getScheduleDayDiv(day);
        const divMd = document.getElementById('moviesCurrent');
        const divSm = document.getElementById('moviesCurrentSm');

        if (moviesCurrentDayContent.length === 0) {
            divMd.innerHTML = `<p class="carousel-items-movies-current bg-primary px-5 py-3 rounded-2"> We are not open in this day!</p>`;
            divSm.innerHTML = `<p class="carousel-items-movies-current bg-primary px-5 py-3 rounded-2"> We are not open in this day!</p>`;
        }else{ 
            divSm.innerHTML = moviesCurrentDayContent.map((_, index) => contentMoviesCurrentSm(moviesCurrentDayContent, index, schedule)).join('');
            divMd.innerHTML = moviesCurrentDayContent.map((_, index) => contentMoviesCurrentMd(moviesCurrentDayContent, index, schedule)).join('');

            scrollPositionMoviesCurrent = 0;
            cardWidthMoviesCurrent = $(".carousel-items-movies-current").width();
            $("#moviesCurrent").animate({ scrollLeft: scrollPositionMoviesCurrent }, 0);  
            carouselButtonLimitMoviesCurrent = await getCarouselNextLimitMoviesCurrent();
            buttonCountMoviesCurrent = 0;
        }
        await renderControlCirclesMoviesCurrent();
        await responsiveMoviesCurrentLayout(daySelected);
        await modalMoviesCurrent(daySelected);
    }
    renderMoviesCurrent(currentDay);

    function contentMoviesCurrentMd(movie, i, schedule){
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
        `<div type="button" data-bs-toggle="modal" data-bs-target="#modalMoviesCurrent" class="carousel-items-movies-current d-flex justify-content-center carousel-item ${carouselActive}">
            <div class="card rounded rounded-4 cards-movies-current-md bg-primary text-white">
                <div class="movies-title-runtime d-flex flex-column justify-content-around">
                    <h4 class="mx-2 pt-1 movie-title">${movie[i].title}</h4>
                    <p class="runtime mb-2 text-bottom">${movie[i].runtime}</p>
                </div>
                <div class="mb-2">  
                    <img class="images-movies-current-md rounded rounded-3" class="img-fluid" src="${movie[i].poster_path}" alt="">
                </div>
                <div class="container schedule-container mb-2 bg-secondary rounded rounded-3">
                        <div class="row d-flex justify-content-center align-items-center movie-schedule-md">
                            ${schedule[i]}
                        </div>
                        <p class="view-more text-center text-white">view more</p>
                </div> 
            </div>
        </div>`;
        return cardMd;
    }

    function contentMoviesCurrentSm(movie, i, schedule){
        if (schedule[i] === undefined) {
            schedule[i] = ["Undefined"];
        }
    
        if (schedule[i].length === 0) {
            schedule[i] = [`<p class="no-time">There are no more schedules today for this film</p>`];
        }
        const cardSm =
        `<div type="button" data-bs-toggle="modal" data-bs-target="#modalMoviesCurrent" class="carousel-items-movies-current-sm mb-3 rounded-4 bg-primary text-center text-white d-flex justify-content-around align-items-center">
            <div style="width: 40%;">  
                <img class="m-2 images-movies-current-sm rounded-3" class="img-fluid" src="${movie[i].poster_path}" alt="" style="width: 90%;">
            </div>
            <div style="width: 60%">
                <h4 class="mt-2 movie-title">${movie[i].title}</h4>
                <p class="runtime my-1">${movie[i].runtime}</p>
                <div class="container schedule-container mb-2 bg-secondary rounded-3">
                        <div class="row d-flex justify-content-center align-items-center movie-schedule-sm">
                            ${schedule[i]}
                        </div>
                        <div>
                            <a href="" class="view-more text-center text-white">view more</a>
                        </div>
                </div> 
            </div>
        </div>`
        return cardSm;
    }

    async function automaticScrollMoviesCurrentWithout() {
        setTimeout( async () => { 
        const moviesCurrent = await movieContentInstance.getMoviesDay(daySelected);
        if(moviesCurrent.length === 0){ 
            if(daysButtonsCont < daysButtonsElements.length - 1){ 
                daysButtonsCont++;
            } else {
                daysButtonsCont = 0;
            }
            daySelected = daysButtonsCont;
            renderMoviesCurrent(daysButtonsCont); 
            changeButtonStyles(daysButtonsCont);
        }
        }, "5000");
    }
    automaticScrollMoviesCurrentWithout();

    async function renderMovieOfWeek(){
        const movieOfWeek = 0;
        const movieOfWeekImg = await apiMoviesAll[movieOfWeek].poster_path;
        const movieOfWeekBackground = await apiMoviesAll[movieOfWeek].backdrop_path;
        const movieOfWeekTitle = await apiMoviesAll[movieOfWeek].title;
        document.getElementById('divMovieOfWeekImg').innerHTML = `<img class="movie-of-week-img my-3 rounded rounded-4" src="${movieOfWeekImg}">`;
        document.getElementById('movieOfWeekBackgroundImg').style.backgroundImage = `url("${movieOfWeekBackground}")`;
        document.getElementById('movieOfWeekTitle').textContent = movieOfWeekTitle; 
    }
    renderMovieOfWeek();

    async function renderUpComingMovies(){
        const divUpComingMovies = document.getElementById('moviesUpComing');

        let cardHTMLupcomingMovies = '';
        for(let i = 0; i < upComingMoviesInstance.length; i++){ 
            let carouselActive = "active";
            if(i != 0)
                carouselActive = "";

            cardHTMLupcomingMovies = cardHTMLupcomingMovies +
            `<div type="button" data-bs-toggle="modal" data-bs-target="#modalMoviesUpComing"  class="carousel-items-movies-upcoming carousel-item ${carouselActive} d-flex align-items-center justify-content-center">
                <div class="card-movies-upcoming">
                    <img class="img-fluid rounded rounded-3" src="${upComingMoviesInstance[i].poster_path}">
                </div>
            </div>`;
        }
        divUpComingMovies.innerHTML = cardHTMLupcomingMovies;

        scrollPositionMoviesUpComing = 0;
        cardWidthMoviesUpComing = $(".carousel-items-movies-upcoming").width();
        $("#moviesUpComing").animate({scrollLeft: scrollPositionMoviesUpComing}, 0);
        carouselButtonLimitMoviesUpComing = await getCarouselNextLimitMoviesUpComing();
        buttonCountMoviesUpComing = 0;
        responsiveMoviesUpComingLayout();
        renderControlCirclesMoviesUpComing();
        modalMoviesUpComing();
    }
    renderUpComingMovies();

    async function renderUpComingMoviesSm(){
        const divUpComingMovies = document.getElementById('moviesUpComingSm');
        
        let cardHTMLupcomingMovies = '';
        for(let i = 0; i < upComingMoviesInstance.length; i++){ 
            let carouselActive = "active";
            if(i != 0)
                carouselActive = "";

            cardHTMLupcomingMovies = cardHTMLupcomingMovies +
            `<div type="button" data-bs-toggle="modal" data-bs-target="#modalMoviesUpComing" class="cards-movies-upcoming-sm my-2 ${carouselActive} d-flex align-items-center justify-content-center">
                <div class="card-movies-upcoming">
                    <img class="img-fluid rounded rounded-3" src="${upComingMoviesInstance[i].poster_path}">
                </div>
            </div>`;
        }
        divUpComingMovies.innerHTML = cardHTMLupcomingMovies;
        await modalMoviesUpComing();
    }
    renderUpComingMoviesSm();


    async function initCarouselMoviesCurrent() {
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");

        $("#rightButtonMoviesCurrent").on("click", async function moviesCurrentRightButton() {
            if(buttonCountMoviesCurrent < carouselButtonLimitMoviesCurrent){ 
                buttonCountMoviesCurrent ++;
                leftButton.classList.remove("visibility-hidden");
                scrollPositionMoviesCurrent += cardWidthMoviesCurrent*amountCardsMoviesCurrentAnimate;  
                $("#moviesCurrent").animate({ scrollLeft: scrollPositionMoviesCurrent }, 400); 

                if(buttonCountMoviesCurrent >= carouselButtonLimitMoviesCurrent)
                    rightButton.classList.add("visibility-hidden");

                await updateControlCirclesMoviesCurrent(buttonCountMoviesCurrent);
            }
           
        });
    
        $("#leftButtonMoviesCurrent").on("click", async function moviesCurrentLeftButton() {
            if(buttonCountMoviesCurrent > 0){ 
                buttonCountMoviesCurrent --;
                scrollPositionMoviesCurrent -= cardWidthMoviesCurrent * amountCardsMoviesCurrentAnimate;
                $("#moviesCurrent").animate({ scrollLeft: scrollPositionMoviesCurrent }, 400);
                if(buttonCountMoviesCurrent <= 0){ 
                    leftButton.classList.add("visibility-hidden");
                    rightButton.classList.remove("visibility-hidden");
                }else{ 
                    leftButton.classList.remove("visibility-hidden");
                    rightButton.classList.remove("visibility-hidden");
                }
                await updateControlCirclesMoviesCurrent(buttonCountMoviesCurrent);
            }
            
        });
    }
    initCarouselMoviesCurrent();

    async function initCarouselMoviesUpComing(){
        const leftButton = document.getElementById("leftButtonMoviesUpComing");
        const rightButton = document.getElementById("rightButtonMoviesUpComing");

        $("#rightButtonMoviesUpComing").on("click",async function () {
            if(buttonCountMoviesUpComing < carouselButtonLimitMoviesUpComing) { 
                leftButton.classList.remove("visibility-hidden");
                buttonCountMoviesUpComing ++;
                scrollPositionMoviesUpComing += cardWidthMoviesUpComing * amountCardsMoviesUpComingAnimate;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionMoviesUpComing }, 400);

                if(buttonCountMoviesUpComing >= carouselButtonLimitMoviesUpComing)
                    rightButton.classList.add("visibility-hidden");
                await updateControlCirclesMoviesUpComing(buttonCountMoviesUpComing);
            }
        });
    
        $("#leftButtonMoviesUpComing").on("click",async function () {
            if(buttonCountMoviesUpComing > 0){ 
                buttonCountMoviesUpComing --;
                scrollPositionMoviesUpComing -= cardWidthMoviesUpComing * amountCardsMoviesUpComingAnimate;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionMoviesUpComing }, 400);
                if(buttonCountMoviesUpComing <= 0){ 
                    leftButton.classList.add("visibility-hidden");
                    rightButton.classList.remove("visibility-hidden");
                }else{ 
                    leftButton.classList.remove("visibility-hidden");
                    rightButton.classList.remove("visibility-hidden");
                }
                await updateControlCirclesMoviesUpComing(buttonCountMoviesUpComing);
            }
        });
    }
    initCarouselMoviesUpComing();

    
    async function updateMovieTheaterImgsMediaQuerie() {
        cardWidthMovieTheaterImgs = $(".carousel-item-movie-theater-imgs").width();
        scrollPositionMovieTheaterImgs = 0;
        $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 0);
        document.getElementById("leftButtonMovieTheaterImgs").classList.add("visibility-hidden");
        await responsiveMovieTheaterImgsLayout();
        buttonCountMovieTheaterImgs = 0;
        carouselButtonLimitMovieTheaterImgs = await getCarouselNextLimitMovieTheaterImgs();
        await renderControlCirclesMovieTheaterImgs();
    }
    
    async function initCarouselMovieTheaterImgs() {
        const leftButton = document.getElementById("leftButtonMovieTheaterImgs");
        const rightButton = document.getElementById("rightButtonMovieTheaterImgs");
        
        
        $("#rightButtonMovieTheaterImgs").on("click", async function () {
            carouselButtonLimitMovieTheaterImgs = await getCarouselNextLimitMovieTheaterImgs();
            if(buttonCountMovieTheaterImgs < carouselButtonLimitMovieTheaterImgs){ 
                leftButton.classList.remove("visibility-hidden");
                buttonCountMovieTheaterImgs ++;
                scrollPositionMovieTheaterImgs += cardWidthMovieTheaterImgs * amountCardsMovieTheaterImgsAnimate;
                $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 400);
                if(buttonCountMovieTheaterImgs >= carouselButtonLimitMovieTheaterImgs)
                    rightButton.classList.add("visibility-hidden");
            }
            await updateControlCirclesMovieTheaterImgs(buttonCountMovieTheaterImgs);
        });
        
        $("#leftButtonMovieTheaterImgs").on("click", async function () {
            carouselButtonLimitMovieTheaterImgs = await getCarouselNextLimitMovieTheaterImgs();
            if(buttonCountMovieTheaterImgs > 0){ 
                buttonCountMovieTheaterImgs --;
                scrollPositionMovieTheaterImgs -= cardWidthMovieTheaterImgs * amountCardsMovieTheaterImgsAnimate;
                $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 400);
                if(buttonCountMovieTheaterImgs <= 0){ 
                    leftButton.classList.add("visibility-hidden");
                    rightButton.classList.remove("visibility-hidden");
                }else{ 
                    leftButton.classList.remove("visibility-hidden");
                    rightButton.classList.remove("visibility-hidden");
                }
            }
            await updateControlCirclesMovieTheaterImgs(buttonCountMovieTheaterImgs);
        });
    }
    initCarouselMovieTheaterImgs();

    async function renderControlCirclesMoviesCurrent(){
        const 
            div = document.getElementById("controlCirclesMoviesCurrent"),
            moviesFrontPage = await getMoviesAmountFront(),
            moviesCurrentDay = await movieContentInstance.getMoviesDay(daySelected),
            amountCircles = await getCarouselNextLimitMoviesCurrent();
        let circles = ``;

        if(moviesCurrentDay.length > moviesFrontPage){ 
            circles = `<button type="button" class=" bi-circle-fill itensControlCircleMoviesCurrent d-flex justify-content-center align-items-center" id="circle0MoviesCurrent"></button>`
            for(let i = 1; i <= amountCircles; i++){
                circles = circles + `<button type="button" class=" bi-circle itensControlCircleMoviesCurrent d-flex justify-content-center align-items-center" id="circle${i}MoviesCurrent"></button>`
            }
        }
        div.innerHTML = circles;
        controlCirclesMoviesCurrent();
    }

    function controlCirclesMoviesCurrent(){
        const allCircles = document.querySelectorAll('.itensControlCircleMoviesCurrent');
        allCircles.forEach((circleId, circleIndex) => {circleId.addEventListener('click', () => {
            
            circleFunction(circleIndex); 
        })});

        async function circleFunction(index){
            const leftButton = document.getElementById("leftButtonMoviesCurrent");
            const rightButton = document.getElementById("rightButtonMoviesCurrent");
            scrollPositionMoviesCurrent = await getMoviesAmountFront();
            buttonCountMoviesCurrent = index;
            
                scrollPositionMoviesCurrent = (cardWidthMoviesCurrent*amountCardsMoviesCurrentAnimate)*index;
                $("#moviesCurrent").animate({ scrollLeft: scrollPositionMoviesCurrent }, 0);
            
            if(buttonCountMoviesCurrent <= 0){ 
                leftButton.classList.add("visibility-hidden");
                rightButton.classList.remove("visibility-hidden");
            }else{ 
                leftButton.classList.remove("visibility-hidden");
                rightButton.classList.remove("visibility-hidden");
            }
            if(buttonCountMoviesCurrent >= carouselButtonLimitMoviesCurrent)
                rightButton.classList.add("visibility-hidden");
            updateControlCirclesMoviesCurrent(index);
        }
    }

    async function updateControlCirclesMoviesCurrent(position) {
        const allCircles = document.querySelectorAll('.itensControlCircleMoviesCurrent');
        allCircles.forEach(circle => {
            circle.classList.remove('bi-circle-fill');
            circle.classList.add('bi-circle');
        });
        const controlCircle = document.getElementById(`circle${position}MoviesCurrent`);
        controlCircle.classList.remove('bi-circle');
        controlCircle.classList.add('bi-circle-fill');
    }

    async function renderControlCirclesMoviesUpComing() {
        const 
            div = document.getElementById("controlCirclesMoviesUpComing"),
            moviesFrontPage = await getMoviesAmountFront(),
            amountCircles = await getCarouselNextLimitMoviesUpComing();
        let circles = ``;

        if(upComingMoviesInstance.length > moviesFrontPage){ 
            circles = `<button type="button" class="bi-circle-fill itensControlCircleMoviesUpComing d-flex justify-content-center align-items-center" id="circle0MoviesUpComing"></button>`
            for(let i = 1; i <= amountCircles; i++){
                circles = circles + `<button type="button" class="bi-circle itensControlCircleMoviesUpComing d-flex justify-content-center align-items-center" id="circle${i}MoviesUpComing"></button>`
            }
        }
        div.innerHTML = circles;

        controlCirclesMoviesUpComing();
    }

    function controlCirclesMoviesUpComing() {
        const allCircles = document.querySelectorAll('.itensControlCircleMoviesUpComing');
        allCircles.forEach((circleId, circleIndex) => {circleId.addEventListener('click', () => {
            
            circleFunction(circleIndex); 
        })});

        async function circleFunction(index) {
            const leftButton = document.getElementById("leftButtonMoviesUpComing");
            const rightButton = document.getElementById("rightButtonMoviesUpComing");
            scrollPositionMoviesUpComing = await getMoviesAmountFront();
            buttonCountMoviesUpComing = index;
            
            scrollPositionMoviesUpComing = (cardWidthMoviesUpComing*amountCardsMoviesUpComingAnimate)*index;
            $("#moviesUpComing").animate({ scrollLeft: scrollPositionMoviesUpComing }, 0);
            
            if(buttonCountMoviesUpComing <= 0){ 
                leftButton.classList.add("visibility-hidden");
                rightButton.classList.remove("visibility-hidden");
            }else{ 
                leftButton.classList.remove("visibility-hidden");
                rightButton.classList.remove("visibility-hidden");
            }
            if(buttonCountMoviesUpComing >= carouselButtonLimitMoviesUpComing)
                rightButton.classList.add("visibility-hidden");
            await updateControlCirclesMoviesUpComing(index);
        }
    }

    async function updateControlCirclesMoviesUpComing(position) {
        const allCircles = document.querySelectorAll('.itensControlCircleMoviesUpComing');
        allCircles.forEach(circle => {
            circle.classList.remove('bi-circle-fill');
            circle.classList.add('bi-circle');
        });
        const controlCircle = document.getElementById(`circle${position}MoviesUpComing`);
        controlCircle.classList.remove('bi-circle');
        controlCircle.classList.add('bi-circle-fill');
    }

    async function renderControlCirclesMovieTheaterImgs() {
        const 
            div = document.getElementById("controlCirclesMovieTheaterImgs"),
            allMovieTheaterImgs = document.querySelectorAll(".carousel-item-movie-theater-imgs"),
            moviesFrontPage = await getMoviesAmountFront() - 1,
            amountCircles = await getCarouselNextLimitMovieTheaterImgs();
        let circles = ``;

        if(allMovieTheaterImgs.length > moviesFrontPage) { 
            circles = `<button type="button" class="bi-circle-fill itensControlCircleMovieTheaterImgs d-flex justify-content-center align-items-center" id="circle0MovieTheaterImgs"></button>`
            for(let i = 1; i <= amountCircles; i++){
                circles = circles + `<button type="button" class="bi-circle itensControlCircleMovieTheaterImgs d-flex justify-content-center align-items-center" id="circle${i}MovieTheaterImgs"></button>`
            }
        }
        div.innerHTML = circles;

        controlCirclesMovieTheaterImgs();
    }
    renderControlCirclesMovieTheaterImgs();

    carouselButtonLimitMovieTheaterImgs = await getCarouselNextLimitMovieTheaterImgs();

    function controlCirclesMovieTheaterImgs() {
        const allCircles = document.querySelectorAll('.itensControlCircleMovieTheaterImgs');
        allCircles.forEach((circleId, circleIndex) => {circleId.addEventListener('click', () => {
            circleFunction(circleIndex); 
        })});

        async function circleFunction(index) {
            const leftButton = document.getElementById("leftButtonMovieTheaterImgs");
            const rightButton = document.getElementById("rightButtonMovieTheaterImgs");
            scrollPositionMovieTheaterImgs = await getMoviesAmountFront() - 1;
            buttonCountMovieTheaterImgs = index;
            
            scrollPositionMovieTheaterImgs = (cardWidthMovieTheaterImgs*amountCardsMovieTheaterImgsAnimate)*index;
            $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs}, 0);
            
            if(buttonCountMovieTheaterImgs <= 0){ 
                leftButton.classList.add("visibility-hidden");
                rightButton.classList.remove("visibility-hidden");
            }else{ 
                leftButton.classList.remove("visibility-hidden");
                rightButton.classList.remove("visibility-hidden");
            }
            if(buttonCountMovieTheaterImgs >= carouselButtonLimitMovieTheaterImgs)
                rightButton.classList.add("visibility-hidden");
            updateControlCirclesMovieTheaterImgs(index);
        }
    }

    async function updateControlCirclesMovieTheaterImgs(position) {
        const allCircles = document.querySelectorAll('.itensControlCircleMovieTheaterImgs');
        allCircles.forEach(circle => {
            circle.classList.remove('bi-circle-fill');
            circle.classList.add('bi-circle');
        });
        const controlCircle = document.getElementById(`circle${position}MovieTheaterImgs`);
        controlCircle.classList.remove('bi-circle');
        controlCircle.classList.add('bi-circle-fill');
    }

    async function getMoviesAmountFront() {
        const windowWidth = window.innerWidth;
        if (windowWidth > bkXl) return 5;
        if (windowWidth > bkMd) return 4;
        return 3;
    }

    async function getCarouselNextLimitMoviesCurrent() {
        const amountMoviesCurrentFront = await getMoviesAmountFront();
        const moviesCurrentDay = await movieContentInstance.getMoviesDay(daySelected);
        const limitMoviesCurrent = Math.ceil((moviesCurrentDay.length - amountMoviesCurrentFront) / amountCardsMoviesCurrentAnimate);
        return limitMoviesCurrent >= 1 ? limitMoviesCurrent : 0;
    }

    async function getCarouselNextLimitMoviesUpComing() {
        await upComingMoviesInstance;
        const amountMoviesUpComingMovies = await getMoviesAmountFront();
        
        const limitUpComingMovies = Math.ceil((upComingMoviesInstance.length - amountMoviesUpComingMovies) / amountCardsMoviesUpComingAnimate);
        return limitUpComingMovies >= 1 ? limitUpComingMovies : 0;
    }

    async function getCarouselNextLimitMovieTheaterImgs() {
        const amountMovieTheaterImgsFront = await getMoviesAmountFront() - 1;
        const movieTheaterImgs = document.querySelectorAll(".carousel-item-movie-theater-imgs");
        
        const limitMovieTheaterImgs = Math.ceil((movieTheaterImgs.length - amountMovieTheaterImgsFront) / amountCardsMovieTheaterImgsAnimate);
        return limitMovieTheaterImgs >= 1 ? limitMovieTheaterImgs : 0;
    }

    async function responsiveMoviesCurrentLayout(day) {
        const
            moviesCurrentDay = await movieContentInstance.getMoviesDay(day),
            div = document.getElementById('moviesCurrent'),
            leftButton = document.getElementById("leftButtonMoviesCurrent"),
            rightButton = document.getElementById("rightButtonMoviesCurrent"),
            amountMoviesCurrentFront = await getMoviesAmountFront();

        leftButton.classList.add('visibility-hidden');
    
        if(moviesCurrentDay.length <= amountMoviesCurrentFront) { 
            div.classList.add('justify-content-center'); 
            rightButton.classList.add("visibility-hidden");
        }else{  
            div.classList.remove('justify-content-center'); 
            rightButton.classList.remove("visibility-hidden");
        }
    }
    responsiveMoviesCurrentLayout(daySelected);

    async function responsiveMoviesUpComingLayout() {
        await upComingMoviesInstance; 
        const 
            div = document.getElementById('moviesUpComing'),
            leftButton = document.getElementById("leftButtonMoviesUpComing"),
            rightButton = document.getElementById("rightButtonMoviesUpComing"),
            amountMoviesUpComingFront = await getMoviesAmountFront();
            
        leftButton.classList.add('visibility-hidden');
        
        if(upComingMoviesInstance.length <= amountMoviesUpComingFront) { 
            div.classList.add('justify-content-center'); 
            rightButton.classList.add("visibility-hidden");
        }else{  
            div.classList.remove('justify-content-center'); 
            rightButton.classList.remove("visibility-hidden");
        }
    }
    responsiveMoviesUpComingLayout();

    async function responsiveMovieTheaterImgsLayout() { 
        const 
            div = document.getElementById('carouselInnerMovieTheaterImgs'),
            allMovieTheaterImgs = document.querySelectorAll(".carousel-item-movie-theater-imgs"),
            leftButton = document.getElementById("leftButtonMovieTheaterImgs"),
            rightButton = document.getElementById("rightButtonMovieTheaterImgs"),
            movieTheaterImgsFront = await getMoviesAmountFront() - 1;
            
        leftButton.classList.add('visibility-hidden');

        if(allMovieTheaterImgs.length <= movieTheaterImgsFront) { 
            div.classList.add('justify-content-center'); 
            rightButton.classList.add("visibility-hidden");
        }else{  
            div.classList.remove('justify-content-center'); 
            rightButton.classList.remove("visibility-hidden");
        }
    }
    responsiveMovieTheaterImgsLayout();

    async function modalMoviesCurrent(day) {
        const moviesCurrentContent = await movieContentInstance.getMoviesDay(day);
        let scheduleInSectionContent = await movieContentInstance.getScheduleDayInSectionsDiv(day);
        const allMoviesCurrentMd = document.querySelectorAll(".carousel-items-movies-current");
        const allMoviesCurrentSm = document.querySelectorAll(".carousel-items-movies-current-sm");
        const currentDayName = new Schedule().getDayName(day);
        
        allMoviesCurrentMd.forEach((item, index) => {
            item.addEventListener('click', () => {
                renderModalMoviesCurrent(index);
                renderModalMoviesCurrentSchedule(index);
            });
        });
        allMoviesCurrentSm.forEach((item, index) => {
            item.addEventListener('click', () =>{
                renderModalMoviesCurrent(index);
                renderModalMoviesCurrentSchedule(index);
            });
        });

        function renderModalMoviesCurrent(index) {
            document.getElementById("modalImgMoviesCurrent").innerHTML = `<img class="rounded-3 img-fluid" src="${moviesCurrentContent[index].poster_path}">`;
            document.getElementById("modalImgMoviesCurrentSm").innerHTML = `<img class="rounded-3 img-fluid" src="${moviesCurrentContent[index].poster_path}">`;
            document.getElementById("modalTitleMoviesCurrent").textContent = moviesCurrentContent[index].title;
            document.getElementById("modalTitleMoviesCurrentSm").textContent = moviesCurrentContent[index].title;
            document.getElementById("modalDescriptionMoviesCurrent").textContent = moviesCurrentContent[index].overview;
            document.getElementById("modalRuntimeMoviesCurrent").textContent = "runtime: " + moviesCurrentContent[index].runtime;
            document.getElementById("modalReleaseMoviesCurrent").textContent = "release: " + moviesCurrentContent[index].release_date;
        } 

        function renderModalMoviesCurrentSchedule(index){
           
            if(scheduleInSectionContent[index] === undefined){
                scheduleInSectionContent[index] = ["undefined"];
            }
            if(scheduleInSectionContent[index] === undefined){
                scheduleInSectionContent[index] = ["undefined"];
            }
            if(scheduleInSectionContent[index] === undefined){
                scheduleInSectionContent[index] = ["undefined"];
            }
            document.getElementById("modalDayMoviesCurrent").innerHTML = `<p class="">Schedule on: ${currentDayName} ${dateElements[daySelected].textContent}</p>` 
            document.getElementById("modalRoom1").innerHTML = scheduleInSectionContent[index][0];
            document.getElementById("modalRoom2").innerHTML = scheduleInSectionContent[index][1];
            document.getElementById("modalRoom3").innerHTML = scheduleInSectionContent[index][2];
        }
    }

    async function modalMoviesUpComing(){
        const allMoviesUpComingMd = document.querySelectorAll(".carousel-items-movies-upcoming");
        const allMoviesUpComingSm = document.querySelectorAll(".cards-movies-upcoming-sm");
        allMoviesUpComingMd.forEach((item, index) => {
            item.addEventListener('click', () => {
                renderModalMoviesUpComing(index);
            });
        });
        allMoviesUpComingSm.forEach((item, index) => {
            item.addEventListener('click', () => {
                renderModalMoviesUpComing(index);
            });
        });

        function renderModalMoviesUpComing(index) {
            document.getElementById("modalImgMoviesUpComing").innerHTML = `<img class="rounded-3 img-fluid" src="${upComingMoviesInstance[index].poster_path}">`;
            document.getElementById("modalImgMoviesUpComingSm").innerHTML = `<img class="rounded-3 img-fluid" src="${upComingMoviesInstance[index].poster_path}">`;
            document.getElementById("modalTitleMoviesUpComingSm").textContent = upComingMoviesInstance[index].title;
            document.getElementById("modalTitleMoviesUpComing").textContent = upComingMoviesInstance[index].title;
            document.getElementById("modalDescriptionMoviesUpComing").textContent = upComingMoviesInstance[index].overview;
        }
    }

    function modalMovieTheaterImgs(){
        const allMovieTheaterImgs = document.querySelectorAll(".carousel-item-movie-theater-imgs");
        allMovieTheaterImgs.forEach((item, index) => {
            item.addEventListener('click',() => {
                renderModalImgMovieTheaterImgs(index);
                renderModalTitleMovieTheaterImgs(index);
            });
        });

        function renderModalImgMovieTheaterImgs(imgIndex) {
            const ImgsMovieTheaterImgs = document.querySelectorAll(".imgs-movie-theater");
            const modalImgMovieTheaterImgs = document.getElementById("modalImgMovieTheaterImgs");
            const ImgMovieTheaterImgSRC = ImgsMovieTheaterImgs[imgIndex].getAttribute('src');
            
            modalImgMovieTheaterImgs.innerHTML = `<img class="rounded-4" src="${ImgMovieTheaterImgSRC}" style="width: 90%;">`
        }

        function renderModalTitleMovieTheaterImgs(imgIndex) {
            const titlesMovieTheaterImgs = document.querySelectorAll(".title-movie-theater-imgs");
            const titleMovieTheaterImg = titlesMovieTheaterImgs[imgIndex].textContent;
            const modalTitleMovieTheaterImgs = document.getElementById("modalTitleMovieTheaterImgs");
            modalTitleMovieTheaterImgs.textContent = titleMovieTheaterImg;
        }
    }
    modalMovieTheaterImgs();

    const mediaQuerys = [
        window.matchMedia(`(max-width: ${bkXxl}px)`),
        window.matchMedia(`(max-width: ${bkXl}px)`),
        window.matchMedia(`(max-width: ${bkLg}px)`),
        window.matchMedia(`(max-width: ${bkMd}px)`),
        window.matchMedia(`(max-width: ${bkSm}px)`)
    ];

    mediaQuerys.forEach(media => {
        media.addEventListener('change', async () => {
            windowWidth = window.innerWidth;
            renderMoviesCurrent(daySelected);
            renderUpComingMovies();
            updateMovieTheaterImgsMediaQuerie();
            await modalMoviesCurrent(daySelected);
            modalMoviesUpComing();
            carouselButtonLimitMoviesCurrent = await getCarouselNextLimitMoviesCurrent();
        });
    });

    window.matchMedia(`(max-width: ${bkMd}px)`).addEventListener('change', () => {
        renderDaysButtonsContent();
    });

    function addCopyrightDate(){
        const yearCurrent = String(date.getFullYear());
        document.getElementById("dateCopyright").textContent = yearCurrent;
    }
    addCopyrightDate();
});


function register() {
    const
        formRegister = document.getElementById('registerForm'),
        nameRegister = document.getElementById('registerName'),
        lastNameRegister = document.getElementById('registerLastName'),
        ageRegister = document.getElementById('registerAge'),
        emailRegister = document.getElementById('registerEmail'),
        passwordRegister = document.getElementById('registerPassword'),
        passwordConfirmRegister = document.getElementById('registerConfirmPassword'),
        submitRegister = document.getElementById('registerSubmitButton'),
        feedbackRegister = document.getElementById('registerFeedback')

    addValidationListener(nameRegister, "There is an error with the name.");
    addValidationListener(lastNameRegister, "There is an error with the last name.");
    addValidationListener(ageRegister,  "There is an error with the age.");
    addValidationListener(emailRegister, "There is an error with the email.");
    addValidationListener(passwordRegister, "There is an error with the password.");

    function addValidationListener(inputElement, errorMessage) {
        inputElement.addEventListener("blur", function() {
            let feedback = inputElement.nextElementSibling;
            if (inputElement.value == "") {
                inputReset(inputElement);
                feedbackReset(feedback);
            } else if (!inputElement.checkValidity()) {
                inputError(inputElement);
                feedbackError(feedback, errorMessage);
            } else {
                inputOk(inputElement);
                feedbackReset(feedback);
            }
        });
    }

    function passwordChecker() {
        let feedback = passwordConfirmRegister.nextElementSibling;
        if(passwordConfirmRegister.value == ""){
            inputReset(passwordConfirmRegister);
            feedbackReset(passwordConfirmRegister);
        }
        else if(passwordConfirmRegister.value != passwordRegister.value || !passwordConfirmRegister.checkValidity()){ 
            inputError(passwordConfirmRegister);
            feedbackError(feedback, "Passwords do not match.");
        }else{
            inputOk(passwordConfirmRegister);
            feedbackReset(feedback);
        }
    }

    passwordConfirmRegister.addEventListener('input', passwordChecker);
    passwordRegister.addEventListener('input', passwordChecker);

    submitRegister.addEventListener('click', () => {
        if(formRegister.checkValidity() && passwordConfirmRegister.value == passwordRegister.value){
            const registerUser = new UserRegister(nameRegister.value, lastNameRegister.value, ageRegister.value, emailRegister.value, passwordRegister.value); 
            localStorage.setItem('user', JSON.stringify(registerUser));
            location.reload();
        } else {
            feedbackError(feedbackRegister, "All or some areas are incorrect.");
        }
    })
}

function login() {
    const emailLogin = document.getElementById('loginEmail');
    const passwordLogin = document.getElementById('loginPassword');
    const rembemberMeLogin =document.getElementById('loginRemeberMe')
    const feedbackLogin = document.getElementById('loginFeedback');
    const submitLogin = document.getElementById('loginSubmitButton');
    let localStorageUserContent = JSON.parse(localStorage.getItem('user')) || {};

    submitLogin.addEventListener('click', () =>{

        let rememberMe = rembemberMeLogin.checked ? 'true' : 'false';
        localStorage.setItem('rememberMe', rememberMe);

        if (emailLogin.value === localStorageUserContent.email && passwordLogin.value === localStorageUserContent.password) {
            feedbackOk(feedbackLogin, "All right!");
            inputOk(emailLogin);
            inputOk(passwordLogin);
            localStorage.setItem('login', "true");
            setTimeout(()=>{ 
                location.reload();
            }, 1500);
        } else {
            feedbackError(feedbackLogin, "Password or Email error.");
        }
    });
}


function inputOk(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

function inputError(input) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
}

function inputReset(input) {
    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");
}

function feedbackOk(feedback, message) {
    feedback.classList.remove('invalid-feedback');
    feedback.classList.add('valid-feedback');
    feedback.innerHTML = message;
}

function feedbackError(feedback, message) {
    feedback.classList.remove('ok-feedback');
    feedback.classList.add('error-feedback');
    feedback.innerHTML = message;
}

function feedbackReset(feedback) {
    feedback.classList.remove('valid-feedback');
    feedback.classList.remove('invalid-feedback');
    feedback.innerHTML = "";
}






