import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewInit,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
    LoadedBlockInfo,
    FormBlock,
    SaveService,
    ScrollService
} from 'amp-ddc-components';
import {
    Validators,
    FormControl
} from '@angular/forms';
import {
    Constants,
    ApplicantGeneratorService,
    SharedFormDataService
} from '../../shared';
@Component( {
    selector        : 'single-or-joint-block',
    templateUrl     : './single-or-joint-block.component.html',
    styles          : [ require( './single-or-joint-block.component.scss' ).toString() ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleOrJointBlockComponent extends FormBlock implements OnInit, AfterViewInit, OnDestroy {
    private static secondApplicantSectionIndex : number = 3;
    public applicant2Added : boolean                    = false;
    private jointApplicantKey : string;
    private singleApplicantKey : string;
    private saveSubscription : Subscription;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private applicantGenerator : ApplicantGeneratorService,
                  private viewContainerRef : ViewContainerRef,
                  private sharedDataService : SharedFormDataService ) {
        super( saveService, _cd, scrollService );
    }

    public ngOnInit () {
        this.singleApplicantKey = Constants.singleApplicant;
        this.jointApplicantKey  = Constants.jointApplicant;

        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl( this.__custom.controls[ 0 ].id, new FormControl( null, Validators.required ) );
        }

        if ( !this.__isRetrieved ) {
            this.saveSubscription = this.saveService.$onSaveResponse.subscribe( ( result ) => {
                if ( result.payload.meta && result.payload.meta.id ) {
                    this.storeReferenceIdInModel( result.payload.meta.id );
                    this.saveSubscription.unsubscribe();
                }
            } );

        }

        // load applicant 1
        this.__loadNext( this.applicantGenerator.getApplicantSection( 1 ), this.viewContainerRef );
        // Subscribe to notify when all the milad that are inside of ApplicantSection are successfully loaded ,
        // then go next
        // The reason is if you don't do this , when you start with a Single applicant and finish the form and go
        // and change to Joint applicant and click on Joint , it will take you to the submit page , where as it
        // should've taken you to the first block in Applicant2 !!!
        // It was happening because we don't know how long it might take to load Applicant2 but we where doing
        // onNext nevertheless , which is wrong, because if it takes 2 minute to load , we should wait and then go
        // to next undone block , which is inside the applicant2Section
        this.__onChildsLoaded( ( _loadedComponent : LoadedBlockInfo ) => {
            if ( _loadedComponent.name === 'Applicant2Section' ) {
                this.applicant2Added = true;
                this.onNext();
            }
        } );
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();

        if ( this.__isRetrieved ) {
            this.storeReferenceIdInModel();
            let singleJointControl = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
            if ( singleJointControl && singleJointControl.value === this.jointApplicantKey ) {
                this.onJointApplication();
            }
        }
    }

    public ngOnDestroy () {
        if ( this.saveSubscription && !this.saveSubscription.closed ) {
            this.saveSubscription.unsubscribe();
        }
    }

    public addOrRemoveJointApplicantSection ( singleJointIndicator : string ) {
        if ( !this.applicant2Added && singleJointIndicator === Constants.jointApplicant ) {
            let applicant2Sections       = this.applicantGenerator.getApplicantSection( 2 );
            const loginBlockControlGroup = this.__form.get( Constants.MyAMPLoginBlockFDN );
            if ( loginBlockControlGroup ) {
                SingleOrJointBlockComponent.secondApplicantSectionIndex = 4;
            } else {
                SingleOrJointBlockComponent.secondApplicantSectionIndex = 3;
            }
            this.__loadAt( applicant2Sections, SingleOrJointBlockComponent.secondApplicantSectionIndex );
            return;
        }
        if ( this.applicant2Added && singleJointIndicator === Constants.singleApplicant ) {
            this.__removeAt( SingleOrJointBlockComponent.secondApplicantSectionIndex ).then( () => {
                this.applicant2Added = false;
                this.onNext();
            } );
            return;
        }
        this.onNext();
    }

    private onSingleApplication () {
        this.setUpApplication( this.singleApplicantKey );
    }

    private onJointApplication () {
        this.setUpApplication( this.jointApplicantKey );
    }

    private setUpApplication ( singleJointIndicator : string ) {
        const singleOrJoint = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        singleOrJoint.setValue( singleJointIndicator );
        singleOrJoint.markAsTouched();
        this.addOrRemoveJointApplicantSection( singleJointIndicator );
    }

    private storeReferenceIdInModel ( referenceId? : string ) {
        let referenceIdControl = this.sharedDataService.getReferenceIdControl( this.__form );

        if ( referenceId ) {
            referenceIdControl.setValue( referenceId );
        } else {
            referenceId = referenceIdControl.value;
        }
    }
}
