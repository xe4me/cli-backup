import {
    Component ,
    Input ,
    ChangeDetectionStrategy ,
    ViewChild ,
    ViewEncapsulation ,
    OnInit
} from '@angular/core';

import { DomUtils } from '../../../../../app/modules/amp-utils/dom-utils';
import { DeviceService } from '../../../../../app/services/device/device.service';

@Component( {
    selector        : 'amp-pop-down' ,
    template        : require( './amp-pop-down.component.html' ) ,
    styles          : [ require( './amp-pop-down.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    encapsulation   : ViewEncapsulation.None
} )

export class AmpPopDownComponent implements OnInit {
    @ViewChild( 'popDown' ) popDown;
    @Input( 'id' ) id : string = '';
    @Input( 'hasInnerPadding' ) hasInnerPadding : boolean = true;
    @Input( 'isFullWidth' ) isFullWidth : boolean = true;
    @Input( 'align' ) align : string = 'left';

    private domUtils = null;
    private isMobile = false;

    constructor( private deviceService : DeviceService ) {
       this.domUtils = new DomUtils();
    }

    public ngOnInit () {
        this.isMobile = this.deviceService.isMobile();
    }

    private hide = () : void => {
        let popDown = this.popDown.nativeElement;

        if (this.domUtils.isVisible(popDown)) {
            this.domUtils.hide(popDown);
        }
    }
}
