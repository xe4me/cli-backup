import { Injectable } from '@angular/core';
import {
    FormGroup,
    FormBuilder
} from '@angular/forms';
@Injectable()
export class HydrationService {
    constructor ( private builder : FormBuilder ) {

    }

    public hydrate ( newModel ) : FormGroup {
        if ( !newModel ) {
            return null;
        }
        let stringified = JSON.stringify( newModel );
        let magic       = stringified
            .replace( /\[/g, 'this.builder.array([' )
            .replace( /\]/g, '])' )
            .replace( /{"/g, 'this.builder.group({"' )
            .replace( /}/g, '})' )
            .replace( /\{\}\)/g, 'this.builder.group({})' );
        // tslint:disable-next-line:no-eval
        return eval( magic );
    }
}
