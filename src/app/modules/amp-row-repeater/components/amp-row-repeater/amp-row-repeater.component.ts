import {
    ContentChild,
    Component,
    TemplateRef,
    ChangeDetectorRef,
    Output,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    OnInit,
    OnDestroy
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { AmpFormGroup } from '../../../../base-control';
@Component( {
    selector        : 'amp-row-repeater',
    queries         : {
        itemTemplate : new ContentChild( TemplateRef )
    },
    template        : `
        <div class="grid__container 1/1" [class.mt-60]="hasMarginTop" *ngFor="let controlGroup of controlArray.controls ; let i = index;">
            <div class="row-repeated__col-left {{ colLeftClass }}" [class.utils__push--left]="hasButtons">
                <template
                    [ngTemplateOutlet]="itemTemplate"
                    [ngOutletContext]="{ controlGroup: controlGroup, index: i }">
                </template>
            </div>
            <div *ngIf="hasButtons" class="row-repeated__col-right utils__push--left {{ colRightClass }}">
                <amp-button
                    *ngIf="rowCount > 1"
                    [context]="context"
                    (click)="removeAt(i)"
                    [disabled]="isInSummaryState"
                    class="btn btn-anchor row-repeated__btn-remove">
                    {{ removeBtn }}
                </amp-button>
            </div>
        </div>
        <amp-button
            *ngIf="controlArray.controls.length > 0 && hasButtons"
            [context]="context"
            (click)="add()"
            [disabled]="addBtnDisabled"
            class="btn btn-anchor btn-inline btn-add">
            <span class="icon icon--plus-filled" aria-hidden="true"></span> {{ addBtn }}
        </amp-button>
    `,
    styles          : [ require( './amp-row-repeater.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpRowRepeaterComponent implements OnInit, OnDestroy {
    @Input( 'controlGroup' ) controlGroup : AmpFormGroup;
    @Input( 'context' ) context;
    @Input( 'id' ) id;
    @Input( 'initialRowCount' ) initialRowCount : number;
    @Input( 'removeBtn' ) removeBtn;
    @Input( 'addBtn' ) addBtn;
    @Input( 'maxRows' ) maxRows : number                    = 9999;
    @Input( 'isInSummaryState' ) isInSummaryState : boolean = false;
    @Input( 'colLeftClass' ) colLeftClass : string          = '';
    @Input( 'colRightClass' ) colRightClass : string        = '';
    @Input( 'hasMarginTop' ) hasMarginTop : boolean         = true;
    @Input( 'hasButtons' ) hasButtons : boolean             = true;
    @Output( 'remove' ) $remove                             = new EventEmitter<any>();
    @Output( 'add' ) $add                                   = new EventEmitter<any>();
    public controlArray : FormArray;

    constructor( public _cd : ChangeDetectorRef ) {

    }

    public ngOnInit() : void {
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

    public ngOnDestroy() : void {
        if ( this.controlGroup && this.id && this.controlGroup.contains( this.id ) ) {
            this.controlGroup.removeControl( this.id );
        }
    }

    public init() {
        if ( this.rowCount === 0 ) {
            if ( isNaN( this.initialRowCount ) ) {
                this.add();
            } else {
                this.add( this.initialRowCount );
            }
        }
    }

    public add( count : number = 1 ) {
        for ( let i = 0; i < count; i++ ) {
            if ( isNaN( this.maxRows ) || this.rowCount >= this.maxRows ) {
                return;
            }
            let formGroupForArray   = new AmpFormGroup( {} );
            formGroupForArray.__fdn = this.controlGroup && this.controlGroup.__fdn ? [
                    ...this.controlGroup.__fdn,
                    this.id,
                    this.controlArray.length
                ] : [
                    'default-fdn-for-' + this.id,
                    this.controlArray.length
                ];
            this.controlArray.push( formGroupForArray );
            this.$add.emit( {
                addedGroup : formGroupForArray
            } );
        }
        this._cd.markForCheck();
    }

    public addIfGt( num : number ) {
        if ( this.controlArray && this.controlArray.length > num ) {
            this.add();
        }
    }

    public addIfGtE( num : number ) {
        let n = num - 1;
        this.addIfGt( n );
    }

    public addIfLtE( num : number ) {
        let n = num + 1;
        this.addIfLt( n );
    }

    public addIfLt( num : number ) {
        if ( this.controlArray && this.controlArray.length < num ) {
            this.add();
        }
    }

    public removeAt( _index : number ) {
        if ( _index === undefined ) {
            return;
        }
        this.controlArray.removeAt( _index );
        this.$remove.emit( _index );
        this._cd.markForCheck();
    }

    public removeLast() {
        this.removeAt( this.rowCount - 1 );
    }

    public removeAll() {
        while ( this.controlArray.length ) {
            this.controlArray.removeAt( 0 );
        }
        this._cd.markForCheck();
    }

    public get rowCount() : number {
        return this.controlArray ? this.controlArray.controls.length : 0;
    }

    public get addBtnDisabled() {
        return (this.maxRows === this.rowCount) || this.isInSummaryState;
    }
}
