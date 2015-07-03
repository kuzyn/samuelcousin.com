
// Github activity
Github.userActivity({
  username: "joshuasnowball",
  OAuth: '',
  selector: ".github-activity",
  limit: 6
});

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

// Emojify.js
emojify.setConfig({
  img_dir          : 'assets/img/emoji',  // Directory for emoji images
  ignored_tags     : {                // Ignore the following tags
    'A'       : 1
  }
});

// Document ready
$(function() {
  // Generate & append the background
  document.body.appendChild(pattern.canvas());

  // Intercept emojis  
  emojify.run();

  // Custom scrollbar
  $(window).load(function(){
    $(".gt-scrollbar").mCustomScrollbar({
      theme:"minimal",
      scrollInertia: 500,
      mouseWheel:{ preventDefault: true }
    });
  });
  
  // Fade in stuff
  $( "canvas" ).animate({ opacity: 0.50 }, 2000, function() {
   $( "#things" ).animate({ opacity: 1 }, 500, function() {
   });
 });
});

