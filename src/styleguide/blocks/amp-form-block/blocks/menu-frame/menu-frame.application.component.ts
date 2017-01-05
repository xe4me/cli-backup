import { Component } from '@angular/core';
import { AmpButton } from '../../../../../app/components/amp-button/amp-button.component';
@Component( {
    selector : 'menu-frame',
    template : require( './menu-frame.application.component.html' ),
    styles   : [ require( './menu-frame.application.component.scss' ) ]
} )
export class MenuFrameApplicationBlockComponent {

    isSaveDisabled(){
        return false;
    }
}
