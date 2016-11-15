import {
    Component
} from '@angular/core';
import {
    AmpButton ,
    Environments
} from 'amp-ddc-components';

import {
    AccountsListBlock
} from '../../blocks/accounts-list/accounts-list.component';

@Component( {
    selector    : 'postnone-account-page' ,
    directives : [AccountsListBlock],
    template : require( './postnone-account-page.html' ),
    styles: [ require( './postnone-account-page.scss' ) ]
} )
export class PostnoneAccountPage {
    private verificatonDocUrl : string =
        Environments.property.DamContentUrl
        + 'amp/digitalhub/common/Documents/Find%20a%20form/Forms/NS3297_Identification_Verfication_Form.PDF';
    private getAccountPDF() : void {

    }
    private finish() : void {
        window.open( 'https://www.amp.com.au/bett3r', '_self' );
    }
}
