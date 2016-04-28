import { View , Component , ChangeDetectorRef } from 'angular2/core';
import { ContactDetailsBlockComponent } from '../../../../../app/blocks/bolr/dialogue-state/contact-details/contact-details-block.component.ts';
import { ProgressObserverService } from "amp-ddc-ui-core/ui-core";
@Component( {
    selector  : 'bolr-contact-details-block-basic-usage' ,
    providers : [ ProgressObserverService ]
} )
@View( {
    templateUrl : 'src/styleguide/blocks/bolr/dialogue/contact-details/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ ContactDetailsBlockComponent ]
} )
export default class BOLRContactDetailsBlockBasicUsage {//implements AfterViewInit {
    constructor ( private _cd : ChangeDetectorRef ) {
        
    }
}
