var app = (function(document, $) {

    'use strict';
    var docElem = document.documentElement,

        _userAgentInit = function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        },
        _init = function() {
            $(document).foundation();
            _userAgentInit();

            var height = $(window).height();
            var heightDesired = height - 300;
            $('#first').height(height);
            $('#second').height(heightDesired);
            $('#second .bg').height(heightDesired);
            $('#third').height(heightDesired);
            $('#fourth').height(heightDesired);
            $('#fifth').height(height);

            //.parallax(xPosition, speedFactor, outerHeight) options:
            //xPosition - Horizontal position of the element
            //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
            //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport

            $('#first').parallax('50%', 0, 0.1);
            $('#second').parallax('50%', 0, 0.1);
            $('.bg').parallax('100%', 0, 0.4, true);
            $('#third').parallax('50%', 0, 0.3);
            $('#fourth').parallax('50%', 0, 0.3);
            $('#fifth').parallax('50%', 0, 0.3);

            $('#main-title').localScroll({hash:true, offset: 10, duration:1200, easing: 'easeInExpo'});
            $('#main-menu').localScroll({hash:true, offset: -44, duration:1000, easing: 'easeInExpo'});

            $('#main-menu a').on('click', function(){
                var elementID = $(this).attr('href');
                var pos = $(elementID).offset().top - 44;
                $.scrollTo(pos);
                return false;
            });

            $('#first, #second, #third, #fourth, #fifth').bind('inview', function (event, visible) {
                if (visible === true) {
                    $(this).addClass('inview');
                } else {
                    $(this).removeClass('inview');
                }
            });
        };

    return {
        init: _init
    };

})(document, jQuery);

(function() {

    'use strict';
    app.init();

})();
