import { Component , ChangeDetectorRef } from '@angular/core';
import { StickyProgressHeaderBlockComponent } from '../../../../app/blocks/bolr/notification-form/sticky-progress-header-block/sticky-progress-header-block.component';
@Component( {
    selector    : 'sticky-progress-header-block-basic-usage' ,
    templateUrl : 'src/styleguide/blocks/bolr/sticky-progress-header/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ StickyProgressHeaderBlockComponent ]
} )

export default class StickyProgressHeaderBlockBasicUsage {//implements AfterViewInit {
    public determinateValue : number  = 30;
    public determinateValue2 : number = 30;

    constructor () {
        // Iterate every 100ms, non-stop
        setInterval( () => {
            this.determinateValue += 1;
            if ( this.determinateValue > 100 ) {
                this.determinateValue = 30;
            }
        } , 100 , 0 , true );
    }
}
