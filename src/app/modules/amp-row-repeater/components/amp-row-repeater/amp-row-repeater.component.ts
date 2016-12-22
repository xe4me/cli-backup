import {
    ContentChild,
    Component,
    TemplateRef,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    OnDestroy
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { AmpFormGroup } from '../../../../base-control';
@Component( {
    selector : 'amp-row-repeater',
    queries : {
        itemTemplate : new ContentChild( TemplateRef )
    },
    template : `
        <div class="grid__container 1/1" [class.mt-60]="hasMarginTop" *ngFor="let controlGroup of controlArray.controls ; let i = index;">
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
    `,
    styles : [ require( './amp-row-repeater.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpRowRepeaterComponent implements OnInit, OnDestroy {
    @Input( 'controlGroup' ) controlGroup : AmpFormGroup;
    @Input( 'context' ) context;
    @Input( 'id' ) id;
    @Input( 'removeBtn' ) removeBtn;
    @Input( 'addBtn' ) addBtn;
    @Input( 'maxRows' ) maxRows : number = 9999;
    @Input( 'isInSummaryState' ) isInSummaryState : boolean = false;
    @Input( 'colLeftClass' ) colLeftClass : string = '';
    @Input( 'colRightClass' ) colRightClass : string = '';
    @Input( 'hasMarginTop' ) hasMarginTop : boolean = true;

    private controlArray : FormArray;

    public ngOnInit () : void {
        if ( this.controlGroup && this.id ) {
            if ( this.controlGroup.contains( this.id ) ) {
                this.controlArray = <FormArray> this.controlGroup.get( this.id );
            } else {
                this.controlArray = new FormArray( [] );
                this.controlGroup.addControl( this.id, this.controlArray );
            }
        }
        this.init();
    }

    public ngOnDestroy () : void {
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
        let formGroupForArray = new AmpFormGroup( {} );
        formGroupForArray.__fdn = this.controlGroup && this.controlGroup.__fdn ? [
            ...this.controlGroup.__fdn,
            this.id,
            this.controlArray.length
        ] : [
            'default-fdn-for-' + this.id,
            this.controlArray.length
        ];
        this.controlArray.push( formGroupForArray );
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
        return this.controlArray ? this.controlArray.controls.length : 0;
    }

    private get addBtnDisabled () {
        return (this.maxRows === this.rowCount) || this.isInSummaryState;
    }
}
