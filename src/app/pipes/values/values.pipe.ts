import { Pipe , PipeTransform } from "@angular/core";
@Pipe( { name : 'values' , pure : false } )
export class ValuesPipe implements PipeTransform {
    transform ( value : any , args : any[] = null ) : any {
        return value ? Object.keys( value ).map( key => value[ key ] ) : value;
    }
}