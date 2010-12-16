(function( $ ){
  
  var _checkScroll = function( ) { 
    // if it's low enough, grab latest data
    if (!_lowEnough()){
      //return methods.pollScroll();
      return methods.pollScroll();
    } else {//this.infiniScroll('pollScroll');
      if (settings.freshest_id > settings.lowest_id){
    		$('#'+settings.loading_elem).show();
	      $.ajax({
	        type: "GET",
	        url: settings.root_url+"?id="+settings.freshest_id+"&n="+settings.num,
	        dataType: 'html',
	        timeout: 3000,
	        error: function() { /* maybe display error message */ },
	        success: function(data) {
		        //console.log("settings.data_elem: ", settings.data_elem);
	          $('#'+settings.data_elem).append(data);
	          //settings.data_elem.append(data);
	          $('#'+settings.loading_elem).hide();
	          settings.freshest_id = parseInt( $('div.post').last()[0].id.split("_")[1] );
	          //console.log("settings.freshest_id: ", settings.freshest_id);
						methods.pollScroll()
	        }
	      });
	    }  // do not make ajax request if it's the only one left
      
    }
    //this.data("lastID", 86); //$('#posts').data
  };
  
  var _setLastID = function(elem, lastID){
	  elem.data("lastID", lastID);
	  //console.log(elem.data("lastID"));
  };

  var _lowEnough = function(){
	  // is it low enough to scroll?
    var pageHeight = Math.max(document.body.scrollHeight ||
      document.body.offsetHeight);
    var viewportHeight = window.innerHeight  ||
      document.documentElement.clientHeight  ||
      document.body.clientHeight || 0;
    var scrollHeight = window.pageYOffset ||
      document.documentElement.scrollTop  ||
      document.body.scrollTop || 0;
    // Trigger for scrolls within 20 pixels from page bottom
    return pageHeight - viewportHeight - scrollHeight < 30;
  };

  /* PUBLIC METHODS */
  var methods = {
    init : function( options ) { 
      //this.data("lastID", 10000000); //$('#posts').data
      $('#'+settings.loading_elem).hide();
    },
    
    pollScroll : function() { 
      // checking every so often:  
      setTimeout(_checkScroll, 100);
    }   
  };
    
  var settings = {
     'interval'     : 100
    ,'root_url'     : '/grab_next'
    ,'loading_elem' : 'spinner'
    ,'data_elem'    : 'posts'
    ,'freshest_id'  : 1000000
    ,'num'          : 5
    ,'lowest_id'    : 1
    ,'sort'         : 'desc'
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