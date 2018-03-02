

// Andrew Puig
// puigandrew.com
// andrew.lpuig@gmail.com


// VERSION: 1.2


/*
*
* CONTENTS
*
* /VENDOR..........................All vendor files that we use.
*
* PARTIALS.........................A rollup of our _partials & call to our partial's functions
*
* PLUGINS..........................Our vendor related functions and setup.
*
* FUNCTIONS........................A list of our custom functions that we will call
*
* UTILITIES........................Plug and play code.
*
* SHOPIFY UTILITIES................Plug and play code, intended for Shopify.
*
*/





/*------------------------------------*\
    #SETTINGS
\*------------------------------------*/



// Configure your BBJS a bit

var globalSettings = {

    lazyload: {
        enable: true,
        options: {
            threshold: 200
        }
    },

    fastclick: true,

    // Owl Carousel
    carousels: {
        enable: false,
        arrows: ["<img src='/css/imgs/chevron-left.svg'>", "<img src='/css/imgs/chevron-right.svg'>"]
    }

};



// Create an object for caching of common variables

var cache = {

    $html:   $("html"),

    $body:   $("body"),

    $main:   $(".js-main"),

    $header: $(".js-header"),

    $footer: $(".js-footer"),

    $doc:    $(document),

    $window: $(window)

};




/*------------------------------------*\
    #TOUCH-TEST
\*------------------------------------*/



// Returns true only on mobile touch not desktop touch
// Requires touch support in modernizr

function touchTest(){

    'use strict';

    return cache.$html.hasClass("touchevents") && (cache.$html.hasClass('desktop') || cache.$html.hasClass('no-touchevents'));
}




/*------------------------------------*\
    #VENDORS
\*------------------------------------*/

// @codekit-prepend "vendor/jquery-2.2.1.min.js";

// @codekit-prepend "vendor/jquery-ui.min.js";

// @codekit-prepend "vendor/fastclick-min.js";

// @codekit-prepend "vendor/lazyload.js";

// @codekit-prepend "vendor/owl.carousel.min.js";

// @codekit-prepend "vendor/device.js";

// @codekit-prepend "vendor/images-loaded.js";

// @codekit-prepend "vendor/instafeed.min.js";


// @codekit-prepend "vendor/jquery.fitvids.js";





/*------------------------------------*\
    #PARTIALS
\*------------------------------------*/



// @codekit-append "_bbjs-partials.js";


