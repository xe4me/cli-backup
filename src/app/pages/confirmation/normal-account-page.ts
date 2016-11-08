import {
    Component,
    EventEmitter, OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
    AmpButton,
    SaveReceiptPageComponent,
    AmpHttpService
} from 'amp-ddc-components';

import {AccountsListBlock} from '../../blocks/accounts-list/accounts-list.component';

@Component( {
    selector    : 'normal-account-page' ,
    directives: [AccountsListBlock],
    template: require( './normal-account-page.html' )
} )
export class NormalAccountPage {

    constructor (private http : AmpHttpService) {
    }
    private goToIOSAppStore() : void {

    }
    private goToGooglePlayStore() : void {

    }
    private getAccountPDF() : void {

    }
    private finish() : void {

    }
}
