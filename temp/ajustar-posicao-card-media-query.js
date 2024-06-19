let mediaQuery = window.matchMedia('(max-width: 1260px)');

    function resetScrollPosition(mq){
        if (mq.matches) { // Verifica se a media query está correspondida
            var scrollPosition = 0;
            $("#moviesCurrent").animate({ scrollRight: scrollPosition }, 0); 
        }
    }

    resetScrollPosition(mediaQuery);

    // Adicionando um ouvinte de evento ao MediaQueryList
mediaQuery.addListener(resetScrollPosition);