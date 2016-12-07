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
export class PostnoneSingleAccountPage {
    private verificatonDocUrl : string =
        Environments.property.DamContentUrl
        + 'amp/digitalhub/common/Documents/Find%20a%20form/Forms/NS3297_Identification_Verfication_Form.PDF';
}
