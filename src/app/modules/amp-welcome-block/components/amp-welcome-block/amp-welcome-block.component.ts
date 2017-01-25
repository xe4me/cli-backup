import {
    Component ,
    ViewChild,
    ViewContainerRef ,
    ChangeDetectorRef ,
    ElementRef ,
    ViewEncapsulation
} from '@angular/core';
import { AmpButton } from '../../../amp-button/components/amp-button/amp-button.component';

import { AmpIntroBlockComponent } from '../../../amp-intro-block/components/amp-intro-block/amp-intro-block.component';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { ProgressObserverService } from '../../../../services/progress-observer/progress-observer.service';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
@Component( {
    selector   : 'amp-welcome-block' ,
    template     : require('./amp-welcome-block.component.html'),
    styles     : [ require( './amp-welcome-block.component.scss')] ,
    encapsulation: ViewEncapsulation.None
} )
export class AmpWelcomeBlockComponent extends FormBlock {
    @ViewChild('introBlockCmp') introBlockCmp:AmpIntroBlockComponent
    private static ACTIONS = {
        CONTINUE : 'continue',
        START    : 'start'
    };
    private damContentUrl = `${Environments.property.DamContentUrl}amp/digitalhub/common/images/systems/ddc/`;
    private slideUp = 'expanded';

    constructor ( saveService : SaveService,
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

    private getNextStep (action) {
        for (let item of this.__custom.actions ) {
            if (action === item.action) {
                return item.nextBlock;
            }
        }
    }

    private onContinueApplication() {
        let nextBlock = this.getNextStep(AmpWelcomeBlockComponent.ACTIONS.CONTINUE);
        this.loadAndScrollToNextBlock(nextBlock);
    }

    private onNewApplication() {
        let nextBlock = this.getNextStep(AmpWelcomeBlockComponent.ACTIONS.START);
        this.loadAndScrollToNextBlock(nextBlock);

    }

    private loadAndScrollToNextBlock(nextBlock) {
        if (nextBlock) {
                this.__loadNext( nextBlock , this.viewReference )
                    .then( (componentRef) => {
                       setTimeout(()=>{
                           console.log('!this.__isRetrieved',!this.__isRetrieved);
                            this.introBlockCmp
                                .proceed({animate:!this.__isRetrieved})
                                .then( () => {
                                    this.goNext(!this.__isRetrieved);
                                } );
                       });
                    } );
        } else {
            this.introBlockCmp
                .proceed({animate:!this.__isRetrieved})
                .then( () => {
                    this.goNext(!this.__isRetrieved);
                } );
        }      
    }

    goNext(mockScroll:boolean){
         this.scrollService.scrollToNextUndoneBlock(this.__form,undefined,{
            mock : mockScroll
        });
    }

}