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
        <div class="grid__container 1/1 mt-60" *ngFor="let controlGroup of controlArray.controls ; let i = index;">
            <div class="row-repeated__col-left utils__push--left {{ colLeftClass }}">
                <template
                    [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{ controlGroup: controlGroup, index: i }">
                </template>
            </div>
            <div class="row-repeated__col-right utils__push--left {{ colRightClass }}">
                <amp-button 
                    *ngIf="rowCount > 1" 
                    [context]="context" 
                    (click)="remove(i)"
                    [disabled]="isInSummaryState"
                    class="btn btn-anchor row-repeated__btn-remove">
                    {{ removeBtn }}
                </amp-button>
            </div>
        </div>
        <amp-button
            *ngIf="controlArray.controls.length > 0"
            [context]="context"
            (click)="add()"
            [disabled]="addBtnDisabled"
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
    @Input( 'maxRows' ) maxRows : number = 9999;
    @Input( 'isInSummaryState' ) isInSummaryState : boolean = false;
    @Input( 'colLeftClass' ) colLeftClass : string = '';
    @Input( 'colRightClass' ) colRightClass : string = '';
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
        if ( this.rowCount === 0 ) {
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

    private get rowCount () {
        return this.controlArray.controls.length;
    }

    private get addBtnDisabled () {
        return (this.maxRows === this.rowCount) || this.isInSummaryState;
    }
}
