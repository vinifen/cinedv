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
    const modalAuthentication = document.getElementById('authModal');
    const textLogin = document.getElementById('loginText');

    function reloadCounter() {
        // Verifica se há um valor salvo no localStorage
        let counter = localStorage.getItem('counterReload');
    
        // Se não houver valor, inicializa com 0
        if (counter === null) {
            counter = 0;
        } else {
            // Converte o valor salvo para número e verifica se é um número válido
            counter = parseInt(counter, 10);
            if (isNaN(counter)) {
                counter = 0;
            }
        }
    
        // Incrementa o counter
        counter++;
    
        // Salva o novo valor no localStorage
        localStorage.setItem('counterReload', counter);
    
        // Debug: Exibe o valor atual do contador no console
        console.log('Contador:', counter);
    }

    if(localStorage.getItem('login') === "true"){  
        reloadCounter();
        textLogin.innerHTML = localStorageUserContent.name;
        modalAuthentication.classList.add('display-none');
        offLogin.classList.add('display-none');
        onLogin.classList.remove('display.none');
    }else{
        localStorage.removeItem('counterReload');
        offLogin.classList.remove('display-none');
        onLogin.classList.add('display-none');
        modalAuthentication.classList.remove('display-none');
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

//carregar cards
document.addEventListener('DOMContentLoaded', async () => { 
    await moviesApiSelected;
    const upComingMoviesInstance = await upComingMovies;
    const movieContentInstance = new MovieContent();
    let scrollPosition = 0;
    let scrollPositionUpComing = 0;
    let scrollPositionMovieTheaterImgs = 0;
    let daySelectedUpComing = 0;
    let windowWidth = window.innerWidth;
    let cardWidthMoviesCurrent = 0;
    let cardWidthMoviesUpComing = 0;
    let cardWidthMovieTheaterImgs = $(".carousel-item-movie-theater-imgs").width();
    let carouselWidthMovieTheaterImgs = $("#carouselInnerMovieTheaterImgs")[0].scrollWidth;
    let carouselWidthUpComing = 0;
    let carouselWidth = 0;
    
    const
        date = new Date(),
        currentDay = 4,
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
    let scrollLimitMoviesCurrent = await movieContentInstance.getMoviesDay(daySelected);
    let scrollLimit = scrollLimitMoviesCurrent.length + 1;
    
    function renderDaysButtonsContent() {
        const daysFull = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const daysShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const days = windowWidth > 580 ? daysFull : daysShort;
    
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
        
        const moviesCurrentDayContent = await movieContentInstance.getMoviesDay(day);
        scrollLimit = await moviesCurrentDayContent.length + 1;
        console.log(scrollLimit, "sapo");
        const schedule = await movieContentInstance.getScheduleDayDiv(day);

        const divMd = document.getElementById('moviesCurrent');
        const divSm = document.getElementById('moviesCurrentSm');

        if (moviesCurrentDayContent.length === 0) {
            divSm.innerHTML = `<p> We are not open in this day</p>`;
            divMd.innerHTML = `<p class="carousel-items-movies-current"> We are not open in this day</p>`;
        }else{ 
            divSm.innerHTML = moviesCurrentDayContent.map((_, index) => renderMoviesCardsSm(moviesCurrentDayContent, index, schedule)).join('');
            divMd.innerHTML = moviesCurrentDayContent.map((_, index) => renderMoviesCardsMd(moviesCurrentDayContent, index, schedule)).join('');
            
            cardWidthMoviesCurrent = $(".carousel-items-movies-current").width();
            $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 0);   
            setTimeout(() => {
                carouselWidth = $("#moviesCurrent")[0].scrollWidth; 
                console.log(carouselWidth);
            }, 0);
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
        `<div class="carousel-items-movies-current d-flex justify-content-center carousel-item ${carouselActive}">
            <div class="card cards-movies-current-md bg-primary text-white">
                <div class="movies-title-runtime d-flex flex-column justify-content-between">
                    <h4 class="mx-2 mt-1 movie-title">${movie[i].title}</h4>
                    <p class="timeline mb-2 text-bottom">${movie[i].runtime}</p>
                </div>
                <div class="mb-2">  
                    <img class="imagem rounded rounded-3" class="img-fluid" src="${movie[i].poster_path}" alt="">
                </div>
                <div class="container schedule-container mb-2 bg-secondary rounded rounded-3">
                        <div class="row d-flex justify-content-center align-items-center movie-schedule-md">
                            ${schedule[i]}
                        </div>
                        <div>
                            <a href="" class="view-more text-center text-white">view more</a>
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
            schedule[i] = [`<p class="no-time">There are no more schedules today for this film</p>`];
        }
        const cardSm =
        `<div class="mb-3 rounded rounded-3 bg-primary text-center text-white d-flex justify-content-around align-items-center">
            <div class="" style="width: 40%;">  
                <img class=" m-2 imagem rounded rounded-3" class="img-fluid" src="${movie[i].poster_path}" alt="" style="width: 90%;">
            </div>
            <div class="" style="width: 60%">
                <h4 class="">${movie[i].title}</h4>
                <p class="timeline my-1">${movie[i].runtime}</p>
                <div class="container schedule-container mb-2 bg-secondary rounded rounded-3">
                        <div class="row d-flex justify-content-center align-items-center movie-schedule-md">
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

    async function renderUpComingMovies(){
        const divUpComingMovies = document.getElementById('moviesUpComing');
        
        let cardHTMLupcomingMovies = '';
        for(let i = 0; i < upComingMoviesInstance.length; i++){ 
            let carouselActive = "active";
            if(i != 0)
                carouselActive = "";

            cardHTMLupcomingMovies = cardHTMLupcomingMovies +
            `<div class="carousel-items-movies-upcoming carousel-item ${carouselActive} d-flex align-items-center justify-content-center">
                <div class="card-movies-upcoming">
                        <img class="imagem2 img-fluid rounded rounded-3" src="${upComingMoviesInstance[i].poster_path}" alt="">
                </div>
            </div>`;
        }
        divUpComingMovies.innerHTML = cardHTMLupcomingMovies;
        cardWidthMoviesUpComing = $(".carousel-items-movies-upcoming").width();
        carouselWidthUpComing = $("#moviesUpComing")[0].scrollWidth;
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
            `<div class="cards-movies-upcoming-sm my-2 mx-1 ${carouselActive} d-flex align-items-center justify-content-center">
                <div class="card-movies-upcoming">
                        <img class="imagem2 img-fluid rounded rounded-3" src="${upComingMoviesInstance[i].poster_path}" alt="">
                </div>
            </div>`;
        }
        divUpComingMovies.innerHTML = cardHTMLupcomingMovies;
    }
    renderUpComingMoviesSm();
    
    async function initCarouselMoviesCurrent() {
        await movieContentInstance.getMoviesDay(daySelected);
        
        
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");
        
        $("#rightButtonMoviesCurrent").on("click", function () {
            scrollLimit = scrollLimitMoviesCurrent.length + 1;
            leftButton.classList.remove('display-none');
            console.log(scrollLimit, "sc");
            console.log(scrollPosition, carouselWidth, cardWidthMoviesCurrent, scrollLimit);
            if (scrollPosition < (carouselWidth - cardWidthMoviesCurrent * scrollLimit)){ 
                scrollPosition += cardWidthMoviesCurrent*2;  
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 400); 
                if (scrollPosition >= (carouselWidth - cardWidthMoviesCurrent * scrollLimit)){ 
                    rightButton.classList.add('display-none');
                }
            }
        });

        $("#leftButtonMoviesCurrent").on("click", function () {
            rightButton.classList.remove('display-none');
            if(scrollPosition > 0){ 
                scrollPosition -= cardWidthMoviesCurrent*2;
                $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 400);
                
                leftButton.classList.remove('display-none');
            }else{
                
                leftButton.classList.add('display-none');
            }
            if(scrollPosition <= 0){
                leftButton.classList.add('display-none')
            }
        });
    }
    initCarouselMoviesCurrent();
    
    async function initCarouselMoviesUpComing(){
        await upComingMoviesInstance;
        const leftButton = document.getElementById("leftButtonMoviesUpComing");
        const rightButton = document.getElementById("rightButtonMoviesUpComing");
        
        const scrollLimitUpComing = upComingMoviesInstance.length - 1;
        console.log(scrollLimitUpComing);
        
        $("#rightButtonMoviesUpComing").on("click", function () {
            
            console.log(scrollPositionUpComing, carouselWidthUpComing, cardWidthMoviesUpComing, scrollLimitUpComing);
            if (scrollPositionUpComing < (carouselWidthUpComing - cardWidthMoviesUpComing * scrollLimitUpComing)){ 
                leftButton.classList.remove('display-none');

                scrollPositionUpComing += cardWidthMoviesUpComing;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 400);
                console.log(scrollPositionUpComing);
                if (scrollPositionUpComing >= (carouselWidthUpComing - cardWidthMoviesUpComing * scrollLimitUpComing)){ 
                    rightButton.classList.add('display-none');
                }
            }
        });

        $("#leftButtonMoviesUpComing").on("click", function () {
            rightButton.classList.remove('display-none');
            if(scrollPositionUpComing > 0){ 
                scrollPositionUpComing -= cardWidthMoviesUpComing;
                $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 400);
                leftButton.classList.remove('display-none');
            }else{
                leftButton.classList.add('display-none');
            }
            if(scrollPositionUpComing <= 0){ 
                leftButton.classList.add('display-none');
            }
        });
        leftButton.classList.add('display-none');
    }
    initCarouselMoviesUpComing();

    async function initCarouselMovieTheaterImgs() {
        const leftButton = document.getElementById("leftButtonMovieTheaterImgs");
        const rightButton = document.getElementById("rightButtonMovieTheaterImgs");
        
        const cardsNumberMovieTheaterImgs = document.querySelectorAll('.carousel-item-movie-theater-imgs').length - 1;
        
        
        console.log("antes clique direita", scrollPositionMovieTheaterImgs);
        $("#rightButtonMovieTheaterImgs").on("click", function () {
            if (scrollPositionMovieTheaterImgs < (carouselWidthMovieTheaterImgs - cardWidthMovieTheaterImgs * cardsNumberMovieTheaterImgs)){ 
                scrollPositionMovieTheaterImgs += cardWidthMovieTheaterImgs;
                console.log("depois clique direita", scrollPositionMovieTheaterImgs, cardWidthMovieTheaterImgs);
                leftButton.classList.remove('display-none');
                $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 400);
                if (scrollPositionMovieTheaterImgs >= (carouselWidthMovieTheaterImgs - cardWidthMovieTheaterImgs * 5)){ 
                    rightButton.classList.add('display-none');
                }
            }
        });
        console.log("antes clique esquerda", scrollPositionMovieTheaterImgs);
        $("#leftButtonMovieTheaterImgs").on("click", function () {
            scrollPositionMovieTheaterImgs -= cardWidthMovieTheaterImgs;
            console.log("depois clique esquerda", scrollPositionMovieTheaterImgs);
            if (scrollPositionMovieTheaterImgs <= 0) {
                leftButton.classList.add('display-none');
            }
            rightButton.classList.remove('display-none');
            $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 400);
            if(leftButton <= 0){
                leftButton.classList.add('display-none')
            }
        });
    
    }
    initCarouselMovieTheaterImgs();

    async function responsiveCarouselLayout(day){
        
        const div = document.getElementById('moviesCurrent');
        const divSm = document.getElementById('moviesCurrentSm');
        const divCarouselMd = document.getElementById('carouselMoviesCurrent');
        const divMovieTheaterImgs = document.getElementById('carouselInnerMovieTheaterImgs');
        const divUpComingMovies = document.getElementById('moviesUpComing');
        const leftButton = document.getElementById("leftButtonMoviesCurrent");
        const rightButton = document.getElementById("rightButtonMoviesCurrent");
        const leftButtonUpComing = document.getElementById("leftButtonMoviesUpComing");
        const rightButtonUpComing = document.getElementById("rightButtonMoviesUpComing");
        const leftButtonMovieTheaterImgs = document.getElementById("leftButtonMovieTheaterImgs");
        const rightButtonMovieTheaterImgs = document.getElementById("rightButtonMovieTheaterImgs");
        const cardsNumberMovieTheaterImgs = document.querySelectorAll('.carousel-item-movie-theater-imgs');
        const movies = await movieContentInstance.getMoviesDay(day);
        leftButton.classList.add('display-none');
        leftButtonUpComing.classList.add('display-none');
        leftButtonMovieTheaterImgs.classList.add('display-none');
        let moviesFrontPage = 0;
        
        if(windowWidth > 1280)
            moviesFrontPage = 5;
        else if(windowWidth <= 1280 && windowWidth >= 819)
            moviesFrontPage = 4;
        else if((windowWidth <= 818 && windowWidth >= 450))
            moviesFrontPage = 3;
        else 
            moviesFrontPage = 0;

        if(movies.length <= moviesFrontPage){
            div.classList.add('justify-content-center'); 
            rightButton.classList.add('display-none');
            leftButton.classList.add('display-none');
        }else{
            div.classList.remove('justify-content-center'); 
            rightButton.classList.remove('display-none');
        }
        
        if(upComingMoviesInstance.length <= moviesFrontPage){
            divUpComingMovies.classList.add('justify-content-center'); 
            rightButtonUpComing.classList.add('display-none');
            leftButtonUpComing.classList.add('display-none');
        }else{
            divUpComingMovies.classList.remove('justify-content-center'); 
            rightButtonUpComing.classList.remove('display-none');
        }
        console.log(cardsNumberMovieTheaterImgs.length, moviesFrontPage);
        if(cardsNumberMovieTheaterImgs.length <= moviesFrontPage){
            divMovieTheaterImgs.classList.add('justify-content-center');
            rightButtonMovieTheaterImgs.classList.add('display-none');
            leftButtonMovieTheaterImgs.classList.add('display-none');
        }else{
            divMovieTheaterImgs.classList.remove('justify-content-center'); 
            rightButtonMovieTheaterImgs.classList.remove('display-none');
        }
    }
    responsiveCarouselLayout(currentDay);
    
    async function resizeWindow(){
        cardWidthMoviesCurrent = $(".carousel-items-movies-current").width();
        cardWidthMoviesUpComing = $(".carousel-items-movies-upcoming").width();
        cardWidthMovieTheaterImgs = $(".carousel-item-movie-theater-imgs").width();
        carouselWidth = $("#moviesCurrent")[0].scrollWidth;
        carouselWidthMovieTheaterImgs = $("#carouselInnerMovieTheaterImgs")[0].scrollWidth;
        carouselWidthUpComing = $("#moviesUpComing")[0].scrollWidth;
        windowWidth = window.innerWidth;
        scrollPosition = 0;
            scrollPositionUpComing = 0;
            scrollPositionMovieTheaterImgs = 0;
            $("#moviesCurrent").animate({ scrollLeft: scrollPosition }, 0); 
            $("#moviesUpComing").animate({ scrollLeft: scrollPositionUpComing }, 0); 
            $("#carouselInnerMovieTheaterImgs").animate({ scrollLeft: scrollPositionMovieTheaterImgs }, 0);
        responsiveCarouselLayout(daySelected);
        if (windowWidth < 580 || windowWidth > 580 && windowWidth < 1019) {
            renderDaysButtonsContent();
        }
    }
    
    window.addEventListener('resize', resizeWindow);

    
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
        submitRegister = document.getElementById('registerSubmitButton');

    addValidationListener(nameRegister, "Name looks good!", "There is an error with the name.");
    addValidationListener(lastNameRegister, "Last name looks good!", "There is an error with the last name.");
    addValidationListener(ageRegister, "Age looks good!", "There is an error with the age.");
    addValidationListener(emailRegister, "Email looks good!", "There is an error with the email.");
    addValidationListener(passwordRegister, "Password looks good!", "There is an error with the password.");

    function addValidationListener(inputElement, successMessage, errorMessage) {
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
                feedbackOk(feedback, successMessage);
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
        } else {
            inputOk(passwordConfirmRegister);
            feedbackOk(feedback, "Passwords match!");
        }
    }

    passwordConfirmRegister.addEventListener('input', passwordChecker);
    passwordRegister.addEventListener('input', passwordChecker);

    submitRegister.addEventListener('click', () =>{
        if(formRegister.checkValidity() && passwordConfirmRegister.value == passwordRegister.value){
            const registerUser = new UserRegister(nameRegister.value, lastNameRegister.value, ageRegister.value, emailRegister.value, passwordRegister.value); 
            localStorage.setItem('user', JSON.stringify(registerUser));
            location.reload();
        }
    })
}

function login() {
    const formLogin = document.getElementById('loginForm');
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
            inputError(emailLogin);
            inputError(passwordLogin);
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






