

/*------------------------------------*\
    #PLUGINS
\*------------------------------------*/



(function(){

    'use strict';


    // Fast Click
    if(globalSettings.fastclick){
        FastClick.attach(document.body);
    }



    




})();

$(".js-fitvids").fitVids();



// Lazy Load

function callLazy(options){

    'use strict';

    cache.$main.imagesLoaded(function(){

        $(".js-lazy").lazyload(typeof(options) === "undefined" ? globalSettings.lazyload.options : options);
        
    });
}





// General Carousel

function callCarousel(){

    'use strict';


    var carousel = $(".js-carousel").owlCarousel({
        items: 1,
        slideBy: 1,
        loop: true,
        mouseDrag: true,
        dots: false,
        nav: true,
        lazyLoad: true,
        responsiveRefreshRate: 0,
        navText: globalSettings.carousels.arrows,
        smartSpeed: 150
    });

    return carousel;

}
