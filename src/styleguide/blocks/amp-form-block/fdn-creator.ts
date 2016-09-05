let fs       = require( 'fs' );
var root = {};
(()=> {
    var args     = process.argv.slice( 2 );
    let filePath = args[ 0 ];
    let formDef  = require( filePath ).formDef;
    createFdn( formDef , [] );
    let string = 'export class FullyDistinguishedNames {';
    Object.keys( root ).map( ( key )=> {
        string += 'public static ' + key + '           = ' + createArrayString( root[ key ] ) + ';'
    } );
    string += '}';
    fs.writeFile( 'full-distinguished-names.ts' , string , function( err ) {
        if ( err ) return console.log( err );
        console.log( 'Successfully created fully distinguished names at ' + filePath );
    } );
})();
function createArrayString ( _array ) {
    let s = '[ ';
    for ( let i = 0 ; i < _array.length ; i ++ ) {
        s += "'" + _array[ i ] + "' ,";
    }
    s = s.trim().slice( 0 , - 1 );
    return s += ' ]';
}
function createFdn ( formDef , fdn ) {
    if ( formDef.blocks ) {
        if ( formDef.name ) {
            let _fdn = fdn.concat( [ formDef.name ] );
            for ( let i = 0 ; i < formDef.blocks.length ; i ++ ) {
                createFdn( formDef.blocks[ i ] , _fdn );
            }
        } else {
            for ( let i = 0 ; i < formDef.blocks.length ; i ++ ) {
                createFdn( formDef.blocks[ i ] , fdn );
            }
        }
    } else {
        if ( formDef.name ) {
            root[ formDef.name ] = fdn.concat( [ formDef.name ] );
        }
    }
}