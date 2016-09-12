var fs        = require ( 'fs' );
var path      = require ( "path" );
var fdnRoot   = {};
var modelRoot = {};
function fdnLoader ( Orgsource ) {
    this.cacheable && this.cacheable ();
    try {
        source = JSON.parse ( Orgsource );
    } catch ( error ) {
        throw new Error ( '****  ****** Cannot parse form definition file , make sure it\'s valid JSON and it does not have any comment in it ' );
    }
    if ( source.fdnClassPath ) {
        createFdn ( source , [] );
        var staticClassString = createStaticClassString ( fdnRoot );
        createModel ( source , null , modelRoot );
        var fdnExt        = '.fdn.ts';
        var modelExt      = '.model.json';
        var fdnFileName   = source.id ? source.id + fdnExt : 'fully-distinguished-names' + fdnExt;
        var modelFileName = source.id ? source.id + modelExt : 'model' + modelExt;
        if ( source.fdnClassPath ) {
            fdnFileName = source.fdnClassPath + '/' + fdnFileName;
        }
        if ( source.fdnModelPath ) {
            modelFileName = source.fdnModelPath + '/' + modelFileName;
        }
        fs.writeFile ( fdnFileName , staticClassString , function ( err ) {
            if ( err ) return console.log ( err );
            console.log ( '*********************** Successfully created fully distinguished names at ' + fdnFileName );
        } );
        fs.writeFile ( modelFileName , JSON.stringify ( modelRoot ) , function ( err ) {
            if ( err ) return console.log ( err );
            console.log ( '*********************** Successfully created model at ' + modelFileName );
        } );
    }
    return Orgsource;
}
function createModel ( formDef , fdn , model ) {
    if ( formDef.blocks ) {
        if ( formDef.name ) {
            if ( ! fdn ) {
                model[ formDef.name ] = {};
            } else {
                model[ fdn ][ formDef.name ] = {};
            }
            //console.log('model',model[ formDef.name ]);
            for ( var i = 0 ; i < formDef.blocks.length ; i ++ ) {
                createModel ( formDef.blocks[ i ] , formDef.name , fdn ? model[ fdn ] : model );
            }
        } else {
            for ( var j = 0 ; j < formDef.blocks.length ; j ++ ) {
                createModel ( formDef.blocks[ j ] , fdn , model );
            }
        }
    } else {
        if ( formDef.name ) {
            model[ fdn ][ formDef.name ] = {};
            if ( formDef.custom && formDef.custom.controls ) {
                for ( var i = 0 ; i < formDef.custom.controls.length ; i ++ ) {
                    if ( formDef.custom.controls[ i ].id ) {
                        model[ fdn ][ formDef.name ][ formDef.custom.controls[ i ].id ] = null;
                    } else {
                        console.info ( 'Custom control for formDef does not have id ' + formDef.name );
                    }
                }
            }
        }
    }
}
function createArrayString ( _array ) {
    var s = '[ ';
    for ( var i = 0 ; i < _array.length ; i ++ ) {
        s += "'" + _array[ i ] + "' ,";
    }
    s = s.trim ().slice ( 0 , - 1 );
    return s += ' ]';
}
function createFdn ( formDef , fdn ) {
    if ( formDef.blocks ) {
        if ( formDef.name ) {
            var _fdn = fdn.concat ( [ formDef.name ] );
            for ( var i = 0 ; i < formDef.blocks.length ; i ++ ) {
                createFdn ( formDef.blocks[ i ] , _fdn );
            }
        } else {
            for ( var j = 0 ; j < formDef.blocks.length ; j ++ ) {
                createFdn ( formDef.blocks[ j ] , fdn );
            }
        }
    } else {
        if ( formDef.name ) {
            fdnRoot[ formDef.name ] = fdn.concat ( [ formDef.name ] );
        }
    }
}
function createStaticClassString ( fdnRoot ) {
    var string = 'export class FDN {';
    Object.keys ( fdnRoot ).map ( function ( key ) {
        string += '\rpublic static ' + key + '           = ' + createArrayString ( fdnRoot[ key ] ) + ';\r'
    } );
    string += '}';
    return string;
}
module.exports = fdnLoader;