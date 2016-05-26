import { View , Component , OnInit , ChangeDetectorRef , provide , ViewChild } from 'angular2/core';
import { MATERIAL_DIRECTIVES } from 'ng2-material/all';
import { Control , CORE_DIRECTIVES , FORM_DIRECTIVES , FORM_PROVIDERS } from 'angular2/common';
import { ReviewBlockComponent } from '../../../../app/blocks/bolr/notification-form/review/review-block.component.ts';
import { FormModelService } from 'amp-ddc-ui-core/ui-core';
import { Observable }     from 'rxjs/Observable';
import { BlockID } from 'amp-ddc-ui-core/ui-core';
import { ControlGroup } from 'angular2/src/common/forms/model';
export class MockFormModelService {
    private model = {
        errors         : [] ,
        currentBlockID : new BlockID( null , 0 ) ,         // Defaults to the first block on the current page
        context        : {
            licensee                   : 'DEA_CHARTER' ,
            practicePrincipalFirstName : 'Darren' ,
            practicePrincipalLastName  : 'Mink' ,
            payeeId                    : 'BCABB-F' ,
            practiceName               : 'Pinnancle Financial pty ltd'
        } ,
        flags          : {
            introIsDone : false
        }
    };

    getFlags ( flag ) {
        return this.model.flags[ flag ];
    }

    getContext () : Observable<string> {
        return Observable.create( function( observer ) {
            observer.onNext( {
                licensee                   : 'DEA_CHARTER' ,
                practicePrincipalFirstName : 'Darren' ,
                practicePrincipalLastName  : 'Mink' ,
                payeeId                    : 'BCABB-F' ,
                practiceName               : 'Pinnancle Financial pty ltd'
            } );
            observer.onCompleted();
            return function() {
                //Clean up logic
            };
        } );
    }

    present ( data ) {
        this.model.currentBlockID = new BlockID( null , 1 );
    }

    getModel () {
        return this.model;
    }
}
@Component( {
    selector  : 'bolr-review-block-basic-usage' ,
    providers : [ provide( FormModelService , { useClass : MockFormModelService } ) ]
} )
@View( {
    templateUrl : 'src/styleguide/blocks/bolr/review/basic_usage.html' ,
    styles      : [ require( './basic_usage' ).toString() ] ,
    directives  : [ ReviewBlockComponent ]
} )

export default class BOLRReviewBlockBasicUsage implements OnInit {
    @ViewChild( ReviewBlockComponent )
    private _reviewBlockComponent : ReviewBlockComponent;

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    ngOnInit () {
        setTimeout( () => this._reviewBlockComponent._id = new BlockID( null , 0 ) , 0 );
    }
}
