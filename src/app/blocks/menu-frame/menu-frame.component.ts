import {
    Component,
    ElementRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    OnDestroy,
    ViewChild
} from '@angular/core';
import {
    AmpBlockLoaderDirective,
    AmpButton,
    FormSectionService,
    ProgressObserverService,
    FormBlock,
    FormModelService,
    ScrollService
} from 'amp-ddc-components';
import {
    Subscription
} from 'rxjs';
import {
    FormGroup
} from '@angular/forms';
import {
    SharedFormDataService,
    Constants
} from '../../shared';
import {
    StickySaveButton
} from '../../components/sticky-save-button/sticky-save-button';
@Component({
    selector: 'menu-frame',
    templateUrl: './menu-frame.component.html',
    styles: [require('./menu-frame.component.scss')],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class MenuFrameBlockComponent implements OnDestroy {
    private __form : FormGroup;
    private singleOrJointSubscription : Subscription;
    private hydrationSubscription : Subscription;
    private sectionsToHide = [];
    private hideStickyButton = true;

    @ViewChild( AmpBlockLoaderDirective ) private loader;
    @ViewChild(StickySaveButton) private saveButton : StickySaveButton;

    constructor(
        private _el : ElementRef,
        private formModelService : FormModelService,
        private progressObserver : ProgressObserverService,
        public formSectionService : FormSectionService,
        private _cd : ChangeDetectorRef,
        private scrollService : ScrollService,
        private sharedData : SharedFormDataService) {

        this.hydrationSubscription = this.formModelService.$hydrateForm
            .subscribe( ( _hydratedForm : any ) => {
                this.loader.clear();
                let keys = Object.keys( _hydratedForm.controls.Application.controls );
                keys.map( ( _controlGroupName ) => {
                    if ( _controlGroupName !== 'Welcome' && _controlGroupName !== 'Retrieve' ) {
                        (<any> this.__form.controls).Application.addControl( _controlGroupName ,
                            _hydratedForm.controls.Application.controls[ _controlGroupName ] );
                    }
                } );
                this.loader.reload();
                this.hideStickyButton = false;
                this._cd.markForCheck();
            });
    }

    public onBlocksLoaded() {

        const singleOrJointControl = this.sharedData.getSingleOrJointControl(this.__form);
        this.singleOrJointSubscription = singleOrJointControl.valueChanges.subscribe((singleOrJoint) => {
            if (singleOrJoint === Constants.singleApplicant) {
                this.sectionsToHide = ['Application-Applicant1Section'];
            } else {
                this.sectionsToHide = [];
            }
            this.hideStickyButton = false;
            this._cd.markForCheck();
        });
    }

    public onSave() {
        this.saveButton.onSave();
    }

    public ngOnDestroy() {
        this.hydrationSubscription.unsubscribe();
        if (this.singleOrJointSubscription) {
            this.singleOrJointSubscription.unsubscribe();
        }
    }
}
