$(function(){

    $('.menu-btn').each(function () {
        Menu($(this));
    });

    $.each($('.map'), function () {
        new Map($(this));
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

} );

var Map = function (obj) {

    //private properties
    var _self = this,
        _window = $(window),
        _mapData = obj.data('map'),
        _map = null,
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _getMapData = function(){
            _mapData.center = new google.maps.LatLng(_mapData.center[0], _mapData.center[1]);

            $.each(_mapData.points, function (i) {
                _mapData.points[i] = new google.maps.LatLng(this[0], this[1]);

            });
        },
        _init = function () {
            _getMapData();

            google.maps.event.addDomListener(window, 'load', _initMap);

            _addEvents();
        },
        _initMap= function(){

            var MY_MAPTYPE_ID = 'custom_style',
                featureOpts = [
                    {
                        featureType: "administrative",
                        elementType: "geometry",
                        stylers: [
                            { saturation: -200 }
                        ]
                    },{
                        featureType: "landscape",
                        stylers: [
                            { gamma: 0.4 },
                            { saturation: -100 }
                        ]
                    },{
                        featureType: "poi",
                        stylers: [
                            { saturation: -100 }
                        ]
                    },{
                        featureType: "road",
                        stylers: [
                            { saturation: -100 }
                        ]
                    },{
                        featureType: "transit",
                        stylers: [
                            { saturation: -100 }
                        ]
                    },{
                        featureType: "water",
                        stylers: [
                            { hue: "#268cbc" },
                            { gamma: 0.17 }
                        ]
                    }
                ],
                mapOptions = {
                    zoom: _mapData.zoom,
                    scrollwheel: false,
                    center: _mapData.center,
                    //disableDefaultUI: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                    },
                    mapTypeId: MY_MAPTYPE_ID
                },
                styledMapOptions = {
                    name: 'Custom Style'
                },
                customMapType = null,
                image = 'img/icons-place.png';

            _map = new google.maps.Map(_obj[0], mapOptions);

            customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

            _map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

            $.each(_mapData.points, function () {
                var contentString = '';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                var marker = new google.maps.Marker({
                    position: this,
                    map: _map,
                    icon: image
                });
                marker.addListener('click', function() {
                    infowindow.open(_map, marker);
                });
            });

        };

    //public properties

    //public methods


    _init();
};

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