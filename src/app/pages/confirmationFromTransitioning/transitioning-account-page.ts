import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';
import {
    AmpButton ,
    Environments
} from 'amp-ddc-components';
@Component( {
    selector    : 'transitioning-account-page' ,
    template : require( './transitioning-account-page.html' ),
    styles: [ require( './transitioning-account-page.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class TransitioningAccountPage {
    constructor () {
    }
    private finish() : void {
        window.open( 'https://www.amp.com.au/bett3r', '_self' );
    }
}
