import {
    Component ,
    trigger ,
    state ,
    style ,
    animate ,
    transition ,
    ViewContainerRef ,
    ChangeDetectorRef ,
    ElementRef
} from '@angular/core';
import { AmpButton } from '../../../amp-button/components/amp-button/amp-button.component';
import { FormBlock } from '../../../../form-block';
import { SaveService } from '../../../../services/save/save.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';
import { ProgressObserverService } from '../../../../services/progress-observer/progress-observer.service';
import { Environments } from '../../../../abstracts/environments/environments.abstract';
@Component( {
    selector   : 'amp-welcome-block' ,
    // directives : [ AmpButton ] ,
    host       : {
        '[@slideUp]' : 'slideUp',
        '[style.background-image]' : '__custom.backgroundImageUrl'
    } ,
    template     : require('./amp-welcome-block.component.html'),
    styles     : [ require( './amp-welcome-block.component.scss')] ,
    encapsulation: ViewEncapsulation.None,
    animations : [
        trigger(
            'slideUp' ,
            [
                state( 'collapsed, void' , style( {
                    height           : '0px' ,
                    'min-height'     : '0px' ,
                    opacity          : '0' ,
                    'padding-left'   : '0px' ,
                    'padding-right'  : '0px' ,
                    'padding-bottom' : '0px' ,
                    'padding-top'    : '0px' ,
                    display          : 'none'
                } ) ) ,
                state( 'expanded' , style( {
                    height           : '*' ,
                    'min-height'     : '*' ,
                    opacity          : '1' ,
                    'padding-left'   : '*' ,
                    'padding-right'  : '*' ,
                    'padding-bottom' : '*' ,
                    'padding-top'    : '*' ,
                    display          : 'block'
                } ) ) ,
                transition(
                    'collapsed <=> expanded' , [ animate( 800 ) ] )
            ] )
    ]
} )
export class AmpWelcomeBlockComponent extends FormBlock {
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
        console.error('loading welcomess');
    }

    // public ngAfterViewInit() {
    //     super.ngAfterViewInit();
    //     if ( this.__isRetrieved ) {
    //         this.onNewApplication(); // don't show the retrieve block if is hydrated
    //     }
    // }

    public proceed () : Promise<string> {
        return new Promise( ( resolve , reject ) => {
            this.slideUp = 'collapsed';
            setTimeout( () => {
                resolve();
            } , 801 );
        } );
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
                this.proceed()
                    .then( () => {
                        // console.log('nextBlock.blockFdn '+nextBlock.custom.blockFdn);
                        this.fireMockScrolledEvent(nextBlock.custom.blockFdn);
                    } );
            } );
        }
    }

    private fireMockScrolledEvent (fdn) {
        // console.log('fireMockScrolledEvent: ' + fdn);
        // console.log('componentSelector: ' + [ ...fdn, 'block' ].join( '-' ));
        this.scrollService.$scrolled.emit( {
            componentSelector : [ ...fdn, 'block' ].join( '-' ) ,
            section           : null
        } );
    }

}
