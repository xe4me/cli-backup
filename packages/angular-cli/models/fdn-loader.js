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
        fs.writeFile ( modelFileName , JSON.stringify ( modelRoot , null , 4 ) , function ( err ) {
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
            var block = {};

            if ( formDef.custom && formDef.custom.controls ) {
                for ( var i = 0 ; i < formDef.custom.controls.length ; i ++ ) {
                    if ( formDef.custom.controls[ i ].id ) {
                        block[ formDef.custom.controls[ i ].id ] = null;
                    } else {
                        console.info ( 'Custom control for formDef does not have id ' + formDef.name );
                    }
                }
            }

            if ( ! fdn ) {
                model[ formDef.name ] = block;
            } else {
                model[ fdn ][ formDef.name ] = block;
            }

            if ( formDef.custom && formDef.custom.optionalBlocks ) {
                objectToArray(formDef.custom.optionalBlocks)
                    .forEach( ( block ) => {
                        createModel ( block , null , model );
                    });
            }
        }
    }
}
function createArrayString ( _array ) {
    var s = '[ ';
    for ( var i = 0 ; i < _array.length ; i ++ ) {
        s += "'" + _array[ i ] + "' , ";
    }
    s = s.trim ().slice ( 0 , - 1 );
    return s += ']';
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

            if ( formDef.custom && formDef.custom.optionalBlocks ) {
                objectToArray(formDef.custom.optionalBlocks)
                    .forEach( ( block ) => {
                        createFdn ( block , fdn );
                    });
            }
        }
    }
}
function createStaticClassString ( fdnRoot ) {
    var string = 'export class FDN {';
    var len = 0;
    Object.keys( fdnRoot ).forEach( ( key ) => {
        if (key.length > len) {
            len = key.length;
        }
    } );
    Object.keys( fdnRoot ).map ( ( key ) => {
        string += '\r    public static ' + key + ' '.repeat(len - key.length) + ' = ' + createArrayString ( fdnRoot[ key ] ) + ';\r'
    } );
    string += '}\r';
    return string;
}
function objectToArray ( item ) {
    var arr = [];
    if ( item.constructor === Object ) {
        for ( blockName in item ) {
            if ( item.hasOwnProperty(blockName) ) {
                arr.push(item[blockName]);
            }
        }
    } else if ( item.constructor === Array ) {
        arr = item;
    }
    return arr;
}
module.exports = fdnLoader;