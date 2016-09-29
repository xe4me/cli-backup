import { Pipe , PipeTransform } from '@angular/core';
@Pipe( { name : 'AmpValues' , pure : false } )
export class AmpValuesPipe implements PipeTransform {
    transform ( value : any , args : any[] = null ) : any {
        return value ? Object.keys( value ).map( ( key ) => value[ key ] ) : value;
    }
}
