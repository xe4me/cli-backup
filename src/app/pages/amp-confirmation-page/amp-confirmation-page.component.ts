import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    AmpButton
} from 'amp-ddc-components';

@Component( {
    selector        : 'amp-confirmation-page' ,
    template        : require( './amp-confirmation-page.component.html' ) ,
    styles          : [ require( './amp-confirmation-page.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush,
    inputs   : [
        'title'
    ],
} )
export class AmpConfirmationPageComponent {

    public onPdfButtonClick () {
        console.log('onPdfButtonClick');
    }

    public onFinishButtonClick() {
        console.log('onFinishButtonClick');
    }

}
