import { ComponentMetadata } from '@angular/core';
import { isArray } from '@angular/common/src/facade/lang';
export function AmpComponent ( annotation : any ) {
    return function( target : Function ) {
        var parentTarget      = Object.getPrototypeOf( target.prototype ).constructor;
        var parentAnnotations = (<any>Reflect).getMetadata( 'annotations' , parentTarget );
        var parentAnnotation  = parentAnnotations[ 0 ];
        Object.keys( parentAnnotation ).forEach( ( key ) => {
            if ( parentAnnotation[ key ] ) {
                if ( isArray( annotation[ key ] ) ) {
                    annotation[ key ] = annotation[ key ].concat( parentAnnotation[ key ] );
                } else {
                    annotation[ key ] = parentAnnotation[ key ];
                }
            }
        } );
        var metadata = new ComponentMetadata( annotation );
        (<any>Reflect).defineMetadata( 'annotations' , [ metadata ] , target );
    };
}
