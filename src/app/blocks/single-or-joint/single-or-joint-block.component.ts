import {
    Component ,
    ChangeDetectorRef ,
    ElementRef ,
    ChangeDetectionStrategy ,
    OnInit ,
    ViewContainerRef
} from '@angular/core';
import {
    LoadedBlockInfo ,
    AmpButton ,
    ProgressObserverService ,
    FormBlock ,
    FormModelService ,
    ScrollService
} from 'amp-ddc-components';
import {
    Validators ,
    FormControl
} from '@angular/forms';
import {
    Constants ,
    ApplicantGeneratorService ,
    SharedFormDataService
} from '../../shared';
@Component( {
    selector        : 'single-or-joint-block' ,
    templateUrl     : './single-or-joint-block.component.html' ,
    styles          : [ require( './single-or-joint-block.component.scss' ).toString() ] ,
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class SingleOrJointBlockComponent extends FormBlock implements OnInit {
    public applicant2Added : boolean = false;
    private jointApplicantKey : string;
    private singleApplicantKey : string;

    constructor ( formModelService : FormModelService ,
                  scrollService : ScrollService ,
                  _cd : ChangeDetectorRef ,
                  elementRef : ElementRef ,
                  progressObserver : ProgressObserverService ,
                  private applicantGenerator : ApplicantGeneratorService ,
                  private viewContainerRef : ViewContainerRef ,
                  private sharedDataService : SharedFormDataService ) {
        super( formModelService , elementRef , _cd , progressObserver , scrollService );
    }

    public ngOnInit () {
        this.singleApplicantKey = Constants.singleApplicant;
        this.jointApplicantKey  = Constants.jointApplicant;
        this.__controlGroup.addControl(
            this.__custom.controls[ 0 ].id ,
            new FormControl( null , Validators.required ) );
        this.formModelService.setSaveRelativeUrl( Constants.saveUrl );
        this.formModelService.saveResponse.subscribe( ( result ) => {
            if ( result.payload.meta && result.payload.meta.id ) {
                this.storeReferenceIdInModel( result.payload.meta.id );
            }
        } );
        // load applicant 1
        this.__loadAt( this.applicantGenerator.getApplicantSection( 1 ) , 2 );
        // Subscribe to notify when all the blocks that are inside of ApplicantSection are successfully loaded ,
        // then go next
        // The reason is if you don't do this , when you start with a Single applicant and finish the form and go
        // and change to Joint applicant and click on Joint , it will take you to the submit page , where as it
        // should've taken you to the first block in Applicant2 !!!
        // It was happening because we don't know how long it might take to load Applicant2 but we where doing
        // onNext nevertheless , which is wrong, because if it takes 2 mintue to load , we should wait and then go
        // to next undone block , which is inside the applicant2Section
        this.__onChildsLoaded( ( _loadedComponent : LoadedBlockInfo ) => {
            if ( _loadedComponent.name === 'Applicant2Section' ) {
                this.applicant2Added = true;
                this.onNext();
            }
        } );
    }

    public addOrRemoveJointApplicantSection ( singleJointIndicator : string ) {
        if ( ! this.applicant2Added && singleJointIndicator === Constants.jointApplicant ) {
            this.__loadAt( this.applicantGenerator.getApplicantSection( 2 ) , 3 );
            return;
        }
        if ( this.applicant2Added && singleJointIndicator === Constants.singleApplicant ) {
            this.__removeAt( 3 ).then( () => {
                this.applicant2Added = false;
                this.onNext();
            } );
            return;
        }
        this.onNext();
    }

    private onSingleJoint ( singleJointIndicator : string ) {
        const singleOrJoint = this.__controlGroup.get( this.__custom.controls[ 0 ].id );
        singleOrJoint.setValue( singleJointIndicator );
        singleOrJoint.markAsTouched();
        this.addOrRemoveJointApplicantSection( singleJointIndicator );
    }

    private storeReferenceIdInModel ( referenceId ) {
        let referenceIdControl = this.sharedDataService.getReferenceIdControl( this.__form );
        if ( ! referenceIdControl.value ) {
            referenceIdControl.setValue( referenceId );
            this.formModelService.setSaveRelativeUrl( Constants.saveUrl + '?id=' + referenceId );
        }
    }
}
