( {
    appDir : "../src",
    baseUrl : ".",
    paths: {
        'underscore':   'libs/underscore-1.3.3',
        'backbone':     'libs/backbone-0.9.2'
    },
    dir : "../build/release",
    optimize : "uglify",
    uglify : {
        toplevel : true,
        ascii_only : false,
        beautify : false
    },
    optimizeCss : "standard",
    modules : [{
    	name : 'Narya'
    }]
})