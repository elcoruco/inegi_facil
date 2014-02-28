;(function($, window, document, undefined){

  var pluginName = "captureGeolocation",
  defaults ={
    getGoogleMaps : true,
    prefix : 'geo_',
    callback : false,
    failSilent : false,
    failGeolocation : 'the geolocation is not avaliable',
    failGoogleMaps : 'the google maps api is not avaliable',
    failuser : 'the geolocation fails x_____x #sadpanda',
    failTag : 'p'
  };

  // the plugin constructor
  function Plugin(element, options){
    this.element = element;
    this.options = $.extend( {}, defaults, options);
    this.defaults = defaults;
    this.singlePoint = false;
    this.googlePoint = false;
    this.hasGeolocation = false;
    this.hasGoogleMaps = false;
    this._name = pluginName;
    this.init();
  }

  // plugin methods
  Plugin.prototype = {
    init : function(){
      this.hasGeolocation = this.checkGeolocation();
      this.hasGoogleMaps = this.checkGoogleMaps();
      // check if the plugin can do anything
      if( !this.hasGeolocation ){
        this.fail( this.failGeolocation );
	return;
      }
      else if( !this.hasGoogleMaps && this.getGoogleMaps ){
        this.fail( this.failGoogleMaps );
	return;
      }

      // get the location
      this.geolocation();
    },

    geolocation : function(){
      var success = $.proxy(this.geoSuccess, this);
      var fail = $.proxy(this.geoFail, this);
      navigator.geolocation.getCurrentPosition(success, fail);
    },

    geoSuccess : function( point ){
      this.singlePoint = point;
      var toForm = $.proxy(this.toForm, this);
      var geocoding = $.proxy(this.geocoding, this);
      
      // check if google maps is not needed && execute
      if( this.options.getGoogleMaps && this.hasGoogleMaps){
        geocoding();
      }
      else{
        toForm();
        return;
      }
      
    },

    geoFail : function(){
      this.fail( this.failUser );
    },

    geocoding : function(){
      var geocoder = new google.maps.Geocoder();
      var success = $.proxy(this.geocodingSuccess, this);
      var latitude = this.singlePoint.coords.latitude;
      var longitude = this.singlePoint.coords.longitude;
      var latlng = new google.maps.LatLng(latitude, longitude);
      geocoder.geocode( { location : latlng }, success );
    },

    geocodingSuccess : function( results, status ){
      var fail = $.proxy(this.geocodingFail, this);
      // success 
      if( status == google.maps.GeocoderStatus.OK){
      }
      // miserable fail
      else{
        fail( status );
      }
    },

    geocodingFail : function( message ){
    },

    toForm : function(){
    },

    fail : function( content ){
      if( ! this.options.failSilent ){
        var message = $("<" + this.options.failTag + ">");
        $(this.element).prepend( message.html( content ));
      }
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
