// create a animateNumbers' jquery plungin for ".myrunlevel"

(function($) {
    $.fn.animateNumbers = function(stop, commas, duration, ease) {
        return this.each(function() {
            var $this = $(this);
            var start = parseInt($this.text().replace(/,/g, ""));
            commas = (commas === undefined) ? true : commas;
            $({ value: start }).animate({ value: stop }, {
                duration: duration == undefined ? 2000 : duration,
                easing: ease == undefined ? "swing" : ease,
                step: function() {
                    $this.text(Math.floor(this.value));
                    if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
                },
                complete: function() {
                    if (parseInt($this.text()) !== stop) {
                        $this.text(stop);
                        if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
                    }
                }
            });
        });
    };
})(jQuery);


$(document).ready(function() {
    $('.detect-result').hide();

    $('.press').click(function(e) {
        e.preventDefault();
        $('.detect-result').slideDown(500);

        
        $('.myrunlevel').animateNumbers(20, true, 1000);
        $('.fa-caret-down').animate({
            marginLeft: '20%'
        }, 1000);
    });

    $('.press').click(function(e) {
        e.preventDefault();
        var connect = $('.press > a').attr('href');
        var position = $(connect).offset().top;
        $('body').stop().animate({
            scrollTop: position
        }, 700);
    });



})
