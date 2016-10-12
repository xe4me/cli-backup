import {
    ContentChild , Component , TemplateRef , ChangeDetectionStrategy , Input , OnInit ,
    OnDestroy
} from '@angular/core';
import { FormArray , FormGroup } from '@angular/forms';
@Component( {
    selector        : 'amp-row-repeater' ,
    queries         : {
        itemTemplate : new ContentChild( TemplateRef )
    } ,
    template        : `
        <div class="grid__container 1/1" *ngFor="let controlGroup of controlArray.controls ; let i = index;">
            <div class="utils__push--left">
                <template
                    [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{ controlGroup: controlGroup, index: i }">
                </template>
            </div>
            <div class="utils__push--left">
                <amp-button *ngIf="i > 0" [context]="context" (click)="remove(i)"
                            class="btn btn-anchor utils__push--left">
                    <span class="icon icon--close" aria-hidden="true"></span> {{ removeBtn }}
                </amp-button>
            </div>
        </div>
        <amp-button
            *ngIf="controlArray.controls.length > 0"
            [context]="context"
            (click)="add()"
            [disabled]="maxRows === controlArray.controls.length"
            class="btn btn-anchor btn-inline">
            <span class="icon icon--plus-filled" aria-hidden="true"></span> {{ addBtn }}
        </amp-button>
    ` ,
    styles          : [ require( './amp-row-repeater.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpRowRepeaterComponent implements OnInit, OnDestroy {
    @Input( 'controlGroup' ) controlGroup : FormGroup;
    @Input( 'context' ) context;
    @Input( 'id' ) id;
    @Input( 'removeBtn' ) removeBtn;
    @Input( 'addBtn' ) addBtn;
    @Input( 'maxRows' ) maxRows : Number = 9999;
    private controlArray : FormArray     = new FormArray( [] );

    ngOnInit () : void {
        if ( this.controlGroup && this.id ) {
            this.controlGroup.addControl( this.id , this.controlArray );
        }
        this.init();
    }

    ngOnDestroy () : void {
        if ( this.controlGroup && this.id && this.controlGroup.contains( this.id ) ) {
            this.controlGroup.removeControl( this.id );
        }
    }

    private init () {
        if ( this.controlArray.controls.length === 0 ) {
            this.add();
        }
    }

    private add () {
        this.controlArray.push( new FormGroup( {} ) );
    }

    private remove ( _index : number ) {
        this.controlArray.removeAt( _index );
    }

    private reset () {
        while ( this.controlArray.length ) {
            this.controlArray.removeAt( 0 );
        }
    }
}
