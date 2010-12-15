(function( $ ){
  
  var methods = {
    init         : function( options ) { 
      this.data("lastID", 0); //$('#posts').data
    },
    
    lowEnough()  : function( ) { 
      // is it low enough to scroll?
      var pageHeight = Math.max(document.body.scrollHeight ||
        document.body.offsetHeight);
      var viewportHeight = window.innerHeight  ||
        document.documentElement.clientHeight  ||
        document.body.clientHeight || 0;
      var scrollheight = window.pageYOffset ||
        document.documentElement.scrollTop  ||
        document.body.scrollTop || 0;
      // Trigger for scrolls within 20 pixels from page bottom
      return pageHeight - viewportHeight - scrollHeight < 20;
    },
    
    checkScroll(): function( ) { 
      // if it's low enough, grab latest data
      if (!lowEnough()) return pollScroll();
      settings.loading_elem.show();
      $.ajax({
        type: "GET",
        url: settings.url,
        dataType: 'html',
        timeout: 3000,
        error: function() { /* maybe display error message */ },
        success: function(data) {
          settings.data_elem.html(data);
          settings.loading_elem.hide();
          pollScroll()
        }
      });
      this.data("lastID", 86); //$('#posts').data
    },
    
    pollScroll() : function( content ) { 
      // checking every so often:  
      setTimeout(checkScroll, 100);
    }   
  };
    
  var settings = {
     'interval'     : 100
    ,'url'          : '/posts.json'
    ,'format'       : 'json'
    ,'loading_elem' : $('#spinner')
    ,'data_elem'    : $('#posts')
  };
  
  $.fn.infiniScroll = function(method) {
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.infiniScroll' );
    }  
  }
  /*
    $('div').infiniScroll();   // calls the init method
    $('#posts').infiniScroll({ // calls the init method
      interval : 200,
      url : '/my_posts.json'
    });
    $('div').infiniScroll('hide'); // calls the hide method
  */
})( jQuery );