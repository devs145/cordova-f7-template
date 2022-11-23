var app = new Framework7({
    // App root element
    el: '#app',
    routes: [
        {
            path: '/',
            url: 'index.html',
        },
        {
            path: '/page2/',
            url: 'pages/page2.html',
        },
    ],
    // ... other parameters
});
var mainView = app.views.create('.view-main')

var $$ = Dom7;
var lat;
var long;
var map;
var marker;
var geoOpts = {
    enableHighAccuracy: true 
 }
var watchID;


$$(document).on('page:init', '.page[data-name="page2"]', function () {
    // Page 2 fun here
     map = new google.maps.Map(document.getElementById('map'),{
        zoom: 18,
        center: {lat:lat, lng: long}    
    }) 
     marker = new google.maps.Marker({
        position: {lat:lat, lng:long},
        map: map
    })

    $("#startWatch").on('click', function() {
        watchID= navigator.geolocation.watchPosition(watchSuccess, geoError, geoOpts)
        $(this).hide()
        $("#stopWatch").show()
    })

    $("#stopWatch").on('click', function() {
        navigator.geolocation.clearWatch(watchID)
        $(this).hide()
        $("#startWatch").show()
    })
    
function watchSuccess(position){
    console.log(position);
     lat = position.coords.latitude
     long = position.coords.longitude

     var coords = {lat:lat, lng:long}
     map.setCenter(coords);
     marker.setPosition(coords);
     
//      $("#currentPos").append("<p>" + lat + "," + long + "</p>")
}
})

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOpts);
}

function geoSuccess(position){
    console.log(position);
     lat = position.coords.latitude
     long = position.coords.longitude
     $("#currentPos").append("<p>" + lat + "," + long + "</p>")
}
function geoError(message) {
    alert(message.message);
}
