import {
    Component,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnInit,
    AfterViewInit,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';
import {
    Validators,
    FormControl
} from '@angular/forms';
import {
    AmpApplicantGeneratorService,
} from '../../services/amp-applicant-generator.service';
import {
    FormBlock
} from '../../../../form-block';
import {
    LoadedBlockInfo
} from '../../../../amp-block-loader';
import {
    SaveService,
    ScrollService
} from '../../../../services';
@Component( {
    selector        : 'amp-single-joint-block',
    template     : require('./amp-single-joint-block.component.html'),
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpSingleJointBlockComponent extends FormBlock implements OnInit, AfterViewInit, OnDestroy {
    private static singleApplicantKey : string = 'Single';
    private static jointApplicantKey : string = 'Joint';
    public applicant2Added : boolean  = false;
    private nextApplicantIndex : number;

    constructor ( saveService : SaveService,
                  _cd : ChangeDetectorRef,
                  scrollService : ScrollService,
                  private applicantGenerator : AmpApplicantGeneratorService,
                  private viewContainerRef : ViewContainerRef ) {
        super( saveService, _cd, scrollService );
    }

    public ngOnInit () {

        if ( !this.__controlGroup.contains( this.__custom.controls[ 0 ].id ) ) {
            this.__controlGroup.addControl( this.__custom.controls[ 0 ].id, new FormControl( null, Validators.required ) );
        }

        // load applicant 1
        this.__loadNext( this.applicantGenerator.getApplicantSection(), this.viewContainerRef );
        // Subscribe to notify when all the blocks that are inside of ApplicantSection are successfully loaded ,
        // then go next
        // The reason is if you don't do this , when you start with a Single applicant and finish the form and go
        // and change to Joint applicant and click on Joint , it will take you to the submit page , where as it
        // should've taken you to the first block in Applicant2 !!!
        // It was happening because we don't know how long it might take to load Applicant2 but we where doing
        // onNext nevertheless , which is wrong, because if it takes 2 minute to load , we should wait and then go
        // to next undone block , which is inside the applicant2Section
        this.__onChildsLoaded( ( _loadedComponent : LoadedBlockInfo ) => {
            if ( _loadedComponent.name === 'applicant2' ) {
                this.applicant2Added = true;
                this.onNext();
            }
        } );
    }

    public ngAfterViewInit () {
        super.ngAfterViewInit();

        if ( this.__isRetrieved ) {
            let singleJointControl = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
            if ( singleJointControl && singleJointControl.value === AmpSingleJointBlockComponent.jointApplicantKey ) {
                this.onJointApplication();
            }
        }
    }

    public addOrRemoveJointApplicantSection ( singleJointIndicator : string ) {
        if ( !this.applicant2Added && singleJointIndicator === AmpSingleJointBlockComponent.jointApplicantKey ) {
            let applicant2Sections       = this.applicantGenerator.getApplicantSection();
            let nextIndex = this.__getIndex(this.viewContainerRef) + 1;
            this.nextApplicantIndex = nextIndex ;
            this.__loadAt( applicant2Sections, nextIndex);
            return;
        }
        if ( this.applicant2Added && singleJointIndicator === AmpSingleJointBlockComponent.singleApplicantKey ) {
            this.__removeAt( this.nextApplicantIndex ).then( () => {
                this.applicant2Added = false;
                this.onNext();
            } );
            return;
        }
        this.onNext();
    }

    private onSingleApplication () {
        this.setUpApplication( AmpSingleJointBlockComponent.singleApplicantKey );
    }

    private onJointApplication () {
        this.setUpApplication( AmpSingleJointBlockComponent.jointApplicantKey );
    }

    private setUpApplication ( singleJointIndicator : string ) {
        const singleOrJoint = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        singleOrJoint.setValue( singleJointIndicator );
        singleOrJoint.markAsTouched();
        this.addOrRemoveJointApplicantSection( singleJointIndicator );
    }
}
