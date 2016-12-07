import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

import {
    AmpButton
} from 'amp-ddc-components';

@Component( {
    selector    : 'normal-account-page' ,
    template: require( './normal-account-page.html' ) ,
    styles: [ require( './normal-account-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class NormalAccountPage {
}
