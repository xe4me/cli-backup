import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewInit,
    ViewContainerRef,
    ComponentRef,
    OnDestroy
} from '@angular/core';
import { SectionRepeaterComponent } from '../../../../sections/section-repeater/section-repeater.component';
import { FormBlock } from '../../../../form-block';
import { SaveService, ScrollService } from '../../../../services';
import { AmpRowRepeaterComponent } from '../../../amp-row-repeater';

const custom = require( './amp-single-joint-block.json' );

@Component( {
    selector        : 'amp-single-joint-block',
    template        : require( './amp-single-joint-block.component.html' ),
    styles          : [ require( './amp-single-joint-block.component.scss' ).toString() ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpSingleJointBlockComponent extends FormBlock implements OnInit, AfterViewInit, OnDestroy {

    protected __custom = custom;
    private repeater : AmpRowRepeaterComponent;

    constructor( saveService : SaveService,
                 _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 private viewContainerRef : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
    }

    public ngOnInit() {
        this.__loadNext( this.__custom.optionalBlocks.repeater, this.viewContainerRef )
            .then( ( componentRef : ComponentRef<SectionRepeaterComponent> ) => {
                this.repeater = componentRef.instance.repeater;
            } );
    }

    public onSingleOrJointSelect( singleJointIndicator : string ) {
        if ( !this.repeater ) {
            return;
        }
        let jointValue = this.__custom.controls.singleOrJoint.options[ 1 ].value;
        if ( singleJointIndicator === jointValue ) {
            this.repeater.addIfLt( 2 );
        } else {
            if ( this.repeater.rowCount > 1 ) {
                this.repeater.removeLast();
            }
        }
        setTimeout( ()=> {
            this.onNext();
        })
    }

}
