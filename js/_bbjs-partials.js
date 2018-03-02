

/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-prepend "_bbjs-plugins.js";

// @codekit-prepend "_bbjs-functions.js";

// @codekit-prepend "_bbjs-utilities.js";




/*------------------------------------*\
    #FUNCTIONS (FROM ABOVE)
\*------------------------------------*/



(function(){

    animateIn.init();


    if(globalSettings.lazyload.enable){
        callLazy();
    }
    

    if(globalSettings.carousels.enable){
        callCarousel();
    }

}());
