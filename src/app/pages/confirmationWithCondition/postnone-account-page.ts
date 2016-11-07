import {
    Component,
    EventEmitter, OnInit
} from '@angular/core';
import {
    AmpButton,
    SaveReceiptPageComponent,
    AmpHttpService
} from 'amp-ddc-components';

import {AccountsListBlock} from "../../blocks/accounts-list/accounts-list.component";

@Component( {
    selector    : 'postnone-account-page' ,
    directives: [AccountsListBlock],
    template: require( './postnone-account-page.html' )
} )
export class PostnoneAccountPage{
    constructor (private http : AmpHttpService) {
    }
    getAccountPDF() : void {

    }
    finish() : void {

    }
    }
