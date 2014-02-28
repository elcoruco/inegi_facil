inegi_facil
===========

<h2>Capture geolocation</h2>

statistical and geographical apps from inegifacil.com

<h3>Basic usage</h3>

Make a simple callback to capture the geolocation:

    var response  = function( geolocation ){
      console.log( geolocation );
    };
  
Call the plugin using any element, passing the callback as an option

    $('body').captureGeolocation({callback : response });
  
<h3>Example</h3>

    var response = function( geolocation ){
      if( geolocation.singlePoint ){
        var g = geolocation.singlePoint,
            e = $('.example1'),
            t = "";

        t += "timestamp: " + g.timestamp + "<br>";
        for(var i in g.coords){
          if( g.coords.hasOwnProperty(i) ){
            t+= i + ": " + g.coords[i] + "<br>";
          }
        }

        e.html( t );
      }
    };

    $('.example1_btn').on('click', function(){
      $('body').captureGeolocation({ callback : response });
      return false;
    });
