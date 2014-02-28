;(function($, window, document, undefined){

  var pluginName = "captureGeolocation",
  defaults ={
    getGoogleMaps : false,
    callback : false,
  };

  // the plugin constructor
  function Plugin(element, options){
    this.element        = element;
    this.options        = $.extend( {}, defaults, options);
    this.defaults       = defaults;
    this.singlePoint    = false;
    this.googlePoint    = false;
    this.hasGeolocation = false;
    this.hasGoogleMaps  = false;
    this._name          = pluginName;
    this.init();
  }

  // plugin methods
  Plugin.prototype = {

    // init
    init : function(){
      this.hasGeolocation = this.checkGeolocation();
      this.hasGoogleMaps = this.checkGoogleMaps();
      
      // check if the plugin can do anything
      if( !this.hasGeolocation ){
        this.complete();
	return;
      }

      // get the location
      this.geolocation();
    },

    // geolocation
    geolocation : function(){
      // make avalible the plugin object
      var success = $.proxy(this.geoSuccess, this);
      var fail    = $.proxy(this.complete, this);
      
      // call the geolocation service
      navigator.geolocation.getCurrentPosition(success, fail);
    },
    
    // geosuccess
    // executes if geolocation works!
    geoSuccess : function( point ){
      this.singlePoint = point;
      var geocoding    = $.proxy(this.geocoding, this);
      
      // check if google maps is not needed && execute
      if( this.options.getGoogleMaps && this.hasGoogleMaps){
        geocoding();
      }
      else{
        this.complete();
      }
      
    },

    // make the geocoding call to google maps
    geocoding : function(){
      var success   = $.proxy(this.geocodingSuccess, this);
      var latitude  = this.singlePoint.coords.latitude;
      var longitude = this.singlePoint.coords.longitude;
      var latlng    = new google.maps.LatLng(latitude, longitude);
      var geocoder  = new google.maps.Geocoder();
      
      geocoder.geocode( { location : latlng }, success );
    },

    // executes if the geocoding works
    geocodingSuccess : function( results, status ){
      // success 
      if( status == google.maps.GeocoderStatus.OK){
        this.googlePoint = results;
      }
      this.complete();
    },

    // ends the plugin
    complete : function(){
      if( typeof this.options.callback === "function"){
        var response = {
          singlePoint : this.singlePoint,
          googlePoint : this.googlePoint
        }
      }

      this.options.callback(response);
      return;
    },

    checkGeolocation : function(){
      return navigator && navigator.geolocation ? true : false;
    },

    checkGoogleMaps : function(){
      return window && window.google.maps ? true : false;
    }
  };

  // enable the plugin
  $.fn[pluginName] = function(options){
    return this.each(function(){
      if(!$.data(this, "plugin_" + pluginName)){
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
