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

    $('.form').submit(function(event) {
        event.preventDefault();

        $('.detect-result').slideDown(500);
        //
        var connect = $('.press').attr('href');
        var position = $(connect).offset().top;
        $('body').stop().animate({
            scrollTop: position
        }, 700);

        var numHour = $('#inputNum1').val();
        var numMin = $('#inputNum2').val();
        var numSec = $('#inputNum3').val();
        var formOption = $('.form-distance').val();
        $('.pace-clone').html('<span>' + '距離: ' + formOption + ' ' + ' ' + ' 時間: ' + numHour + '時 ' + numMin + '分 ' + numSec + '秒' + '</span>')

        //
        resultAnimate(38, 0.8);
    });

    

    function resultAnimate(num, index) {
        var myRunLevel = $('.myrunlevel');
        myRunLevel.animateNumbers(num, true, 1000);
        $('.fa-one').animate({
            "marginLeft": (index * 100) + '%'
        }, 1000);

        if (index <= 0.31) {
            myRunLevel.css('color', '#5BC0DE');
        } else if (index > 0.31 && index <= 0.56) {
            myRunLevel.css('color', '#5CB85C');
        } else if (index > 0.56 && index <= 0.74) {
            myRunLevel.css('color', '#337AB7');
        } else if (index > 0.74 && index <= 0.87) {
            myRunLevel.css('color', 'rgb(252, 227, 3)');
        } else if (index > 0.87 && index <= 0.95) {
            myRunLevel.css('color', '#F0AD4E');
        } else {
            myRunLevel.css('color', '#D9534F');
        }
    }
});
