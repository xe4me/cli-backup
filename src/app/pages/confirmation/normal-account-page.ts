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
    selector    : 'normal-account-page' ,
    directives: [AccountsListBlock],
    template: require( './normal-account-page.html' ) ,
    styles: [ require( './normal-account-page.scss' ) ]
} )
export class NormalAccountPage {

    constructor (private http : AmpHttpService) {
    }
    private goToIOSAppStore() : void {
        window.open( 'https://itunes.apple.com/au/app/my-amp/id763144972?mt=8', '_blank' );
    }
    private goToGooglePlayStore() : void {
        window.open( 'https://play.google.com/store/apps/details?id=au.com.amp.myportfolio.android&hl=en', '_blank' );
    }
    private getAccountPDF() : void {

    }
    private finish() : void {
        window.open( 'https://www.amp.com.au/Bett3r', '_self' );
    }
}
