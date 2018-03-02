// Smooth anchor scrolling

$(function() {

    'use strict';


    $('a[href*="#"]:not([href="#"])').on("click", function(e) {

        e.preventDefault();

        var id     = $(this).attr("href");

        var scroll = $(id).offset().top;


        cache.$body.add(cache.$html).animate({
            scrollTop: scroll
        }, 250);

    });
});





// fallback for no CSS VH unit support

(function(){

    'use strict';


    if(cache.$html.hasClass('no-cssvhunit')){

        var fullHeightSelector = $(".full-vh");


        var fallBackVH = debounce(function(){

            fullHeightSelector.height(cache.$window.outerHeight());

        }, 150);


        if(fullHeightSelector.length > 0){

            fallBackVH();

            $(window).on("resize", function(){
                fallBackVH();
            });
        }

    }

})();





/**
@description
JS version for CSS vh unit.

@example
<div class='js-set-vh' data-vh='70' set-max-height='true'><div>
This will set the element's height to 70% of
the window height. If the data-vh attribute is missing
or 0, the height of 100% of the window will be set.
*/

(function(){

    'use strict';


    var $item = $(".js-set-vh");


    if($item.length){

        var setVh = debounce(function(){

            $item.each(function(index, el){

                var percent = $(el).data("vh") || 100,
                    calc    = $(window).outerHeight() * (percent / 100);


                // Double equals here for a less strict match.
                if($(el).attr("set-max-height") == "true"){
                    $(el).css('max-height', calc);
                } else {
                    $(el).css('height', calc);
                }

            });

        }, 50);


        setVh();

        $(window).on("resize", function(){
            setVh();
        });
    }

}());




// Sugguest Search
//
// (function(){
//
//     'use strict';
//
//
//     var $input = $(".js-search-suggest");
//
//     var $searchTerm = $(".js-search-term");
//
//     var $psuedoPlaceholder = $(".js-psuedo-placeholder");
//
//     var keywords = [];
//
//     var tab = {
//         allowFinish: false,
//         keyword: ""
//     };
//
//
//     $searchTerm.each(function(index, el) {
//         keywords.push($.trim($(el).text().toUpperCase())); // Note were forcing uppercase
//     });
//
//
//     var uniqueKeys = uniqueArray(keywords).sort();
//
//
//     $input.on("blur", function(){
//         $psuedoPlaceholder.html("");
//     })
//     .on("keyup", function(){
//
//         var $self = $(this);
//
//         var count = $self.val().length;
//
//         var transformedVal = $self.val().toUpperCase(); // Note were forcing uppercase
//
//
//         function filterMatches(value){
//             return value.substring(0, count) === transformedVal;
//         }
//
//         var filtered = uniqueKeys.filter(filterMatches);
//
//
//         if(filtered.length && count > 1){
//
//             for (var i = 0, l = filtered.length; i < l; i++) {
//
//                 if(filtered[i].substring(0, count) === transformedVal){
//
//                     // Returned match
//                     $psuedoPlaceholder.html(filtered[i]);
//
//                     tab.allowFinish = true;
//                     tab.keyword = filtered[i];
//
//                     break;
//
//                 }
//
//             }
//
//         } else {
//             $psuedoPlaceholder.html("");
//             tab.allowFinish = false;
//         }
//
//
//         if(cache.$html.hasClass("touchevents") && tab.allowFinish){
//
//             $input.on("click", function(){
//                 $input.val(tab.keyword).trigger('keyup');
//             });
//
//         }
//
//     })
//     .on("keydown", function(e){
//
//         if(tab.allowFinish && (e.which === 9 || e.which === 39)){ // Tab, right arrow key
//
//             e.preventDefault();
//
//             $input.val(tab.keyword);
//
//         }
//
//     });
//
//
// }());




// Add toggle functionality to elements

// Markup: <div class='js-toggle' ui-toggle-target='search'>

// Output: search--toggled class on body

(function(){

    'use strict';


    var settings = {
        click: ".js-toggle",
        target: "data-toggle",
        activeClass: "toggled"
    };


    $(document).on("click", settings.click, function(){

        var $self = $(this);

        if($self.attr("toggle-parent") === "true"){
            $self.parent().toggleClass($self.attr(settings.target) + "--" + settings.activeClass);
        } else if($self.attr("toggle-self") === "true"){
            $self.toggleClass(settings.activeClass);
        } else {
            cache.$html.toggleClass($self.attr(settings.target) + "--" + settings.activeClass);
        }

    });

}());
