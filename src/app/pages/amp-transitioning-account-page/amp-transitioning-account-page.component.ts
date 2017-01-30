import {
    Component,
    ChangeDetectionStrategy,
    Input
} from '@angular/core';

import { AmpButton } from 'amp-ddc-components';

@Component( {
    selector        : 'amp-transitioning-account-page' ,
    template        : require( './amp-transitioning-account-page.component.html' ) ,
    styles          : [ require( './amp-transitioning-account-page.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpTransitioningAccountPageComponent {

    @Input() title;

    public onFinishButtonClick() {
        console.log('onFinishButtonClick');
    }

}