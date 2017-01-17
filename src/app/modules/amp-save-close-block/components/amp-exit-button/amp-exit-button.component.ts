import {
    Component,
    Input
} from '@angular/core';

import { Environments } from '../../../../abstracts/environments/environments.abstract';
import { SaveAndCloseService } from '../../../../services';

@Component( {
    selector        : 'amp-exit-button' ,
    template        : require ('./amp-exit-button.component.html' )
} )

export class AmpExitButtonComponent {
    @Input( 'buttonLabel' ) private buttonLabel : string = 'finish';
    @Input( 'applicationURL' ) private applicationURL : string = '';

    constructor (private saveCloseService : SaveAndCloseService) {
        this.applicationURL = `${Environments.property.AmpRootUrl}${this.saveCloseService.exitUrl}`;
    }
    private finish() : void {
        window.open(  this.applicationURL, '_self' );
    }
}
