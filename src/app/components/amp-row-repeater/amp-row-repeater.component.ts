import {
    ContentChild , Component , TemplateRef , ChangeDetectionStrategy , Input , OnInit ,
    OnDestroy
} from "@angular/core";
import { FormArray , FormGroup } from "@angular/forms";
import { AmpFormRowComponent } from "../../blocks/amp-form-row/amp-form-row.component";
@Component( {
    selector        : 'amp-row-repeater' ,
    queries         : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template        : `
        <amp-form-row *ngFor="let controlGroup of controlArray.controls ; let i = index;">
            <amp-button *ngIf="i>0" [context]="context" (click)="remove(i)"
                        class="btn btn-anchor right-aligned">
                <span class="icon icon--close" aria-hidden="true"></span> {{ removeBtn }}
            </amp-button>
            <template
                [ngTemplateOutlet]="itemTemplate"
                [ngOutletContext]="{ controlGroup: controlGroup, index: i }">
            </template>
        </amp-form-row>
        <amp-button *ngIf="controlArray.controls.length>0" [context]="context" (click)="add()"
                    class="btn btn-anchor btn-full">
            <span class="icon icon--plus-filled" aria-hidden="true"></span> {{ addBtn }}
        </amp-button>
    ` ,
    styles          : [ require( './amp-row-repeater.scss' ).toString() ] ,
    directives      : [ AmpFormRowComponent ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpRowRepeaterComponent implements OnInit, OnDestroy {
    @Input( 'controlGroup' ) controlGroup : FormGroup;
    @Input( 'context' ) context;
    @Input( 'id' ) id;
    @Input( 'removeBtn' ) removeBtn;
    @Input( 'addBtn' ) addBtn;

    ngOnInit () : void {
        if ( this.controlGroup && this.id ) {
            this.controlGroup.addControl( this.id , this.controlArray );
        }
        this.init();
    }

    private init () {
        if ( this.controlArray.controls.length === 0 ) {
            this.add();
        }
    }

    ngOnDestroy () : void {
        if ( this.controlGroup && this.id && this.controlGroup.contains( this.id ) ) {
            this.controlGroup.removeControl( this.id );
        }
    }

    private controlArray : FormArray = new FormArray( [] );

    private add () {
        this.controlArray.push( new FormGroup( {} ) );
    }

    private remove ( _index : number ) {
        this.controlArray.removeAt( _index );
    }

    private reset () {
        while ( this.controlArray.length ) {
            this.controlArray.removeAt( 0 )
        }
    }
}