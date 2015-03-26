// function distance(coords){
//     var distance, finaldistance;
//   if(coords.length > 0) {
//     var destination = new google.maps.LatLng(coords[coords.length-1].latitude, coords[coords.length-1].longitude)
//     distance = google.maps.geometry.spherical.computeDistanceBetween(munich, destination)/1000;
//     finaldistance = distance.toFixed(1).toString()+"km"
//     console.log(finaldistance);
//     return finaldistance;
//   }
//     finaldistance ="0km";
//     return finaldistance;
  
// }



//Upon Load
$(document).ready(function(){
"use strict";



  var munich = window.munich = new google.maps.LatLng(48.150618, 11.581317)
  var teamarray = [];
  var Liveblog = window.Liveblog = function () {
  }

  Liveblog.prototype.drawMap = function(){
    // var mapOptions = {
    //   center: new google.maps.LatLng(49.928474, 11.579697),
    //   zoom: 4,
    //   // styles: styleday(style),
    //   mapTypeId: google.maps.MapTypeId.ROADMAP,
    //   scrollwheel: false,
    // };

    var mapOptions = {
        zoom: 6,
        center: munich,
        styles: styleday(style),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
      };
      this.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    };

  var url = "http://5.189.130.27:8000/api/journal";
  Liveblog.prototype.getData = function(){
    var self = this;
      $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function(data) {
          console.log(data);
          // data.forEach(function(dataItem) {
          //       var team = { 
          //         // teamnumber: dataItem.team.id,
          //         // teamname: dataItem.team.teamname,
          //         // teamcolor: dataItem.team.teamcolor,
          //         // distance: dataItem.positions[dataItem.positions.length-1].distance,
          //         // player1: dataItem.players[0].prename,
          //         // player2: dataItem.players[1].prename,
          //         // messages: dataItem.messages,
          //         // positions: dataItem.positions,
          //       };
                // teamarray.push(team);
          
          initialize();
        },
        error: function() {
           console.log(error);
        }
      });
    // var teamarray = [];
    // teamarray = [{"id":"", "city": "munich", "longitude":0,"latitude":0,"text":null,"timestamp":null},{"id":"5", "city": "munich", "longitude":0.156479,"latitude":0.156479,"text":"WIR SIND HIER OMG SO COOL!","timestamp":"2015-03-01T13:19:17.000Z"},{"id":"5", "city": "munich", "longitude":0,"latitude":0,"text":null,"timestamp":null},{"id":"5", "city": "munich", "longitude":0.156479,"latitude":0.156479,"text":"WIR SIND HIER OMG SO COOL!","timestamp":"2015-03-01T13:43:08.000Z"}];
    // console.log(teamarray);


  };


  function initialize() {

    var map = liveblogInstance.map;
    // var i;
    // var start = new google.maps.Marker({
    //   position: munich,
    //   // icon: image,
    //   map: map
    // });
  }

//     teamarray.forEach(function (team) {
//       console.log(team);
//       var coords = team.positions;
//       var route = [munich];          
//       //var bounds = new google.maps.LatLngBounds ();
//       distance(coords);

//       for (i = 0; i < coords.length; i++) {
//         route.push(new google.maps.LatLng(coords[i].latitude, coords[i].longitude));
//       }

//       marker(coords, team, map);


//       var flightPath = new google.maps.Polyline({
//         path:route,
//         strokeColor: team.teamcolor,
//         strokeOpacity: 1.0,
//         strokeWeight: 3
//       });  
//       flightPath.setMap(map); 
//     }); 
// };

  // function marker(coords, team, map) {
  //   var marker;
  //   marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(coords[coords.length-1].latitude, coords[coords.length-1].longitude),
  //     map: map
  //   });
 
  //   var infowindow = new google.maps.InfoWindow({
  //       content: makeContent(team)
  //   });
 
  //   google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.open(map,marker);
  //   });
  // }

  // function makeContent(team) {
  //   var messages = "";
  //   for (var i = 0; i < team.positions.length; i++) {
  //     messages += "<p>"+team.positions[i].text+"</p>";
  //   }

  //   var contentstring = '<div id="content">'+
  //     '<div id="siteNotice">'+
  //     '</div>'+
  //     '<h4 id="firstHeading" class="firstHeading">'+team.teamname+' - Team '+team.teamnumber+'</h4>'+
  //     '<p><b>'+team.player1+' and '+team.player2+', Distance: '+team.distance+'km</b></p>'+
  //     '<div>'+messages+

  //     '</div>';
  //   return contentstring;
  


//-------------------------------------------------------------------
//Display Map



  //Map Night-Daystyle
  var style = [];
  var date = new Date();
  console.log(date.getHours());
  var hour = date.getHours();
  var styleday = function(style){
    if(6 < hour && hour < 20) {
      style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];
      return style;
    } else { style = [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}];
    return style;    
    }
  }





});