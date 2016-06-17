import { View , Component , OnInit , ChangeDetectorRef , provide , ViewChild } from '@angular/core';
import { PartnershipManagerBlockComponent } from '../../../../../app/blocks/bolr/notification-form/dialogue-state/partnership-manager/partnership-manager.component';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
@Component( {
    selector : 'partnership-manager-block-basic-usage'
} )
@View( {
    templateUrl : 'src/styleguide/blocks/bolr/dialogue/partnership-manager/basic_usage.html' ,
    styles      : [ require( './basic_usage.scss' ).toString() ] ,
    directives  : [ PartnershipManagerBlockComponent ]
} )
export default class BOLRPartnershipManagerlBlockBasicUsage {
    constructor ( private _cd : ChangeDetectorRef ) {
    }
}
