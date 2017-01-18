import {
    Component,
    ElementRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AmpBlockLoaderDirective } from '../../../../amp-block-loader.directive';
import { FormModelService } from '../../../../services/form-model/form-model.service';
import { ScrollService } from '../../../../services/scroll/scroll.service';

// import {
//     SharedFormDataService,
//     Constants
// } from '../../shared';
// import { StickySaveButton } from '../../components/sticky-save-button/sticky-save-button';
// import { FDN } from '../../forms/better-form/Application.fdn';
@Component( {
    selector        : 'amp-menu-frame-block',
    template        : require( './amp-menu-frame-block.component.html' ),
    styles          : [ require( './amp-menu-frame-block.component.scss' ) ],
    changeDetection : ChangeDetectionStrategy.OnPush
} )
export class AmpMenuFrameBlockComponent implements OnDestroy, AfterViewInit {
    private __form : FormGroup;
    private singleOrJointSubscription : Subscription;
    private hydrationSubscription : Subscription;
    private sectionsToHide                   = [];
    private hideStickyButton                 = true;
    private ADDRESS_BLOCK_COMPONENT_SELECTOR = 'Application-Applicant1Section-PersonalDetailsSection-Address-block';
    @ViewChild( AmpBlockLoaderDirective ) private loader;
    // @ViewChild( StickySaveButton ) private saveButton : StickySaveButton;

    constructor ( private _el : ElementRef,
                  private formModelService : FormModelService,
                  private _cd : ChangeDetectorRef,
                  private scrollService : ScrollService
                  /*private sharedData : SharedFormDataService*/ ) {

        this.hydrationSubscription = this.formModelService.$hydrateForm
                                         .subscribe( ( _hydratedForm : any ) => {
                                             this.loader.clear();
                                             let keys = Object.keys( _hydratedForm.controls );
                                             keys.map( ( _controlGroupName ) => {
                                                 this.__form.addControl( _controlGroupName,
                                                     _hydratedForm.controls[ _controlGroupName ] );
                                             } );
                                             this.loader.reload();
                                             this.hideStickyButton = false;
                                             // let singleOrJoint     = this.__form.get( [ ...FDN.SingleOrJoint, 'SingleOrJoint' ] );
                                             // this.onSingleJoint( singleOrJoint ? singleOrJoint.value : null, false );
                                             this._cd.markForCheck();
                                         } );
        let onNextScrolled         = this.scrollService.$scrolled.subscribe( ( fdn ) => {
            if ( fdn.componentSelector === this.ADDRESS_BLOCK_COMPONENT_SELECTOR ) {
                this.hideStickyButton = false;
                onNextScrolled.unsubscribe();
            }
        } );
    }

    public ngAfterViewInit () {
        // if ( this.formModelService.storedModel ) { // means we're coming from receipt page
        //     let singleOrJoint = this.sharedData.getSingleOrJointControl( this.__form ).value;
        //     this.onSingleJoint( singleOrJoint, false );
        // }
    }

    public onSingleJoint = ( singleOrJoint : string, hideStickyButton = true ) : void => {
        // if ( singleOrJoint === Constants.singleApplicant ) {
        //     this.sectionsToHide = [ 'Application-Applicant1Section' ];
        // } else {
        //     this.sectionsToHide = [];
        // }
        // if ( hideStickyButton === false ) {
        //     this.hideStickyButton = hideStickyButton;
        // }
        // this._cd.markForCheck();
    }

    public onBlocksLoaded () {
        // const singleOrJointControl     = this.sharedData.getSingleOrJointControl( this.__form );
        // this.singleOrJointSubscription = singleOrJointControl.valueChanges.subscribe( this.onSingleJoint );
    }

    // public onSave () {
    //     this.saveButton.onSave();
    // }

    public ngOnDestroy () {
        // this.hydrationSubscription.unsubscribe();
        // if ( this.singleOrJointSubscription ) {
        //     this.singleOrJointSubscription.unsubscribe();
        // }
    }

    private context () {
        return this;
    }

}
