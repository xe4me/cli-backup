import {
    Component ,
    Input ,
    ChangeDetectionStrategy ,
    ViewChild ,
    ViewEncapsulation
} from '@angular/core';

import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';

@Component( {
    selector        : 'amp-pop-down' ,
    template        : require( './amp-pop-down.component.html' ) ,
    styles          : [ require( './amp-pop-down.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    encapsulation   : ViewEncapsulation.None
} )

export class AmpPopDownComponent {
    @ViewChild( 'popDown' ) popDown;
    @Input( 'id' ) id : string = '';
    @Input( 'innerPadding' ) innerPadding : boolean = true;
    @Input( 'align' ) align : string = 'left';

    private domUtils = null;

    constructor() {
       this.domUtils = new DomUtils();
    }

    private hide = () : void => {
        let popDown = this.popDown.nativeElement;

        if (this.domUtils.isVisible(popDown)) {
            this.domUtils.hide(popDown);
        }
    };
}
