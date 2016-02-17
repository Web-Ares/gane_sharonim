$(function(){

    $('.menu-btn').each(function () {
        Menu($(this));
    });

    $('.gallery').each(function () {
        $(".gallery__img").fancybox({
            padding : 0,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    });

    if ($('.map').length) {

        var myMap;

        function init () {
            myMap = new ymaps.Map('map', {
                center: $('.map').attr('data-coord').split(', '),
                zoom: 12
            });
            $.each($('.map'), function(i){
                var curElem = $(this);

                if (curElem.attr('data-coord')) {
                    var coord = curElem.attr('data-coord').split(', ');

                    myMap.geoObjects.add(new ymaps.Placemark(
                        [coord[0], coord[1]],
                        {   hintContent: "Описание",
                            balloonContentBody: curElem.find('span').text() }, {
                            iconLayout: 'default#image'
                        }
                    ));
                }
            });

        }

        ymaps.ready(init);
    }

} );

var Menu = function (obj) {

    //private properties
    var _self = this,
        _curElem = $('.site'),
        _obj = obj;

    //private methods
    var _addEvents = function () {

            _obj.on({
                'click': function(){
                    if (_curElem.hasClass('open-menu')) {
                        _curElem.removeClass('open-menu');
                    } else {
                        _curElem.addClass('open-menu');
                    }
                }
            })

        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods

    _init();
};