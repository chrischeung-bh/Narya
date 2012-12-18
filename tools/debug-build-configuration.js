( {
    appDir : "../src",
    baseUrl : ".",
    optimize : "none",
    optimizeCss : "standard.keepLines",
    paths: {
        'underscore':   'libs/underscore-1.3.3',
        'backbone':     'libs/backbone-0.9.2'
    },
    dir : "../build/debug",
    modules : [{
    	name : 'Narya'
    }]
})