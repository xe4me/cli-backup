import {
    Component,
    ViewChild,
    ViewContainerRef,
    ChangeDetectorRef
} from '@angular/core';
import { AmpIntroBlockComponent } from '../../../amp-intro-block/components/amp-intro-block/amp-intro-block.component';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
@Component( {
    selector : 'amp-welcome-block',
    template : require( './amp-welcome-block.component.html' ),
    styles   : [ require( './amp-welcome-block.component.scss' ) ]
} )
export class AmpWelcomeBlockComponent extends FormBlock {
    private static ACTIONS = {
        CONTINUE : 'continue',
        START    : 'start'
    };
    @ViewChild( 'introBlockCmp' ) introBlockCmp : AmpIntroBlockComponent;
    private damContentUrl  = `${Environments.property.DamContentUrl}amp/digitalhub/common/images/systems/ddc/`;

    constructor( saveService : SaveService,
                 _cd : ChangeDetectorRef,
                 scrollService : ScrollService,
                 private viewReference : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
        this.disableAutoSave();
    }

    public ngAfterViewInit() {
        if ( this.__isRetrieved ) {
            this.onNewApplication(); // don't show the retrieve block if is hydrated
        }
        super.ngAfterViewInit();
    }

    private getNextStep( action ) {
        for ( let item of this.__custom.actions ) {
            if ( action === item.action ) {
                return item.nextBlock;
            }
        }
    }

    private onContinueApplication() {
        let nextBlock = this.getNextStep( AmpWelcomeBlockComponent.ACTIONS.CONTINUE );
        this.loadAndScrollToNextBlock( nextBlock );
    }

    private onNewApplication() {
        let nextBlock = this.getNextStep( AmpWelcomeBlockComponent.ACTIONS.START );
        this.loadAndScrollToNextBlock( nextBlock );

    }

    private loadAndScrollToNextBlock( nextBlock ) {
        if ( nextBlock ) {
            this.__loadNext( nextBlock, this.viewReference )
                .then( ( componentRef ) => {
                    setTimeout( () => {
                        this.introBlockCmp
                            .proceed( { animate : !this.__isRetrieved } )
                            .then( () => {
                                this.goNext( !this.__isRetrieved );
                            } );
                    } );
                } );
        } else {
            this.introBlockCmp
                .proceed( { animate : !this.__isRetrieved } )
                .then( () => {
                    this.goNext( !this.__isRetrieved );
                } );
        }
    }

    private goNext( mockScroll : boolean ) {
        this.scrollService.scrollToNextUndoneBlock( this.__form, undefined, {
            mock : mockScroll
        } );
    }

}
