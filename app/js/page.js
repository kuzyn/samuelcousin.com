
// Github activity
Github.userActivity({
  username: "joshuasnowball",
  OAuth: '',
  selector: ".github-activity",
  limit: 6
});

// Document ready
$(function() {

  // Get dimention for trianglify
  windowWidth = $( window ).width();
  windowHeight = $( window ).height();

  // Trianglify settings
  var pattern = Trianglify({
    width: windowWidth,
    height:windowHeight,
    variance: 50,
    cell_size: 50,
  });

  // Generate & append the background
  document.body.appendChild(pattern.canvas());

  // http://stackoverflow.com/a/30112044/3253893
  // Scroll only active div & not full windows
  // depend on jquery-mousewheel
  $.fn.scrollGuard = function() {
      return this
          .on( 'mousewheel', function ( e ) {
              var event = e.originalEvent;
              var d = event.wheelDelta || -event.detail;
              this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
              e.preventDefault();
          });
  };
  // Bind mousewheel to div    
  $( '.gt-scrollbar' ).scrollGuard();

  // Emojify.js
  emojify.setConfig({
    emojify_tag_type : 'div',           // Only run emojify.js on this element
    only_crawl_id    : 'gh-wrapper',            // Use to restrict where emojify.js applies
    img_dir          : 'assets/img/emoji',  // Directory for emoji images
    ignored_tags     : {                // Ignore the following tags
        'SCRIPT'  : 1,
        'TEXTAREA': 1,
        'A'       : 1,
        'PRE'     : 1,
        'CODE'    : 1
    }
});
// Intercept emojis  
emojify.run();

// Fade in stuff
$( "canvas" ).animate({ opacity: 0.50 }, 2000, function() {
     $( "#things" ).animate({ opacity: 1 }, 500, function() {
    });
  });
});