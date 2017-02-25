var fs = require ( 'fs' );
var Stubby = require ( 'stubby' ).Stubby;

var stubby = new Stubby ();
var stubsPort = 8882;
var adminPort = 8809;
var httpsPort = 7444;
var host = 'localhost';
function getStubs () {
    var stubs = [];
    fs.readdir ( 'api-dev' , function ( key , files ) {
        for ( var i = 0 ; i < files.length ; i ++ ) {
            var file = require ( './api-dev/' + files[ i ] );
            for ( var l = 0 ; l < file.length ; l ++ ) {
                stubs.push ( file[ l ] );
            }
        }
        stubby.start ( {
            stubs : stubsPort , admin : adminPort , location : host , data : stubs, tls : httpsPort
        } );
        console.log ( '------------*************----------' );
        console.log ( 'Stubby server started at ' + stubsPort );
        console.log ( '------------*************----------' );
    } );

}
getStubs ();
