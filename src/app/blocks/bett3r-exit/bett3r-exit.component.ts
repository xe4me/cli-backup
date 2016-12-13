import {
    Component,
    Input
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';

@Component( {
    selector        : 'bett3r-exit' ,
    templateUrl     : './bett3r-exit.component.html'
} )

export class Bett3rExitBlock {
    @Input( 'name' ) name : string = 'finish';
    private finish() : void {
        window.open( `${Environments.property.AmpRootUrl}bett3r`, '_self' );
    }
}
