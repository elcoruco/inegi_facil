//     INEGI_apps 0.1
//     (c) 2014 El coruco
//     INEGI_apps may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://inegifacil.com/apps
//     based on the Backbone implementation

(function(root, browser, factory){
  
  // check if google maps is avaliable
  var maps = typeof root.google.maps !== 'undefined' ? root.google.maps :  false;
  
  // check if geolocalization is avaliable
  var geo = typeof browser.geolocation !== 'undefined' ? browser.geolocation : false;
  // create the global varible
  root.INEGI_apps = factory(root, geo, {}, maps);
}(this, navigator, function(root, geolocation, INEGI_apps, google_maps){
  
  // define the basic properties
  INEGI_apps.VERSION = '0.1';
  INEGI_apps.maps = google_maps;
  INEGI_apps.geolocation = geolocation;
  INEGI_apps.geolocation_point = false;
  INEGI_apps.geolocation_callback = false;

  // define the geolocation function
  INEGI_apps.getLocation = function( callback ){
    this.geolocation.getCurrentPosition(geo_success, geo_error);
    this.geolocation_callback = typeof callback === "function" ?  callback : false; 
  };

  var geo_success = function(p){
    INEGI_apps.geolocation_point = p;
    if(INEGI_apps.geolocation_callback){
      INEGI_apps.geolocation_callback(p);
    };
  }

  var geo_error = function(e){
    INEGI_apps.geolocation_point = false;
  };

  return INEGI_apps;
}));
