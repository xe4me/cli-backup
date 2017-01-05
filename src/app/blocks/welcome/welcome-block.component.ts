import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit,
    ViewContainerRef,
    ViewChild
} from '@angular/core';
import {
    FormBlock,
    ScrollService,
    SaveService,
    AmpIntroBlockComponent
} from 'amp-ddc-components';
import { FDN } from '../../forms/better-form/Application.fdn';
@Component( {
    selector        : 'welcome-block',
    templateUrl     : './welcome-block.component.html',
    changeDetection : ChangeDetectionStrategy.OnPush,
    styles          : [ require( './welcome-block.component.scss' ) ]
} )
export class WelcomeBlockComponent extends FormBlock implements AfterViewInit {
    @ViewChild( AmpIntroBlockComponent ) public ampIntro;
    private loadedNextBlock : boolean = false;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private viewReference : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();
        if ( this.__isRetrieved ) {
            this.onNewApplication(); // don't show the retrieve block if is hydrated
        }
    }

    private onContinueApplication () {
        if ( !this.loadedNextBlock ) {
            this.__loadNext( this.__custom.optionalBlocks.ContinueApplicationBlock, this.viewReference )
                .then( ( componentRef ) => {
                    this.ampIntro
                        .proceed()
                        .then( () => {
                            this.fireMockScrolledEvent( componentRef.instance.__fdn );
                        } );
                } );
        }
        this.loadedNextBlock = true;
    }

    private onNewApplication () {
        this.ampIntro
            .proceed()
            .then( () => {
                this.fireMockScrolledEvent( FDN.NewOrExistingCustomer );
            } );
    }

    private fireMockScrolledEvent ( fdn ) {
        this.scrollService.$scrolled.emit( {
            componentSelector : [ ...fdn, 'block' ].join( '-' ),
            section           : null
        } );
    }
}
