import {
    Component
} from '@angular/core';

import {
    AmpButton
} from 'amp-ddc-components';

import {AccountsListBlock} from '../../blocks/accounts-list/accounts-list.component';

@Component( {
    selector    : 'normal-account-page' ,
    directives: [AccountsListBlock],
    template: require( './normal-account-page.html' ) ,
    styles: [ require( './normal-account-page.scss' ) ]
} )
export class NormalAccountPage {
    private getAccountPDF() : void {

    }
    private finish() : void {
        window.open( 'https://www.amp.com.au/bett3r', '_self' );
    }
}
