import { PipeTransform , Pipe } from '@angular/core';
@Pipe( { name : 'AmpKeys' } )
export class AmpKeysPipe implements PipeTransform {
    transform ( value , args : string[] ) : any {
        let keys = [];
        for ( let key in value ) {
            keys.push( key );
        }
        return keys;
    }
}
