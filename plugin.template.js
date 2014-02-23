;(function($, window, document, undefined){

  var pluginName = "captureGeolocation",
  defaults ={
    type : 'simple',
    prefix : 'geo_',
    callback : false,
    fail : 'silent',
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
      this.fail();
    },

    geolocation : function( callback ){
    },

    restart : function(){
    },

    toForm : function(){
    },

    fail : function(){
      if(this.options.fail !== "silent"){
        var message = $("<" + this.options.failTag + ">");
        $(this.element).prepend( message.html(this.options.fail));
      }
    },

    _checkGeolocation : function(){
      return !typeof navigator.geolocation === 'undefined';
    },

    _ceckGoogleMaps : function(){
      return !typeof document.google.maps === 'undefined';
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
