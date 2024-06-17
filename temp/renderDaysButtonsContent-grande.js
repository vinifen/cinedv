function renderDaysButtonsContent(){
    if(windowWidth > 800){
        daysButtonsElements[0].innerHTML = "SUNDAY";
        daysButtonsElements[1].innerHTML = "MONDAY";
        daysButtonsElements[2].innerHTML = "TUESDAY";
        daysButtonsElements[3].innerHTML = "WEDNESDAY";
        daysButtonsElements[4].innerHTML = "THURSDAY";
        daysButtonsElements[5].innerHTML = "FRIDAY";
        daysButtonsElements[6].innerHTML = "SATURDAY";
    }else if(windowWidth < 800){
        daysButtonsElements[0].innerHTML = "SUN";
        daysButtonsElements[1].innerHTML = "MON";
        daysButtonsElements[2].innerHTML = "TUE";
        daysButtonsElements[3].innerHTML = "WED";
        daysButtonsElements[4].innerHTML = "THU";
        daysButtonsElements[5].innerHTML = "FRI";
        daysButtonsElements[6].innerHTML = "SAT";
    }
}

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
