import {
    Component , ContentChild , TemplateRef , OnInit ,
    Input , ChangeDetectionStrategy , ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from "@angular/forms";
import { AmpKeysPipe , AmpValuesPipe } from "../../../../";
@Component( {
    selector : "error-item" ,
    template : '<ng-content *ngIf="error===selector"></ng-content>'
} )
export class AmpErrorItemComponent {
    @Input( 'selector' ) selector;
    @Input( 'error' ) error;
}
@Component(
    {
        queries    : {
            itemTemplate : new ContentChild( TemplateRef )
        } ,
        selector   : 'amp-error' ,
        template   : require( './amp-error.component.html' ) ,
        styles     : [ require( './amp-error.component.scss' ).toString() ] ,
        directives : [ AmpErrorItemComponent ] ,
        pipes      : [ AmpValuesPipe , AmpKeysPipe ]
    } )
export class AmpErrorComponent implements OnInit {
    @Input() controlGroup : FormGroup;
    @Input() controlId;

    constructor ( private _cd : ChangeDetectorRef ) {
    }

    /*
     * TODO : We need to change the changeDetectionStrategy of this component to be OnPush
     * But the problem is then how should this component should be notified of updates ?
     * Bellow is one way that I coult work out , but I need more time to spend to make it 100 working , thus I won't
     * remove the com
     * */
    ngOnInit () : void {
        // if ( this.controlGroup ) {
        //     this.controlGroup
        //         .statusChanges
        //         .subscribe( (changes)=> {
        //             console.log('changes',changes);
        //             this._cd.markForCheck();
        //         } )
        // }
    }
}
