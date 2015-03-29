function getDistance(team){
    var distance;
  if(team.positions.length > 0) {
    var destination = new google.maps.LatLng(team.positions[team.positions.length-1].latitude, team.positions[team.positions.length-1].longitude);
    distance = google.maps.geometry.spherical.computeDistanceBetween(munich, destination)/1000;
    team.distance = distance.toFixed(1).toString()+"km";
    console.log(team.distance);
  }
    team.distance ="0km";
}

function getPositions(team, callback){
  $.ajax({
        type: "GET",
        url: "http://5.189.130.27:8000/api/journal?where[team_id]=1&orderBy=timestamp&orderDirection=ASC",
        dataType: "json",
        success: function(data) {
          team.positions = data.json;
          callback(team);
        },
        error: function() {
          console.log(error);
        }
  });
}

function getMembers(team){
  $.ajax({
        type: "GET",
        url: "http://5.189.130.27:8000/api/member?where[id]="+team.id+"8&limit=2&orderBy=vorname&orderDirection=ASC",
        dataType: "json",
        success: function(data) {
          team.player1 = data.json[0].vorname;
          team.player2 = data.json[1].vorname;
        },
        error: function() {
          console.log(error);
        }
  });
}


//Upon Load
$(document).ready(function(){
"use strict";

  var munich = window.munich = new google.maps.LatLng(48.150618, 11.581317)
  var teamarray = [];
  var url = "http://5.189.130.27:8000/api/";
  var Liveblog = window.Liveblog = function () {
  }

  Liveblog.prototype.drawMap = function(){

    var mapOptions = {
        zoom: 6,
        center: munich,
        styles: styleday(style),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
      };
      this.map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
      this.getData();
    };

  Liveblog.prototype.getData = function(){
    var self = this;
      $.ajax({
        type: "GET",
        url: url+"team",
        dataType: "json",
        success: function(data) {
          var dataobject = data.json;
            data.json.forEach(function(dataItem) {
                  var team = { 
                    teamnumber: dataItem.id,
                    teamname: dataItem.name,
                    positions: "",            
                    distance: "",
                    player1: "",
                    player2: "",
                  };
                  getPositions(team, getDistance);
                  getMembers(team);
                  teamarray.push(team);
                  
            });
            console.log(teamarray);
            initialize();
        },
        error: function() {
           console.log(error);
        }
      });
  }


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