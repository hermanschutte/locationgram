<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!-- Consider adding an manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">

    <!-- Use the .htaccess and remove these lines to avoid edge case issues.
        More info: h5bp.com/b/378 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>Locationgram | Instagram around you</title>
    <meta name="description" content="View photos shared via Instagram around you">
    <meta name="author" content="Herman Schutte">

    <!-- Mobile viewport optimized: j.mp/bplateviewport -->
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes" />

    <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->

    <!-- CSS: implied media=all -->
    <!-- CSS concatenated and minified via ant build script-->    
    <link rel="stylesheet" href="css/bootstrap-1.2.0.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/colorbox.css">
    <!-- end CSS-->

    <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

    <!-- All JavaScript at the bottom, except for Modernizr / Respond.
        Modernizr enables HTML5 elements & feature detects; Respond is a polyfill for min/max-width CSS3 Media Queries
        For optimal performance, use a custom Modernizr build: www.modernizr.com/download/ -->
    <script src="js/libs/modernizr-2.0.6.min.js"></script>
</head>

<body>

    <div id="container">
        <header>
            <div class="topbar">
                <div class="topbar-inner">
                    <div class="container">
                        <h3>
                            <a href="#">
                                Locationgram
                            </a>
                        </h3>
                        <ul class="nav">
                            <li>
                                <form id="location-search" action>
                                    <input type="text" id="search-text" placeholder="Search for a location">
                                </form>
                            </li>
                        </ul>
                        <ul class="nav secondary-nav">
                            <li>
                                <a href="http://github.com">Fork This</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
        <div id="main" role="main">
            <div id="map_canvas" style="width:100%; height:100%"></div>
        </div>
        <footer>
        </footer>
    </div> <!--! end of #container -->


    <!-- JavaScript at the bottom for fast page loading -->

    <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=geometry"></script>

    <!-- scripts concatenated and minified via ant build script-->
    <script defer src="js/plugins.js"></script>
    <script defer src="js/config.js"></script>
    <script defer src="js/script.js"></script>
    <!-- end scripts-->
  
  
	
    <!-- Change UA-XXXXX-X to be your site's ID -->
    <script>
        window._gaq = [['_setAccount','UA-25797317-1'],['_trackPageview'],['_trackPageLoadTime']];
        Modernizr.load({
            load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
        });
    </script>


    <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you want to support IE 6.
        chromium.org/developers/how-tos/chrome-frame-getting-started -->
    <!--[if lt IE 7 ]>
        <script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
        <script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
    <![endif]-->
  
</body>
</html>
