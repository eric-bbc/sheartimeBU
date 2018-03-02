/*------------------------------------*\
    #DEBOUNCE
\*------------------------------------*/



// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.


// https://davidwalsh.name/javascript-debounce-function


// Call:

// var myFunction = debounce(function(){
    // Do something
// }, 150);

// myFunction();


function debounce(func, wait, immediate) {

    'use strict';


    var timeout;

    return function() {

        var context = this, args = arguments;

        var later = function() {
            timeout = null;
            if (!immediate){
                func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow){
            func.apply(context, args);
        }
    };
}





/*------------------------------------*\
    #UNIQUE ARRAY
\*------------------------------------*/



// Call:

// var myArray = ["fuck", "fuck", "shit"];
// var uniqueArray = uniqueArray(myArray);

// Returns ["fuck", "shit"]


function uniqueArray(array){

    'use strict';


    return array.filter(function(el, index, arr) {
        return index === arr.indexOf(el);
    });

}




/*------------------------------------*\
    #FORMS
\*------------------------------------*/



// Check form for empty fields.
// Submit form via AJAX or standard submit
// Adds error and success classes to inputs


// Markup field:
// <input type='text' data-handle-field='true'>


// Call:

// Forms.init({
//     form: "#customer_login",
//     ajax: false,
//     resetOnSuccess: true, (AJAX only)
//     success: function(){
//          console.log("ayeee");
//     }
// });


var Forms = function(){

    'use strict';


    var settings = {
        enabled: true,
        inputSelector: "handle-field"
    };


    var forms = {

        _submit: function(options){


            var form = $(options.form);

            form.on('submit', function(e){

                e.preventDefault();

                forms._checkFields(options);

                $.ajax({
                    type    : form.attr("method"),
                    url     : form.attr("action"),
                    data    : form.serialize(),
                    dataType: 'json'

                }).done(function(data){

                    if(data.success === true){
                        forms._onSuccess(options);
                    } else {
                        forms._onError(options);
                    }

                });

            });
            
        },


        _onSuccess: function(options){ // Only called on AJAX forms

            var form = $(options.form);

            if(options.resetOnSuccess === true){
                form[0].reset();
            }

            if(typeof(options.success) === "function"){
                options.success();
            }

        },


        _onError: function(options){

            if(typeof(options.error) === "function"){
                options.error();
            }

        },


        _checkFields: function(options){

            var fields = {};

            fields.inputs = $(options.form).find("[" + settings.inputSelector + "]");

            fields.validArray = [];

            
            fields.inputs.each(function(index, el){

                // if field is blank

                if($(el).val().length === 0){
                    $(this).addClass('input--error');
                } else {
                    $(this).removeClass('input--error').addClass('input--success');
                    fields.validArray.push($(this));
                }

            });

            return fields;

        },


        _handle: function(options){

            $(options.form).on('submit', function(e){

                forms._checkFields(options);

                if(forms._checkFields(options).validArray.length !== forms._checkFields(options).inputs.length){ // form error
                    e.preventDefault();
                    forms._onError(options);
                }

            });
        },


        init: function(options){

            this.options = options;

            if(typeof this.options.form === "undefined" || settings.enabled === false){
                console.log("Notice: Forms.init() requires a form selector or Forms() is disabled.");
            } else {

                if(options.ajax === true){
                    forms._submit(this.options);
                } else {
                    forms._handle(this.options);
                }

            }
        }

    };

    return forms;

}();



/**
@name animateIn

@description
Perform actions to elements when images in a container
or the window is loaded. May require imagesLoaded.js (Built in to BBJS):
http://imagesloaded.desandro.com/

@example
<div class="js-animate" animate-class="animated  fadeInUp" animate-offset="1.5">I'll fadeUp soon</div>
*/

var animateIn = function(){

    'use strict';


    var settings = {

        // @property {object} settings.imagesLoadedContainer
        // Set to "window" to use window.load() to wait for page load.
        imagesLoadedContainer: cache.$main,

        item: {
            // @property {string} settings.item.selector - the element
            // that will be animated.
            selector: ".js-animate",

            // @property {string} settings.item.class - the class that will be applied
            // to item.selector once images have loaded.
            class: "animate-class",

            // @property {number} settings.item.offset - the amount of time to wait
            // after images have loaded to apply the class to item.selector.
            offset: "animate-offset"
        }

    };


    function _run(){

        $(settings.imagesLoadedContainer).find($(settings.item.selector).each(function(index, el){

            // Convert offset from MS to S.
            var offset = ($(el).attr(settings.item.offset) * 1000).toFixed(0) || 0;
                    
            setTimeout(function(){
                $(el).addClass($(el).attr(settings.item.class));
            }, offset);

        }));

    }


    function init(){

        if(settings.imagesLoadedContainer === window){
            
            cache.$window.on("load", function(){
                _run();
            });

        } else {

            $(settings.imagesLoadedContainer).imagesLoaded(function(){
                _run();
            });

        }

    }


    return{
        init: init
    };

}();
