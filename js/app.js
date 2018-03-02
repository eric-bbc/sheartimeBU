
/**

*/

/*------------------------------------*\
    #BBJS
\*------------------------------------*/

// @codekit-prepend "_bbjs-app.js";

/*------------------------------------*\
    #PRODUCT
\*------------------------------------*/



function callProductCarousel(){
    var productCarousel = $(".js-product-carousel").owlCarousel({
        nav: true,
        dots: false,
        items: 1,
        loop: true,
        slideBy: 1,
        lazyLoad: true,
        navText: globalSettings.carousels.arrows,
        // Update the zoom buttons index
        onTranslated: function(){
            $(".js-trigger-product-zoom").attr("data-index", $(".js-product-carousel").find(".owl-item.active").index());
        }
    });

    return productCarousel;

}



(function(){

    var owl = callProductCarousel();


    // if(cache.$html.hasClass('no-touchevents') && $(".js-product-carousel").length){

    //     // Change carousel slide with arrow keys
    //     $(document).on("keydown", function(e){

    //         if (e.keyCode === 37){
    //             owl.trigger('prev.owl.carousel');
    //         } else if(e.keyCode === 39){
    //             owl.trigger('next.owl.carousel');
    //         }

    //     })
    //     .on('click', 'body', function(e) {

    //         // Change carousel slide based on left and right click pos
    //         if($(e.target).hasClass("js-click-change")){

    //             var cursorX = e.clientX,
    //                 halfWindowWidth = $(window).width() / 2;

    //             if(cursorX > halfWindowWidth){
    //                 owl.trigger('next.owl.carousel');
    //             } else if (cursorX < halfWindowWidth){
    //                 owl.trigger('prev.owl.carousel');
    //             }

    //         }

    //     });

    // }

})();




function fullProductCarousel(index){
    var $fullProductCarousel = $(".js-full-product-carousel").owlCarousel({
        nav: true,
        dots: false,
        items: 1,
        slideBy: 1,
        lazyLoad: true,
        startPosition: index,
        loop: true,
        navText: ["<img src='/css/imgs/chevron-left.svg'>", "<img src='/css/imgs/chevron-right.svg'>"]
    });


    $(".js-full-product-carousel").find(".owl-lazy").each(function(index, el){
        $(el).attr("src", $(el).attr("data-src"));
    });


    return $fullProductCarousel;
}


(function(){

    var $trigger = $(".js-trigger-product-zoom");

    var $carousel = $(".full-product-carousel");


    $trigger.on("click", function(){
        fullProductCarousel($(this).data("index"));

        $carousel.toggleClass("visible-opaque").toggleClass("hidden-transparent");

    });


     $(document).on('click', '.full-product-carousel .owl-stage-outer', function(event) {
        $('.full-product-carousel').removeClass("visible-opaque").addClass('hidden-transparent');
     });


})();






/*------------------------------------*\
    #SEARCH
\*------------------------------------*/



(function(){

    $trigger = $(".js-search-toggle");


    $trigger.on("click", function(){

        if(cache.$html.hasClass("search-wrap--visible")){

            cache.$html.removeClass("search-wrap--visible").removeClass('main-nav--mobile--toggled');
            $("#search-input-field").blur();

        } else {

            cache.$html.addClass("search-wrap--visible");

            $("#search-input-field").focus();

        }

    });

})();



/**
@name LiveSearch

@description
Search results shown as you type  : )
*/

var LiveSearch = function(){

    'use strict';


    var settings = {
        /**
        @property {object} settings.$input
        A jQuery selector that is bound to the
        input where the user types.
        */
        $input: $(".js-search-input"),

        load: {
            /**
            @property {string} settings.load.keywords
            Leave blank, this will be populated when the
            user types.
            */
            keywords: "",

            /**
            @const
            @property {string} settings.load.URL
            The URL to fetch with AJAX.
            */
            URL: "/search/ajax-fetch",

            /**
            @property {object} settings.load.$container
            A jQuery selector where our results will be dumped.
            */
            $container: $("#js-search-load-container"),

            /**
            @property {object} settings.load.$button
            A jQuery selector that triggers more content
            to load on click.
            */
            $button: $(".js-load-more"),

            /**
            @const
            @property {number} settings.load.LIMIT
            The max number of items to fetch with AJAX.
            */
            LIMIT: 12,

            /**
            @property {number} settings.load.offset
            The offset to fetch more data by.
            This will update when the settings.load.$button
            is clicked. Leave at 0.
            */
            offset: 0,

            /**
            @const
            @property {number} settings.load.MINLENGTH
            The minimum number of characters typed before
            a search is performed.
            */
            MINLENGTH: 2
        }

    };

    var liveSearch = {

        _loadContent: function(appendHTML){


            // AJAX call with our settings.
            $.get(settings.load.URL, {
                keyword: settings.load.keywords,
                limit: settings.load.LIMIT,
                offset: settings.load.offset
            }).done(function(data){

                var returnedLen = $(data).find(".product").length;

                // Check if theres data returned.
                if(returnedLen){

                    // Check the amount of data returned.
                    if(returnedLen < settings.load.LIMIT){
                        // Hide the load more button.
                        settings.load.$button.addClass("hidden");
                    } else {
                        // Show the load more button.
                        settings.load.$button.removeClass("hidden");
                    }


                    // Decide whether to append or replace the content
                    // in the settings.load.$container.
                    if(appendHTML){
                        settings.load.$container.append(data);
                    } else {
                        settings.load.$container.html(data);
                    }

                    // Lazyload the newly loaded images.
                    settings.load.$container.find(".js-lazy").lazyload({
                        container: settings.load.$container
                    });

                } else {
                    // No data returned, so hide the load more button.
                    settings.load.$button.addClass("hidden");
                    $('.js-search-form').effect( "shake" );
                }

            });

        },


        _updateOffset: function(){

            // Update the offset by incrementing by
            // our settings.load.offset property.
            settings.load.offset += settings.load.LIMIT;

        },


        _bindUI: function(){

            // Create a debounce function to debounce
            // the keyup event.
            var search = debounce(function(){

                // There should be at least 2 characters
                // before we search. This is also enforced
                // in the HTML search template.
                if(settings.load.keywords.length >= settings.load.MINLENGTH){
                    liveSearch._loadContent();
                }

            }, 500); // Debounce rate.


            settings.$input.on("keyup", function(){

                // Set the settings.load.keywords property
                // to the current value of the input.
                settings.load.keywords = $(this).val();

                // Reset the offset for the new keywords.
                settings.load.offset = 0;

                // Call our debounced search function.
                search();

            });


            // Load more button
            settings.load.$button.on("click", function(){

                // Update the offset.
                liveSearch._updateOffset();

                // Load content, set the appendHTML argument to true
                // to append the new data rather than replace.
                liveSearch._loadContent(true);

            });

        },


        init: function(){
            liveSearch._bindUI();
        }

    };

    return liveSearch;

}().init();




/**
@name The Transporter
No not the movie.

@description
"Transports" you to the page you came from.
Inspired by code and theory's site.
*/

var transporter = (function(document, window){

    'use strict';


    var settings = {

        // The data we will fetch with AJAX
        transportTo: document.referrer + " #transport-fetch",

        // Array of keywords in the URL that we will
        // accept as transport data. If the URL doesnt't
        // contain a keyword here, no transporting.
        // By default, the homepage is in this list.
        acceptableReferrers: ["archive", "search"],

        selectors: {
            // The selector where our AJAX data will be dumped.
            $transportContainer: $(".js-transport-container"),

            // The element that has overlay like effect.
            // We cacluate this element's offset bottom.
            $transporterOverlay: $(".js-transporter-overlay"),

            // The gap to create a space between content.
            // This is solely for UI. Not needed for transporter.
            $transporterGap: $(".js-transporter-gap")
        },

        // Media query that we use to determine if we
        // should perform certain actions.
        MQ: window.matchMedia("(min-width: 801px)").matches

    };


    function bindUI(){

        $(window).on("resize", function(){
            recalc();
        })
        .on("scroll", function(){
            updateStyles();
        });

    }


    /**
    @name isAcceptableTransport
    @access private
    @description
    This function checks if the document referrer
    is on our own host.
    @returns {boolean}
    */
    function isAcceptableTransport(){

        // Remove protocol and slashes for a more precise match.
        // Were trying to compare the location host with the document referrer.
        var handledRef = document.referrer.replace(/\//g, "").replace(location.protocol, "");

        for (var i = 0, l = settings.acceptableReferrers.length; i < l; i++){

            if((document.referrer.indexOf(settings.acceptableReferrers[i]) !== -1 || handledRef === location.host) && document.referrer.indexOf(location.protocol + "//" + location.host) === 0){
                return true;
            } else {
                return false;
            }

        }

    }


    /**
    @name recalc
    @access private
    @description
    This function is called on a window resize event.
    It's needed to recalculate the window height.
    */
    function recalc(){

        updateStyles();

        // Remove the original scroll event.
        // and attach a new scroll event.
        $(window).off("scroll")
        .on("scroll", function(){
            updateStyles();
        });

    }


    /**
    @name transport
    @access private
    @description
    This function AJAX loads data into a container.
    */
    function transport(){

        settings.selectors.$transportContainer.load(settings.transportTo, function(response, status) {

            if(status === "success"){
                // Lazyload the newly loaded images.
                $(document).find(".js-lazy").lazyload();
            }

        });

    }


    /**
    @name updateStyles
    @access private
    @description
    This function is solely for UI.
    It adds classes and alters CSS based on the window's
    scrollTop and height.
    */
    function updateStyles(){

        var s = settings.selectors;

        if(s.$transporterOverlay.outerHeight() - $(window).scrollTop() > 0){

            s.$transporterGap.css("height", $(window).height());
            s.$transportContainer.addClass('transporting');

        } else if(s.$transporterOverlay.outerHeight() - $(window).scrollTop() < 0){

            s.$transporterGap.css("height", 0);
            s.$transportContainer.removeClass('transporting');

        }

    }


    /**
    @name init
    @access public
    @description
    This function calls our functions needed
    to initialize the transporter.
    */
    function init(){

        if(isAcceptableTransport()){

            if(settings.MQ){
                bindUI();
                updateStyles();
            }

            transport();

        } else {
            settings.selectors.$transporterOverlay.addClass('no-transport-data');
        }

    }

    return{
        init: init
    };

})(document, window).init();





/*------------------------------------*\
    #FORMS
\*------------------------------------*/



(function(){

    // We Buy Form
    $("#we-buy-form").on("submit", function(e){

        var $self = $(this);

        var fields = $self.find("[data-handle-field='true']");

        var expectedValidFields = fields.length,
            validFields = 0;

        var file = {
            field: $self.find("input[type='file']")[0],
            isValid: {
                length: false,
                type: false
            },
            maxLength: 5,
            validExtensions: ["image/jpeg", "image/png"],
        };

        var error = {
            field: $(".js-form-errors"),
            messages: {
                "type": "Please upload an image with a PNG or JPG extension.",
                "length": "The max file upload limit is " + file.maxLength + "."
            }
        };


        // Validate standard text fields

        fields.each(function(index, el){

            if($(el).val().length){
                validFields += 1;
            }

        });


        // Validate form field

        for (var i = 0, l = file.field.files.length; i < l; i++) {

            // Check for a valid file extension

            if(file.validExtensions.indexOf(file.field.files[i].type) !== -1){

                file.isValid.type = true;
                error.field.addClass("hidden");

            } else {

                file.isValid.type = false;
                error.field.removeClass("hidden").text(error.messages.type);

            }

        }


        if(file.field.files.length <= file.maxLength){

            error.field.addClass("hidden");
            file.isValid.length = true;

        } else {

            file.isValid.length = false;
            error.field.removeClass("hidden").text(error.messages.length);

        }


        // Check for errors
        // If not errors just submit form regularly.

        if(expectedValidFields !== validFields || file.isValid.length === false || file.isValid.type === false){
            e.preventDefault();
        }

    });


    // Contact Form
    Forms.init({
        form: "#contact-form",
        ajax: true,
        resetOnSuccess: true,
        success: function(){
            $("#contact-form").addClass('hidden');
            $(".success-message").removeClass('hidden');
        }
    });

    Forms.init({
        form: "#we-buy-form",
        ajax: true,
        resetOnSuccess: true,
        success: function(){
            $('button').text('Thank You!')
            $('#watch-upload').removeClass('uploaded')
        }
    });




})();




(function(){


    var feed = new Instafeed({
        get: "user",
        accessToken: "15884407.1677ed0.d2c88d0938034b5cba0f42c5dd9e7078",
        userId: 15884407,
        resolution: 'standard_resolution',
        sortBy: 'most-recent',
        limit: 60,
        template: '<div class="instafeed-item"><a target="_blank" href="{{link}}"><img src="{{image}}"></a></div>'
    });
    feed.run();


})();


watchUpload()
contactUpload()

function watchUpload() {

  var $input = $('#watch-upload')

  $input.on('change', function(){
      if ( this.files.length > 0 ){
        $input.addClass('uploaded')
      }

  })
}

function contactUpload() {
  var $input = $('#contact-upload')

  $input.on('change', function(){
      if ( this.files.length > 0 ){
        $input.addClass('uploaded')
      }

  })
}
