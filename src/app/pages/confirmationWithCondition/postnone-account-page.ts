import {
    Component
} from '@angular/core';
import {
    AmpButton,
    SaveReceiptPageComponent,
    AmpHttpService
} from 'amp-ddc-components';

import {AccountsListBlock} from '../../blocks/accounts-list/accounts-list.component';

@Component( {
    selector    : 'postnone-account-page' ,
    directives: [AccountsListBlock],
    template: require( './postnone-account-page.html' )
} )
export class PostnoneAccountPage {
    constructor (private http : AmpHttpService) {
    }
    private getAccountPDF() : void {

    }
    private finish() : void {
        window.open( 'https://www.amp.com.au/Bett3r', '_self' );
    }
}
