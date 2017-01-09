import {
    Component,
    Input
} from '@angular/core';
import {
    Environments
} from 'amp-ddc-components';

@Component( {
    selector        : 'bett3r-exit-button' ,
    templateUrl     : './bett3r-exit-button.component.html'
} )

export class Bett3rExitButtonComponent {
    @Input( 'buttonLabel' ) private buttonLabel : string = 'finish';

    private finish() : void {
        window.open( `${Environments.property.AmpRootUrl}bett3r`, '_self' );
    }
}
