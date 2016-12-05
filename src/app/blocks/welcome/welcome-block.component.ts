import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    OnInit ,
    ViewContainerRef
} from '@angular/core';
import {
    FormControl ,
    Validators
} from '@angular/forms';
import {
    AmpButton ,
    ProgressObserverService ,
    FormBlock ,
    FormModelService ,
    ScrollService ,
    AmpIntroBlockComponent
} from 'amp-ddc-components';
import { ViewChild } from '@angular/core';
import { Constants } from '../../shared';
import { FDN } from '../../forms/better-form/Application.fdn';
@Component( {
    selector        : 'welcome-block' ,
    templateUrl     : './welcome-block.component.html' ,
    changeDetection : ChangeDetectionStrategy.OnPush ,
    styles          : [ require( './welcome-block.component.scss' ) ]
} )
export class WelcomeBlockComponent extends FormBlock implements OnInit {
    @ViewChild( AmpIntroBlockComponent ) public ampIntro;
    private nextBlockChanged : boolean = false;
    private newOrExistingCustomerControl : FormControl;
    private Constants = Constants;
    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ,
                  private viewReference : ViewContainerRef ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        if ( this.__controlGroup.contains( this.__custom.controls[ 0 ].id )) {
            this.newOrExistingCustomerControl = <FormControl> this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        } else {
            this.newOrExistingCustomerControl = new FormControl( null , Validators.required );
            this.__controlGroup.addControl( this.__custom.controls[ 0 ].id, this.newOrExistingCustomerControl );
        }
    }

    private onNewOrExisting ( newOrExistingCustomer : string ) {
        this.newOrExistingCustomerControl.setValue( newOrExistingCustomer );
        this.newOrExistingCustomerControl.markAsTouched();
        if ( this.nextBlockChanged ) {
            this.__removeNext( this.viewReference );
            this.nextBlockChanged = false;
        }
        if ( newOrExistingCustomer === Constants.existingCustomer ) {
            this.__loadNext( this.__custom.optionalBlocks[ 0 ] , this.viewReference )
                .then( () => {
                    this.ampIntro.proceed()
                        .then( () => {
                            this.fireMockScrolledEvent([ 'Application' , 'MyAMPLoginBlock' ]);
                        } );
                } );
            this.nextBlockChanged = true;
            return;
        }

        this.ampIntro.proceed()
            .then( () => {
                this.fireMockScrolledEvent(FDN.NewOrContinueApplicationBlock);
            } );
    }

    private fireMockScrolledEvent (fdn) {
        this.scrollService.$scrolled.emit( {
            componentSelector : [ ...fdn, 'block' ].join( '-' ) ,
            section           : null
        } );

    }
}
