import { ComponentMetadata } from '@angular/core';
import { isArray } from '@angular/common/src/facade/lang';
export function AmpComponent ( annotation : any ) {
    return function( target : Function ) {
        let parentTarget      = Object.getPrototypeOf( target.prototype ).constructor;
        let parentAnnotations = (<any> Reflect).getMetadata( 'annotations' , parentTarget );
        let parentAnnotation  = parentAnnotations[ 0 ];
        Object.keys( parentAnnotation ).forEach( ( key ) => {
            if ( parentAnnotation[ key ] ) {
                if ( isArray( annotation[ key ] ) ) {
                    annotation[ key ] = annotation[ key ].concat( parentAnnotation[ key ] );
                } else {
                    if ( key !== 'selector' ) {
                        annotation[ key.replace( '_' , '' ) ] = parentAnnotation[ key ];
                    }
                }
            }
        } );
        let metadata = new ComponentMetadata( annotation );
        (<any> Reflect).defineMetadata( 'annotations' , [ metadata ] , target );
    };
}
