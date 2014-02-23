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
      console.log( point );
    },

    geoFail : function(){
      this.fail( this.failUser );
    },

    restart : function(){
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
