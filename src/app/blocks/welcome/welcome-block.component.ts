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
    private newOrExistingControl : FormControl;

    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ,
                  private viewReference : ViewContainerRef ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        this.__controlGroup
            .addControl( this.__custom.controls[ 0 ].id , new FormControl( null , Validators.required ) );
        this.newOrExistingControl = <FormControl> this.__controlGroup.get( this.__custom.controls[ 0 ].id );
    }

    private onNewOrExisting ( newOrExisting : string ) {
        this.newOrExistingControl.setValue( newOrExisting );
        this.newOrExistingControl.markAsTouched();
        if ( this.nextBlockChanged ) {
            this.__removeNext( this.viewReference );
            this.nextBlockChanged = false;
        }
        if ( newOrExisting === 'existing' ) {
            this.__loadNext( this.__custom.optionalBlocks[ 0 ] , this.viewReference )
                .then( () => {
                    this.ampIntro.proceed()
                        .then( () => {
                            this.fireMockScrolledEvent();
                        } );
                } );
            this.nextBlockChanged = true;
            return;
        }

        this.ampIntro.proceed()
            .then( () => {
                this.fireMockScrolledEvent();
            } );
    }

<<<<<<< HEAD
    private onMyAMPLogin () {
        // TODO: Not sure if this is the correct entry point, only have a 2 min chat with Cheryl.
        // As per above, hack the newOrExistingControl
        const newOrExistingControl = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        newOrExistingControl.setValue( 'hackingTheWelcomeBlock' );
        newOrExistingControl.markAsTouched();

        this.__loadNext( this.__custom.optionalBlocks[ 1 ] , this.viewReference )
            .then( () => {
                this.ampIntro.proceed()
                    .then( () => {
                        this.onNext();
                    } );
            } );
        this.nextBlockChanged = true;
        return;

        
=======
    private fireMockScrolledEvent () {
        this.scrollService.$scrolled.emit( {
            componentSelector : [ ...FDN.SingleOrJoint , 'block' ].join( '-' ) ,
            section           : null
        } );

>>>>>>> develop
    }
}
