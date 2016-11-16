import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    AmpButton ,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector    : 'postnone-account-page' ,
    template : require( './postnone-account-page.html' ),
    styles: [ require( './postnone-account-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
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
