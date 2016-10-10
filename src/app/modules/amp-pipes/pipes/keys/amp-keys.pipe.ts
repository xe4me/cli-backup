import { PipeTransform , Pipe } from '@angular/core';
@Pipe( { name : 'AmpKeys' } )
export class AmpKeysPipe implements PipeTransform {
    transform ( value , args : string[] ) : any {
        let keys = [];
        for ( let key in value ) {
            if ( value.hasOwnProperty( key ) ) {
                keys.push( key );
            }
        }
        return keys;
    }
}